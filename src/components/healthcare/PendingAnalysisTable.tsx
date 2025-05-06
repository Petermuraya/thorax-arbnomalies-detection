
import { useState } from "react";
import { ChestAnalysis } from "@/hooks/useHealthcareStaff";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye, FileText, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useHealthcareStaff } from "@/hooks/useHealthcareStaff";
import { supabase } from "@/integrations/supabase/client";

interface PendingAnalysisTableProps {
  analyses: ChestAnalysis[];
  isLoading: boolean;
}

export function PendingAnalysisTable({ analyses, isLoading }: PendingAnalysisTableProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<ChestAnalysis | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { updateAnalysis } = useHealthcareStaff();

  const openAnalysis = async (analysis: ChestAnalysis) => {
    setSelectedAnalysis(analysis);
    setDoctorNotes(analysis.doctor_notes || "");
    
    // Get image URL
    if (analysis.image_path) {
      const { data } = supabase.storage
        .from("chest-xrays")
        .getPublicUrl(analysis.image_path);
        
      setImageUrl(data.publicUrl);
    }
  };
  
  const handleSave = async () => {
    if (!selectedAnalysis) return;
    
    setIsSaving(true);
    const success = await updateAnalysis(selectedAnalysis.id, doctorNotes);
    if (success) {
      setSelectedAnalysis(null);
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500">No pending analyses to review</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date Uploaded</TableHead>
            <TableHead>AI Analysis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyses.map((analysis) => (
            <TableRow key={analysis.id}>
              <TableCell className="font-medium">{analysis.user_name}</TableCell>
              <TableCell>{new Date(analysis.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                {analysis.analysis_result ? (
                  <span className="line-clamp-1">{analysis.analysis_result}</span>
                ) : (
                  <span className="text-gray-500 italic">No AI analysis</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="warning">Pending Review</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => openAnalysis(analysis)}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Review</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedAnalysis} onOpenChange={(open) => !open && setSelectedAnalysis(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>X-ray Analysis Review</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* X-ray Image */}
            <div className="border rounded-md overflow-hidden">
              <div className="bg-black h-[400px] flex items-center justify-center">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="X-ray" 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-white">Image not available</div>
                )}
              </div>
            </div>

            {/* Analysis Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                <p className="font-medium">{selectedAnalysis?.user_name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Date Uploaded</h3>
                <p>{new Date(selectedAnalysis?.created_at || "").toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">AI Analysis</h3>
                <p className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  {selectedAnalysis?.analysis_result || "No AI analysis available"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Doctor's Notes</h3>
                <Textarea 
                  placeholder="Enter your professional assessment here..."
                  className="h-[120px]"
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Review"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
