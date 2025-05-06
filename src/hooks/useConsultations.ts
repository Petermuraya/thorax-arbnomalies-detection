import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface Consultation {
  id: string;
  doctor_id: string;
  scheduled_for: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  cost: number;
  created_at: string;
}

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchConsultations = async () => {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('patient_id', user.id)
          .order('scheduled_for', { ascending: false });

        if (error) throw error;
        setConsultations(data as Consultation[]);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        toast.error('Failed to load consultations');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();

    // Set up real-time subscription
    const channel = supabase
      .channel('consultation_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'consultations',
          filter: `patient_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setConsultations((current) => [payload.new as Consultation, ...current]);
          } else if (payload.eventType === 'UPDATE') {
            setConsultations((current) =>
              current.map((consultation) =>
                consultation.id === payload.new.id ? { ...payload.new as Consultation } : consultation
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

  return { consultations, loading };
};
