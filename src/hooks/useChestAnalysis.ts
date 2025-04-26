
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
        setAnalyses(data || []);
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
          } else if (payload.eventType === 'UPDATE') {
            setAnalyses((current) =>
              current.map((analysis) =>
                analysis.id === payload.new.id ? { ...payload.new as ChestAnalysis } : analysis
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload X-ray');
      return null;
    }
  };

  return { analyses, loading, uploadImage };
};
