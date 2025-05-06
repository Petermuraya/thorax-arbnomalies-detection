
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, FileText, Clock, Search, RefreshCw } from "lucide-react";
import { VerificationItem } from "@/hooks/useVerificationAdmin";
import { format } from "date-fns";

interface VerificationTableProps {
  verifications: VerificationItem[];
  isLoading: boolean;
  onApprove: (id: string, notes?: string) => Promise<void>;
  onReject: (id: string, notes: string) => Promise<void>;
  getDocumentUrl: (path: string) => string;
  onRefresh: () => Promise<void>;
}

export const VerificationTable = ({ 
  verifications, 
  isLoading, 
  onApprove, 
  onReject, 
  getDocumentUrl,
  onRefresh 
}: VerificationTableProps) => {
  const [selectedVerification, setSelectedVerification] = useState<VerificationItem | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleApprove = async () => {
    if (!selectedVerification) return;
    
    setIsProcessing(true);
    try {
      await onApprove(selectedVerification.id, reviewerNotes);
      setIsDialogOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleReject = async () => {
    if (!selectedVerification || !reviewerNotes.trim()) return;
    
    setIsProcessing(true);
    try {
      await onReject(selectedVerification.id, reviewerNotes);
      setIsDialogOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const openDialog = (verification: VerificationItem) => {
    setSelectedVerification(verification);
    setReviewerNotes(verification.reviewer_notes || "");
    setIsDialogOpen(true);
  };
  
  const filteredVerifications = verifications.filter(v => 
    v.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, license or specialty..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Healthcare Professional</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading verification data...
                  </TableCell>
                </TableRow>
              ) : filteredVerifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No verification requests match your search
                  </TableCell>
                </TableRow>
              ) : (
                filteredVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="font-medium">{verification.user_name}</TableCell>
                    <TableCell>{verification.license_number}</TableCell>
                    <TableCell>{verification.specialization}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          verification.status === 'approved' ? 'success' :
                          verification.status === 'rejected' ? 'destructive' : 'default'
                        }
                      >
                        {verification.status === 'approved' && <CheckCircle className="h-3.5 w-3.5 mr-1" />}
                        {verification.status === 'rejected' && <XCircle className="h-3.5 w-3.5 mr-1" />}
                        {verification.status === 'pending' && <Clock className="h-3.5 w-3.5 mr-1" />}
                        {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {verification.created_at 
                        ? format(new Date(verification.created_at), 'MMM d, yyyy')
                        : 'Unknown'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <a 
                        href={getDocumentUrl(verification.document_path)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center mr-2 text-xs text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        View Document
                      </a>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDialog(verification)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Verification Request</DialogTitle>
            <DialogDescription>
              Review the healthcare professional's verification request and submit your decision.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVerification && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Healthcare Professional</h4>
                <p>{selectedVerification.user_name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">License Number</h4>
                  <p>{selectedVerification.license_number}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Specialization</h4>
                  <p>{selectedVerification.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Document</h4>
                <p>
                  <a 
                    href={getDocumentUrl(selectedVerification.document_path)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Open Document
                  </a>
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Reviewer Notes</h4>
                <Textarea 
                  placeholder="Add notes about this verification (required for rejection)"
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isProcessing || !reviewerNotes.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="default"
              onClick={handleApprove}
              disabled={isProcessing}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
