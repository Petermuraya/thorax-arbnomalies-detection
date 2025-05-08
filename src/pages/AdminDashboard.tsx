
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { useVerificationAdmin } from "@/hooks/useVerificationAdmin";
import { VerificationStats } from "@/components/admin/VerificationStats";
import { VerificationTable } from "@/components/admin/VerificationTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    isLoading, 
    verifications, 
    pendingCount, 
    approvedCount, 
    rejectedCount,
    updateVerificationStatus,
    getDocumentUrl,
    refreshVerifications
  } = useVerificationAdmin();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Force refresh verifications when the component mounts
    refreshVerifications().catch(err => {
      console.error("Error refreshing verifications:", err);
      toast.error("Failed to load verification data");
    });
    
    // Log initial counts for debugging
    console.log("Initial verification data:", { 
      total: verifications.length,
      pendingCount, 
      approvedCount, 
      rejectedCount 
    });
  }, [refreshVerifications]);

  const handleApprove = async (id: string, notes?: string) => {
    await updateVerificationStatus(id, 'approved', notes);
  };

  const handleReject = async (id: string, notes: string) => {
    await updateVerificationStatus(id, 'rejected', notes);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage healthcare professional verifications and system data.</p>
        </div>
        
        <VerificationStats 
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          rejectedCount={rejectedCount}
          isLoading={isLoading}
        />
        
        <Separator />
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <VerificationTable 
              verifications={verifications}
              isLoading={isLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              getDocumentUrl={getDocumentUrl}
              onRefresh={refreshVerifications}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <VerificationTable 
              verifications={verifications.filter(v => v.status === 'pending')}
              isLoading={isLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              getDocumentUrl={getDocumentUrl}
              onRefresh={refreshVerifications}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <VerificationTable 
              verifications={verifications.filter(v => v.status === 'approved')}
              isLoading={isLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              getDocumentUrl={getDocumentUrl}
              onRefresh={refreshVerifications}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <VerificationTable 
              verifications={verifications.filter(v => v.status === 'rejected')}
              isLoading={isLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              getDocumentUrl={getDocumentUrl}
              onRefresh={refreshVerifications}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
