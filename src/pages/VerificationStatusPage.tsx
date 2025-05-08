
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useHealthcareVerification } from "@/hooks/useHealthcareVerification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, HelpCircle, AlertTriangle, FileText, User } from "lucide-react";
import { VerificationItem } from "@/hooks/useVerificationAdmin";
import { ProfileUpdateForm } from "@/components/profile/ProfileUpdateForm";

const VerificationStatusPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<VerificationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await fetch();
        if (error) throw new Error(error.message);
        
        if (data && data.length > 0) {
          setVerificationStatus(data[0]);
          // If approved, redirect to dashboard after 5 seconds
          if (data[0].status === 'approved') {
            setTimeout(() => {
              navigate("/health-staff-dashboard");
            }, 5000);
          }
        }
      } catch (err: any) {
        console.error("Error fetching verification status:", err);
        setError(err.message || "Failed to load verification status");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVerificationStatus();
  }, [user, navigate]);
  
  async function fetch() {
    if (!user) return { data: null, error: new Error("No user found") };
    
    return await fetch("/api/healthcare-verification?userId=" + user.id);
  }
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Clock className="h-3 w-3 mr-1" /> Pending Review
        </Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" /> Approved
        </Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" /> Rejected
        </Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
          <HelpCircle className="h-3 w-3 mr-1" /> Unknown
        </Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Healthcare Professional Verification</h1>
            <p className="text-gray-600">
              Keep track of your verification status and update your profile while waiting for approval
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center justify-between">
                    Verification Status
                    {verificationStatus && renderStatusBadge(verificationStatus.status)}
                  </CardTitle>
                  <CardDescription>
                    Submitted on {verificationStatus?.created_at ? new Date(verificationStatus.created_at).toLocaleDateString() : 'Unknown date'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  {!verificationStatus ? (
                    <Alert>
                      <HelpCircle className="h-4 w-4" />
                      <AlertTitle>No Verification Found</AlertTitle>
                      <AlertDescription>
                        We couldn't find any verification requests for your account.
                        Please contact support if you believe this is an error.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
                          <div className="mt-1 text-lg">
                            {verificationStatus.status === 'pending' && (
                              <p className="text-yellow-600">
                                Your verification is currently under review by our team.
                              </p>
                            )}
                            {verificationStatus.status === 'approved' && (
                              <p className="text-green-600">
                                Your verification has been approved! You will be redirected to your dashboard shortly.
                              </p>
                            )}
                            {verificationStatus.status === 'rejected' && (
                              <p className="text-red-600">
                                Your verification request has been rejected. Please review the feedback below.
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {verificationStatus.reviewer_notes && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Reviewer Notes</h3>
                            <div className="mt-1 p-3 bg-gray-50 border rounded-md">
                              {verificationStatus.reviewer_notes}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">License Information</h3>
                          <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs text-gray-500">License Number</span>
                              <p>{verificationStatus.license_number}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Specialization</span>
                              <p>{verificationStatus.specialization}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between">
                  <p className="text-sm text-gray-500">
                    {verificationStatus?.status === 'pending' && 'Our team is reviewing your submission and will update your status soon.'}
                    {verificationStatus?.status === 'approved' && 'You now have full access to the healthcare professional features.'}
                    {verificationStatus?.status === 'rejected' && 'Please review the feedback and consider submitting a new verification request.'}
                  </p>
                </CardFooter>
              </Card>
              
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile Information
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Your Profile</CardTitle>
                      <CardDescription>
                        You can update your profile information while waiting for verification approval
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProfileUpdateForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification Documents</CardTitle>
                      <CardDescription>
                        Your submitted documents and license information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {verificationStatus?.document_path && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Submitted Document</h3>
                            <div className="mt-2">
                              <Button variant="outline" className="text-blue-600 hover:text-blue-800" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Document
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div className="pt-2">
                          <p className="text-sm text-gray-500">
                            If you need to update your documents or submit additional information,
                            please contact our support team.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VerificationStatusPage;
