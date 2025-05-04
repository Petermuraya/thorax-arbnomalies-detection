import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Shield, User, Users } from 'lucide-react';

type VerificationRequest = {
  id: string;
  user_id: string;
  status: string;
  license_number: string;
  specialization: string;
  document_path: string;
  created_at: string;
  fullName: string;
  email: string;
};

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    approvedHealthcare: 0,
    rejectedVerifications: 0
  });

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch verification requests
      const { data: verificationData, error: verificationError } = await supabase
        .from('healthcare_verification')
        .select(`
          *,
          profiles:user_id (full_name),
          users:user_id (email)
        `)
        .order('created_at', { ascending: false });
      
      if (verificationError) throw verificationError;
      
      // Transform data to include user info
      const transformedData = verificationData.map((item: any) => ({
        ...item,
        fullName: item.profiles?.full_name || 'Unknown',
        email: item.users?.email || 'Unknown'
      }));
      
      setVerificationRequests(transformedData);
      
      // Fetch users
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*');
      
      if (userError) throw userError;
      
      // Fetch emails from auth.users (this is an admin dashboard, so we have special privileges)
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth data:', authError);
      }
      
      // Combine profile data with auth data
      const combinedUsers = userData.map((profile: any) => {
        const authUser = authData?.users.find((u: any) => u.id === profile.id);
        return {
          ...profile,
          email: authUser?.email || 'Unknown'
        };
      });
      
      setUsers(combinedUsers);
      
      // Calculate stats
      setStats({
        totalUsers: combinedUsers.length,
        pendingVerifications: transformedData.filter((r: VerificationRequest) => r.status === 'pending').length,
        approvedHealthcare: transformedData.filter((r: VerificationRequest) => r.status === 'approved').length,
        rejectedVerifications: transformedData.filter((r: VerificationRequest) => r.status === 'rejected').length
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('healthcare_verification')
        .update({ status: 'approved', reviewer_id: user?.id, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update user role to healthstaff
      const request = verificationRequests.find(r => r.id === id);
      if (request) {
        await supabase.auth.admin.updateUserById(request.user_id, {
          user_metadata: { role: 'healthstaff' }
        });
        
        // Update profile table as well
        await supabase
          .from('profiles')
          .update({ role: 'healthstaff' })
          .eq('id', request.user_id);
      }
      
      toast.success('Verification approved successfully');
      setViewDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error('Error approving verification');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('healthcare_verification')
        .update({ status: 'rejected', reviewer_id: user?.id, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Verification rejected');
      setViewDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error rejecting verification:', error);
      toast.error('Error rejecting verification');
    }
  };

  const getDocumentUrl = async (path: string) => {
    try {
      const { data } = await supabase.storage
        .from('verifications')
        .getPublicUrl(path);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error getting document URL:', error);
      return '';
    }
  };

  const viewVerification = async (request: VerificationRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-medical-gray-dark">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Admin Dashboard</h1>
          <p className="text-medical-gray">Manage users and verification requests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-medical-gray">Total Users</p>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold mt-2">{stats.totalUsers}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-medical-gray">Pending Verifications</p>
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold mt-2">{stats.pendingVerifications}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-medical-gray">Approved Healthcare Staff</p>
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold mt-2">{stats.approvedHealthcare}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-medical-gray">Rejected Verifications</p>
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold mt-2">{stats.rejectedVerifications}</h3>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="verifications">Verification Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Professional Verification Requests</CardTitle>
                <CardDescription>Review and approve healthcare professional verification requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-medical-gray-lightest text-medical-gray-dark text-sm">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Email</th>
                        <th className="py-3 px-4 text-left font-medium">License</th>
                        <th className="py-3 px-4 text-left font-medium">Specialization</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verificationRequests.length > 0 ? (
                        verificationRequests.map((request, index) => (
                          <tr key={request.id} className={`border-t border-medical-gray-light ${index % 2 === 1 ? 'bg-medical-gray-lightest/50' : ''}`}>
                            <td className="py-4 px-4 font-medium">{request.fullName}</td>
                            <td className="py-4 px-4 text-medical-gray-dark">{request.email}</td>
                            <td className="py-4 px-4 text-medical-gray-dark">{request.license_number}</td>
                            <td className="py-4 px-4 text-medical-gray-dark">{request.specialization}</td>
                            <td className="py-4 px-4 text-medical-gray-dark">
                              {new Date(request.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewVerification(request)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-medical-gray">
                            No verification requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-medical-gray-lightest text-medical-gray-dark text-sm">
                        <th className="py-3 px-4 text-left font-medium">User</th>
                        <th className="py-3 px-4 text-left font-medium">Email</th>
                        <th className="py-3 px-4 text-left font-medium">Role</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id} className={`border-t border-medical-gray-light ${index % 2 === 1 ? 'bg-medical-gray-lightest/50' : ''}`}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={user.avatar_url} />
                                <AvatarFallback>{user.full_name?.charAt(0) || <User />}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.full_name || 'No name'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-medical-gray-dark">{user.email}</td>
                          <td className="py-4 px-4">
                            <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'healthstaff' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Verification Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Verification Request Details</DialogTitle>
            <DialogDescription>
              Review the details and documentation provided by the healthcare professional
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 my-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedRequest.fullName?.charAt(0) || <User />}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedRequest.fullName}</h3>
                  <p className="text-sm text-gray-500">{selectedRequest.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{selectedRequest.license_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium">{selectedRequest.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="font-medium">{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Verification Document</p>
                <div className="border rounded-md p-4 bg-gray-50">
                  <a 
                    href="#" 
                    className="text-medical-blue hover:underline flex items-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      const url = await getDocumentUrl(selectedRequest.document_path);
                      if (url) window.open(url, '_blank');
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            {selectedRequest?.status === 'pending' && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => selectedRequest && handleReject(selectedRequest.id)}
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => selectedRequest && handleApprove(selectedRequest.id)}
                >
                  Approve
                </Button>
              </>
            )}
            {selectedRequest?.status !== 'pending' && (
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
