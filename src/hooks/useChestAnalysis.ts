import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { useNotify } from '@/hooks/useNotify';

export interface ChestAnalysis {
  id: string;
  image_path: string;
  analysis_result: string | null;
  doctor_notes: string | null;
  status: 'pending' | 'reviewed' | 'completed';
  created_at: string;
  updated_at: string;
}

export const useChestAnalysis = () => {
  const [analyses, setAnalyses] = useState<ChestAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { notifyInfo } = useNotify();

  useEffect(() => {
    if (!user) return;

    const fetchAnalyses = async () => {
      try {
        const { data, error } = await supabase
          .from('chest_analysis')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAnalyses(data as ChestAnalysis[]);
      } catch (error) {
        console.error('Error fetching analyses:', error);
        toast.error('Failed to load chest analyses');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();

    // Set up real-time subscription
    const channel = supabase
      .channel('chest_analysis_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chest_analysis',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAnalyses((current) => [payload.new as ChestAnalysis, ...current]);
            
            // Notify healthcare staff about new analysis
            notifyInfo(
              "New X-ray Submitted", 
              "Your X-ray has been submitted and is awaiting professional review",
              { showToast: true }
            );
          } else if (payload.eventType === 'UPDATE') {
            setAnalyses((current) =>
              current.map((analysis) =>
                analysis.id === payload.new.id ? { ...payload.new as ChestAnalysis } : analysis
              )
            );
            
            // If status changed to reviewed, notify the user
            if (payload.new.status === 'reviewed' && payload.old.status === 'pending') {
              notifyInfo(
                "X-ray Review Complete", 
                "A healthcare professional has reviewed your X-ray analysis",
                { 
                  showToast: true,
                  link: "/patient-dashboard?tab=reports",
                  actionText: "View Results"
                }
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, notifyInfo]);

  const uploadImage = async (file: File) => {
    if (!user) {
      toast.error('Please log in to upload images');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from('chest-xrays')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create analysis record
      const { data, error: insertError } = await supabase
        .from('chest_analysis')
        .insert({
          user_id: user.id,
          image_path: filePath,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success('X-ray uploaded successfully');
      
      // Notify healthcare staff about new analysis (this will be duplicated by the realtime subscription)
      // But we keep it here in case the realtime subscription fails
      notifyInfo(
        "New X-ray Submitted", 
        "Your X-ray has been submitted and is awaiting professional review",
        { showToast: true }
      );
      
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload X-ray');
      return null;
    }
  };

  return { analyses, loading, uploadImage };
};
