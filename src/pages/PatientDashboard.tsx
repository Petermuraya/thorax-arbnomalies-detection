import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calendar, Upload, User, FileText, History, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useChestAnalysis } from "@/hooks/useChestAnalysis";
import { useConsultations } from "@/hooks/useConsultations";
import XrayUploader from "@/components/XrayUploader";
import AIAnalysisViewer from "@/components/AIAnalysisViewer";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { analyses, loading: analysesLoading } = useChestAnalysis();
  const { consultations, loading: consultationsLoading } = useConsultations();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleImageUploaded = (imageUrl: string, file: File) => {
    setUploadedImageUrl(imageUrl);
    setUploadedFile(file);
    toast.success("X-ray uploaded successfully");
    
    // Scroll to analysis section
    setTimeout(() => {
      document.getElementById("analysis-section")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 500);
  };

  const handleAnalysisComplete = (result: string) => {
    setAnalysisResult(result);
    
    // Simulate sending to doctor for review
    toast.success("Analysis complete! Results sent to healthcare professional for review.");
  };

  const totalBilled = consultations.reduce((sum, consultation) => sum + consultation.cost, 0);
  const pendingPayment = consultations
    .filter(c => c.status === 'scheduled')
    .reduce((sum, consultation) => sum + consultation.cost, 0);

  const patientData = {
    name: user?.user_metadata?.full_name || "Patient",
    email: user?.email || "",
    lastLogin: new Date().toLocaleString(),
    recentUploads: analyses.length,
    pendingReports: analyses.filter(a => a.status === 'pending').length,
    completedReports: analyses.filter(a => a.status === 'completed').length,
    totalBilled,
    pendingPayment
  };

  const reportHistory = [
    {
      id: "XR-8765",
      date: "April 22, 2025",
      status: "Completed",
      findings: "Normal lung fields, no abnormalities detected",
      doctor: "Dr. Michael Stevens",
      cost: "$80"
    },
    {
      id: "XR-8532",
      date: "March 15, 2025",
      status: "Completed",
      findings: "Minor bronchial wall thickening, follow-up recommended",
      doctor: "Dr. Sarah Johnson",
      cost: "$80"
    },
    {
      id: "XR-8217",
      date: "February 3, 2025",
      status: "Completed",
      findings: "Normal chest X-ray",
      doctor: "Dr. Michael Stevens",
      cost: "$80"
    },
    {
      id: "XR-7995",
      date: "January 12, 2025",
      status: "Completed",
      findings: "Slight cardiomegaly, no acute pulmonary findings",
      doctor: "Dr. David Thompson",
      cost: "$80"
    },
    {
      id: "XR-7854",
      date: "December 5, 2024",
      status: "Completed",
      findings: "Normal chest X-ray",
      doctor: "Dr. Sarah Johnson",
      cost: "$80"
    }
  ];

  const billingHistory = [
    {
      id: "INV-2451",
      date: "April 22, 2025", 
      description: "Chest X-ray Analysis (XR-8765)",
      amount: "$80.00",
      status: "Paid"
    },
    {
      id: "INV-2389",
      date: "March 15, 2025",
      description: "Chest X-ray Analysis (XR-8532)", 
      amount: "$80.00",
      status: "Paid"
    },
    {
      id: "INV-2265",
      date: "February 3, 2025",
      description: "Chest X-ray Analysis (XR-8217)",
      amount: "$80.00", 
      status: "Paid"
    },
    {
      id: "INV-2156",
      date: "January 12, 2025",
      description: "Chest X-ray Analysis (XR-7995) + Consultation",
      amount: "$130.00",
      status: "Paid"
    },
    {
      id: "INV-4521",
      date: "April 24, 2025",
      description: "Chest X-ray Analysis (XR-8921)",
      amount: "$80.00",
      status: "Pending"
    },
    {
      id: "INV-4522",
      date: "April 24, 2025",
      description: "Virtual Consultation (Scheduled)",
      amount: "$40.00",
      status: "Pending"
    }
  ];

  return (
    <div className="min-h-screen bg-medical-gray-lightest">
      <header className="bg-white border-b border-medical-gray-light shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-md overflow-hidden hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-xl text-medical-gray-dark">Chest</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-medical-gray-dark"
              onClick={() => navigate("/patient-profile")}
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button 
              variant="outline" 
              className="border-medical-gray-light hover:bg-medical-gray-lightest"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-medical-gray-dark">
            Patient Dashboard
          </h1>
          <Button 
            className="bg-medical-blue hover:bg-medical-blue-dark"
            onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload New Chest X-ray
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Welcome Back</CardTitle>
              <CardDescription>{patientData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-medical-gray">
                <p>Last login: {patientData.lastLogin}</p>
                <p className="mt-1">Email: {patientData.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Chest Health Reports</CardTitle>
              <CardDescription>Summary of your reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-medical-gray">Pending</p>
                  <p className="text-2xl font-semibold text-medical-teal">{patientData.pendingReports}</p>
                </div>
                <div>
                  <p className="text-sm text-medical-gray">Completed</p>
                  <p className="text-2xl font-semibold text-medical-blue">{patientData.completedReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Billing Summary</CardTitle>
              <CardDescription>Your financial overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-medical-gray">Pending</p>
                  <p className="text-2xl font-semibold text-yellow-600">${patientData.pendingPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-medical-gray">Total Billed</p>
                  <p className="text-2xl font-semibold text-medical-gray-dark">${patientData.totalBilled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="pending">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-medical-gray-dark">Your Chest Health Records</h2>
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending">
                {analysisResult ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-medical-gray-dark">
                            New Analysis Result
                          </h3>
                          <p className="text-medical-gray">Uploaded on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                          Pending Review
                        </div>
                      </div>
                      
                      <div className="rounded-md bg-medical-gray-lightest p-4 mb-4">
                        <h4 className="font-medium mb-2">AI Analysis Results:</h4>
                        <p className="text-medical-gray-dark">
                          {analysisResult}
                        </p>
                        <div className="mt-4">
                          <div className="animate-pulse flex items-center text-medical-teal">
                            <div className="h-2.5 w-2.5 rounded-full bg-medical-teal mr-2"></div>
                            <span className="text-sm font-medium">Sent for healthcare professional review</span>
                          </div>
                          <p className="mt-2 text-sm text-medical-gray">
                            A healthcare professional will review your results and provide final interpretation.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-medical-gray">Estimated cost:</span>
                          <span className="font-medium text-medical-gray-dark">$80</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-medical-gray">You have no pending reports</p>
                      <Button 
                        className="mt-4 bg-medical-blue hover:bg-medical-blue-dark"
                        onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Upload New Chest X-ray
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardContent className="p-0">
                    {reportHistory.map((report, index) => (
                      <div key={report.id}>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-medical-gray-dark">
                                Report #{report.id}
                              </h3>
                              <p className="text-medical-gray">{report.date} • {report.doctor}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                                {report.status}
                              </div>
                              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                {report.cost}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-medical-gray-dark">
                            <p><span className="font-medium">Findings:</span> {report.findings}</p>
                          </div>
                          
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" className="text-medical-blue hover:bg-medical-blue/5">
                              View Full Report
                            </Button>
                          </div>
                        </div>
                        {index < reportHistory.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-medical-gray-lightest text-medical-gray-dark text-sm">
                            <th className="py-3 px-4 text-left font-medium">Invoice</th>
                            <th className="py-3 px-4 text-left font-medium">Date</th>
                            <th className="py-3 px-4 text-left font-medium">Description</th>
                            <th className="py-3 px-4 text-right font-medium">Amount</th>
                            <th className="py-3 px-4 text-right font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingHistory.map((item, index) => (
                            <tr key={item.id} className={`border-t border-medical-gray-light ${index % 2 === 1 ? 'bg-medical-gray-lightest/50' : ''}`}>
                              <td className="py-4 px-4 font-medium text-medical-blue">{item.id}</td>
                              <td className="py-4 px-4 text-medical-gray-dark">{item.date}</td>
                              <td className="py-4 px-4 text-medical-gray-dark">{item.description}</td>
                              <td className="py-4 px-4 text-right font-medium text-medical-gray-dark">{item.amount}</td>
                              <td className="py-4 px-4 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="p-6 border-t border-medical-gray-light">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-medical-gray">Total Pending:</span>
                          <span className="ml-2 font-semibold text-yellow-600">${patientData.pendingPayment}</span>
                        </div>
                        <Button className="bg-medical-blue hover:bg-medical-blue-dark">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <XrayUploader onImageUploaded={handleImageUploaded} />
            
            <div id="analysis-section" className="mt-6">
              <AIAnalysisViewer 
                imageUrl={uploadedImageUrl || ""} 
                onAnalysisComplete={handleAnalysisComplete} 
              />
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Chest Health History</CardTitle>
                <CardDescription>
                  Your chest health timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <History className="h-5 w-5 text-medical-blue mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-medical-gray-dark">Normal Chest X-ray</p>
                      <p className="text-sm text-medical-gray">April 22, 2025</p>
                      <p className="text-sm text-medical-gray">No abnormalities detected</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <History className="h-5 w-5 text-medical-blue mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-medical-gray-dark">Bronchial Wall Thickening</p>
                      <p className="text-sm text-medical-gray">March 15, 2025</p>
                      <p className="text-sm text-medical-gray">Minor bronchial wall thickening noted</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Complete Health History
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-medical-blue mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-medical-gray-dark">Follow-up Consultation</p>
                      <p className="text-sm text-medical-gray">May 3, 2025 • 2:00 PM</p>
                      <p className="text-sm text-medical-gray">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-center">
                  <Button variant="outline" className="w-full">
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
