
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, User, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Consultation {
  id: string;
  patient_id: string;
  patient_name?: string;
  scheduled_for: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  cost: number;
}

export function PatientConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    
    const fetchConsultations = async () => {
      try {
        // Get all consultations for the doctor
        const { data, error } = await supabase
          .from("consultations")
          .select("*")
          .eq("doctor_id", user.id)
          .order("scheduled_for", { ascending: false });

        if (error) throw error;

        // Get patient names
        const consultationsWithNames = await Promise.all((data || []).map(async (consultation) => {
          try {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", consultation.patient_id)
              .single();
            
            return {
              ...consultation,
              patient_name: profileData?.full_name || "Unknown Patient"
            };
          } catch (error) {
            return {
              ...consultation,
              patient_name: "Unknown Patient"
            };
          }
        }));

        setConsultations(consultationsWithNames);
      } catch (error) {
        console.error("Error fetching consultations:", error);
        toast.error("Failed to load consultations");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();

    // Set up real-time subscription
    const channel = supabase
      .channel('consultations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'consultations',
          filter: `doctor_id=eq.${user.id}`,
        },
        () => {
          fetchConsultations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleStatusChange = async (consultationId: string, newStatus: 'completed' | 'cancelled') => {
    if (!user?.id) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from("consultations")
        .update({
          status: newStatus,
          notes: selectedConsultation?.notes || notes,
          updated_at: new Date().toISOString()
        })
        .eq("id", consultationId);

      if (error) throw error;
      
      toast.success(`Consultation ${newStatus === 'completed' ? 'completed' : 'cancelled'} successfully`);
      setSelectedConsultation(null);
    } catch (error) {
      console.error("Error updating consultation:", error);
      toast.error("Failed to update consultation status");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedConsultation || !user?.id) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from("consultations")
        .update({
          notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedConsultation.id);

      if (error) throw error;
      
      toast.success("Notes saved successfully");
      
      // Update the consultation in state
      setConsultations(prev => 
        prev.map(c => 
          c.id === selectedConsultation.id ? {...c, notes: notes} : c
        )
      );
      
      setSelectedConsultation(null);
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  const openConsultationDetails = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setNotes(consultation.notes || "");
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-16 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-16 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No consultations scheduled</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div 
            key={consultation.id} 
            className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <p className="font-medium">{consultation.patient_name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(consultation.scheduled_for).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{new Date(consultation.scheduled_for).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  consultation.status === 'scheduled' ? 'warning' :
                  consultation.status === 'completed' ? 'success' : 'destructive'
                }>
                  {consultation.status}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => openConsultationDetails(consultation)}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Details
                </Button>
              </div>
            </div>
            {consultation.notes && (
              <div className="mt-2 text-sm bg-slate-50 p-2 rounded border border-slate-100">
                <p className="line-clamp-1">{consultation.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedConsultation} onOpenChange={(open) => !open && setSelectedConsultation(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Consultation Details</DialogTitle>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p className="font-medium">{selectedConsultation.patient_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge variant={
                    selectedConsultation.status === 'scheduled' ? 'warning' :
                    selectedConsultation.status === 'completed' ? 'success' : 'destructive'
                  }>
                    {selectedConsultation.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{new Date(selectedConsultation.scheduled_for).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p>{new Date(selectedConsultation.scheduled_for).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Cost</h3>
                  <p>${selectedConsultation.cost.toFixed(2)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                <Textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about the consultation..."
                  className="h-[120px]"
                />
              </div>
              
              <div className="flex justify-between pt-2">
                {selectedConsultation.status === 'scheduled' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusChange(selectedConsultation.id, 'cancelled')}
                      disabled={saving}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel Appointment
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(selectedConsultation.id, 'completed')}
                      disabled={saving}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  </>
                )}
                {selectedConsultation.status !== 'scheduled' && (
                  <Button
                    onClick={handleSaveNotes}
                    disabled={saving}
                    className="ml-auto"
                  >
                    Save Notes
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
