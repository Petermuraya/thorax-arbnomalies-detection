import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Upload, FileText, History, DollarSign, Calendar, Stethoscope, User, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useChestAnalysis } from "@/hooks/useChestAnalysis";
import { useConsultations } from "@/hooks/useConsultations";
import XrayUploader from "@/components/XrayUploader";
import AIAnalysisViewer from "@/components/AIAnalysisViewer";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ReportCard } from "@/components/dashboard/ReportCard";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const PatientDashboard = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { user } = useAuth();
  const { analyses, loading: analysesLoading } = useChestAnalysis();
  const { consultations, loading: consultationsLoading } = useConsultations();

  const handleImageUploaded = (imageUrl: string, file: File) => {
    setUploadedImageUrl(imageUrl);
    setUploadedFile(file);
    toast.success("X-ray uploaded successfully");
    
    document.getElementById("analysis-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleAnalysisComplete = (result: string) => {
    setAnalysisResult(result);
    toast.success("Analysis complete! Results sent to healthcare professional for review.");
  };

  const totalBilled = consultations.reduce((sum, consultation) => sum + (consultation.cost * 100), 0);
  const pendingPayment = consultations
    .filter(c => c.status === 'scheduled')
    .reduce((sum, consultation) => sum + (consultation.cost * 100), 0);

  const patientData = {
    name: user?.user_metadata?.full_name || "Patient",
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
      doctor: {
        name: "Dr. Michael Stevens",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
      },
      cost: "$3.99"
    },
    {
      id: "XR-8532",
      date: "March 15, 2025",
      status: "Completed",
      findings: "Minor bronchial wall thickening, follow-up recommended",
      doctor: {
        name: "Dr. Sarah Johnson",
        image: "https://images.unsplash.com/photo-1537368910025-70a0788ddc2a?w=400&auto=format&fit=crop&q=60"
      },
      cost: "$4.99"
    },
    {
      id: "XR-8217",
      date: "February 3, 2025",
      status: "Completed",
      findings: "Normal chest X-ray",
      doctor: {
        name: "Dr. Michael Stevens",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
      },
      cost: "$2.99"
    },
    {
      id: "XR-7995",
      date: "January 12, 2025",
      status: "Completed",
      findings: "Slight cardiomegaly, no acute pulmonary findings",
      doctor: {
        name: "Dr. David Thompson",
        image: "https://images.unsplash.com/photo-1588421357567-bb76c7c7438f?w=400&auto=format&fit=crop&q=60"
      },
      cost: "$4.99"
    }
  ];

  const billingHistory = [
    {
      id: "INV-2451",
      date: "April 22, 2025", 
      description: "Chest X-ray Analysis (XR-8765)",
      amount: "$3.99",
      status: "Paid"
    },
    {
      id: "INV-2389",
      date: "March 15, 2025",
      description: "Chest X-ray Analysis (XR-8532)", 
      amount: "$4.99",
      status: "Paid"
    },
    {
      id: "INV-2265",
      date: "February 3, 2025",
      description: "Chest X-ray Analysis (XR-8217)",
      amount: "$2.99", 
      status: "Paid"
    },
    {
      id: "INV-2156",
      date: "January 12, 2025",
      description: "Chest X-ray Analysis (XR-7995) + Consultation",
      amount: "$4.99",
      status: "Paid"
    },
    {
      id: "INV-4521",
      date: "April 24, 2025",
      description: "Chest X-ray Analysis (XR-8921)",
      amount: "$3.99",
      status: "Pending"
    }
  ];

  const appointments = [
    {
      id: "APT-7894",
      date: "May 3, 2025",
      time: "2:00 PM",
      type: "Follow-up Consultation",
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Pulmonology",
        image: "https://images.unsplash.com/photo-1537368910025-70a0788ddc2a?w=400&auto=format&fit=crop&q=60"
      },
      status: "Confirmed"
    },
    {
      id: "APT-7895",
      date: "May 10, 2025",
      time: "10:30 AM",
      type: "Annual Checkup",
      doctor: {
        name: "Dr. Michael Stevens",
        specialty: "General Medicine",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
      },
      status: "Pending"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      {/* Notification Bell - Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Welcome back, <span className="text-blue-600">{patientData.name}</span>
            </h1>
            <p className="text-slate-500">Here's your health dashboard overview</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="border-blue-100 bg-white hover:bg-blue-50 text-blue-600"
              onClick={() => document.getElementById("appointments-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload X-ray
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards patientData={patientData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <section id="upload-section">
              <Card className="border-blue-100 shadow-sm">
                <CardHeader className="border-b border-blue-50">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    Chest X-ray Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload your chest X-ray for AI-powered analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <XrayUploader onImageUploaded={handleImageUploaded} />
                </CardContent>
              </Card>
            </section>

            {/* Analysis Section */}
            {uploadedImageUrl && (
              <section id="analysis-section">
                <Card className="border-blue-100 shadow-sm">
                  <CardHeader className="border-b border-blue-50">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Analysis Results
                    </CardTitle>
                    <CardDescription>
                      Review your X-ray analysis findings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <AIAnalysisViewer 
                      imageUrl={uploadedImageUrl || ""} 
                      onAnalysisComplete={handleAnalysisComplete} 
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Records Tabs */}
            <Card className="border-blue-100 shadow-sm">
              <Tabs defaultValue="history">
                <CardHeader className="border-b border-blue-50 pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-slate-800">Medical Records</CardTitle>
                    <TabsList className="bg-blue-50">
                      <TabsTrigger value="history" className="data-[state=active]:bg-white">
                        History
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-white">
                        Pending
                      </TabsTrigger>
                      <TabsTrigger value="billing" className="data-[state=active]:bg-white">
                        Billing
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <TabsContent value="pending" className="m-0">
                    {analysisResult ? (
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                              New Analysis Result
                            </h3>
                            <p className="text-slate-500 text-sm">
                              Uploaded on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge variant="warning">Pending Review</Badge>
                        </div>
                        
                        <div className="rounded-lg bg-blue-50 p-4 mb-4">
                          <h4 className="font-medium mb-2 text-slate-800">AI Analysis Results:</h4>
                          <p className="text-slate-700">{analysisResult}</p>
                          <div className="mt-4">
                            <div className="animate-pulse flex items-center text-blue-600">
                              <div className="h-2.5 w-2.5 rounded-full bg-blue-600 mr-2"></div>
                              <span className="text-sm font-medium">Sent for healthcare professional review</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500">
                              A healthcare professional will review your results and provide final interpretation.
                            </p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Estimated cost:</span>
                            <span className="font-medium text-slate-800">$2.99</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-slate-500">You have no pending reports</p>
                        <Button 
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
                        >
                          Upload New Chest X-ray
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="history" className="m-0">
                    <div className="divide-y divide-slate-100">
                      {reportHistory.map((report) => (
                        <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
                          <ReportCard report={report} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="billing" className="m-0">
                    <div className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm">
                              <th className="py-3 px-6 text-left font-medium">Invoice</th>
                              <th className="py-3 px-6 text-left font-medium">Date</th>
                              <th className="py-3 px-6 text-left font-medium">Description</th>
                              <th className="py-3 px-6 text-right font-medium">Amount</th>
                              <th className="py-3 px-6 text-right font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {billingHistory.map((item, index) => (
                              <tr 
                                key={item.id} 
                                className={`border-t border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                              >
                                <td className="py-4 px-6 font-medium text-blue-600">{item.id}</td>
                                <td className="py-4 px-6 text-slate-700">{item.date}</td>
                                <td className="py-4 px-6 text-slate-700">{item.description}</td>
                                <td className="py-4 px-6 text-right font-medium text-slate-800">{item.amount}</td>
                                <td className="py-4 px-6 text-right">
                                  <Badge variant={item.status === 'Paid' ? 'success' : 'warning'}>
                                    {item.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-6 border-t border-slate-100 bg-slate-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-500">Total Pending:</span>
                            <span className="ml-2 font-semibold text-amber-600">${(patientData.pendingPayment / 100).toFixed(2)}</span>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Appointments Section */}
            <section id="appointments-section">
              <Card className="border-blue-100 shadow-sm">
                <CardHeader className="border-b border-blue-50">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>
                    Your scheduled consultations and visits
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.doctor.image} />
                            <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-slate-800">{appointment.type}</h3>
                              <Badge variant={appointment.status === 'Confirmed' ? 'success' : 'warning'}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">{appointment.doctor.name}</p>
                            <p className="text-sm text-slate-500">{appointment.doctor.specialty}</p>
                            <div className="mt-2 flex items-center text-sm text-slate-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {appointment.date} • {appointment.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-0" />
                  <div className="p-4">
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                      Schedule New Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Actions */}
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="border-b border-blue-50">
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex-col gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-normal">My Profile</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-normal">Medical Records</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm font-normal">Payments</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Stethoscope className="h-5 w-5" />
                  <span className="text-sm font-normal">Find Doctors</span>
                </Button>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="border-b border-blue-50">
                <CardTitle className="text-slate-800">Health Tips</CardTitle>
                <CardDescription>For your respiratory health</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💨</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Deep Breathing</h4>
                    <p className="text-sm text-slate-500">Practice deep breathing exercises daily to improve lung capacity.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🚭</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Avoid Smoking</h4>
                    <p className="text-sm text-slate-500">Smoking damages lung tissue and reduces function.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🏃</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Regular Exercise</h4>
                    <p className="text-sm text-slate-500">Cardio exercises strengthen respiratory muscles.</p>
                  </div>
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
