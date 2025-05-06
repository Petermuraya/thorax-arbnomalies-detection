
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Consultation } from "@/hooks/useHealthcareStaff";

export function PatientConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [consultationNotes, setConsultationNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchConsultations();
    }
  }, [user?.id]);

  const fetchConsultations = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("consultations")
        .select("*")
        .eq("doctor_id", user?.id)
        .order("scheduled_for", { ascending: false });
        
      if (error) throw error;
      
      // Fetch patient names
      const consultationsWithNames = await Promise.all(
        (data || []).map(async (consultation) => {
          try {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", consultation.patient_id)
              .single();
              
            return {
              ...consultation,
              patient_name: profileData?.full_name || "Unknown Patient",
              // Ensure status is one of the allowed values
              status: consultation.status as "scheduled" | "completed" | "cancelled"
            };
          } catch {
            return {
              ...consultation,
              patient_name: "Unknown Patient",
              // Ensure status is one of the allowed values
              status: (consultation.status || "scheduled") as "scheduled" | "completed" | "cancelled"
            };
          }
        })
      );
      
      setConsultations(consultationsWithNames as Consultation[]);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast.error("Failed to load consultations");
    } finally {
      setIsLoading(false);
    }
  };

  const completeConsultation = async () => {
    if (!selectedConsultation) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from("consultations")
        .update({
          status: "completed",
          notes: consultationNotes,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedConsultation.id);
        
      if (error) throw error;
      
      toast.success("Consultation marked as completed");
      fetchConsultations();
      setSelectedConsultation(null);
    } catch (error) {
      console.error("Error completing consultation:", error);
      toast.error("Failed to update consultation");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredConsultations = searchTerm
    ? consultations.filter(c => 
        c.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(c.scheduled_for).toLocaleDateString().includes(searchTerm)
      )
    : consultations;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search consultations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Consultation
        </Button>
      </div>

      {filteredConsultations.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No consultations found</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell className="font-medium">{consultation.patient_name}</TableCell>
                <TableCell>
                  {new Date(consultation.scheduled_for).toLocaleDateString()}{" "}
                  {new Date(consultation.scheduled_for).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      consultation.status === "completed"
                        ? "success"
                        : consultation.status === "cancelled"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {consultation.status}
                  </Badge>
                </TableCell>
                <TableCell>${consultation.cost.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedConsultation(consultation);
                      setConsultationNotes(consultation.notes || "");
                    }}
                    disabled={consultation.status !== "scheduled"}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    {consultation.status === "scheduled" ? "Complete" : "View"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Consultation Details Dialog */}
      <Dialog open={!!selectedConsultation} onOpenChange={(open) => !open && setSelectedConsultation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Consultation Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Patient</h3>
              <p className="font-medium">{selectedConsultation?.patient_name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
              <p>
                {selectedConsultation && new Date(selectedConsultation.scheduled_for).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <div className="mt-1">
                {selectedConsultation && (
                  <Badge
                    variant={
                      selectedConsultation.status === "completed"
                        ? "success"
                        : selectedConsultation.status === "cancelled"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {selectedConsultation.status}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Consultation Notes</h3>
              <Textarea 
                placeholder="Enter consultation notes..."
                className="h-[120px] mt-1"
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                disabled={selectedConsultation?.status !== "scheduled"}
              />
            </div>
          </div>

          <DialogFooter>
            {selectedConsultation?.status === "scheduled" && (
              <Button
                onClick={completeConsultation}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Mark as Completed"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
