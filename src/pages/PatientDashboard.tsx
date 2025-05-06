
import { useState } from "react";
import { useEffect } from 'react';
import { useAuth } from "@/contexts/auth";
import { useChestAnalysis } from "@/hooks/useChestAnalysis";
import { useConsultations } from "@/hooks/useConsultations";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Scan, Activity, Clock, CreditCard } from "lucide-react";
import XrayUploader from "@/components/XrayUploader";
import AIAnalysisViewer from "@/components/AIAnalysisViewer";
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCards } from "@/components/dashboard/StatsCards";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { HealthTips } from "@/components/dashboard/HealthTips";
import { PendingReportsTab } from "@/components/dashboard/tabs/PendingReportsTab";
import { HistoryReportsTab } from "@/components/dashboard/tabs/HistoryReportsTab";
import { BillingHistoryTab } from "@/components/dashboard/tabs/BillingHistoryTab";

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
    toast.success("X-ray uploaded successfully!", {
      description: "Your image is being processed by our AI system",
      position: "top-center",
      duration: 3000
    });
    
    setTimeout(() => {
      document.getElementById("analysis-section")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 500);
  };

  const handleAnalysisComplete = (result: string) => {
    setAnalysisResult(result);
    toast.success("Analysis complete!", {
      description: "Results sent to healthcare professional for review",
      position: "top-center",
      duration: 4000,
      action: {
        label: "View Report",
        onClick: () => document.getElementById("records-tabs")?.scrollIntoView()
      }
    });
  };

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "center"
    });
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
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60",
        specialty: "Pulmonology"
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
        image: "https://images.unsplash.com/photo-1537368910025-70a0788ddc2a?w=400&auto=format&fit=crop&q=60",
        specialty: "Radiology"
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
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60",
        specialty: "Pulmonology"
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
        image: "https://images.unsplash.com/photo-1588421357567-bb76c7c7438f?w=400&auto=format&fit=crop&q=60",
        specialty: "Cardiology"
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
      status: "Paid",
      icon: <Scan className="h-4 w-4 text-green-500" />
    },
    {
      id: "INV-2389",
      date: "March 15, 2025",
      description: "Chest X-ray Analysis (XR-8532)", 
      amount: "$4.99",
      status: "Paid",
      icon: <Scan className="h-4 w-4 text-green-500" />
    },
    {
      id: "INV-2265",
      date: "February 3, 2025",
      description: "Chest X-ray Analysis (XR-8217)",
      amount: "$2.99", 
      status: "Paid",
      icon: <Scan className="h-4 w-4 text-green-500" />
    },
    {
      id: "INV-2156",
      date: "January 12, 2025",
      description: "Chest X-ray Analysis (XR-7995) + Consultation",
      amount: "$4.99",
      status: "Paid",
      icon: <Activity className="h-4 w-4 text-blue-500" />
    },
    {
      id: "INV-4521",
      date: "April 24, 2025",
      description: "Chest X-ray Analysis (XR-8921)",
      amount: "$3.99",
      status: "Pending",
      icon: <Clock className="h-4 w-4 text-amber-500" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-b from-sky-50/70 to-white min-h-screen">
        {/* Welcome Section with Floating Elements */}
        <div className="relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-200/30 rounded-full filter blur-3xl"></div>
          
          <WelcomeSection 
            userName={patientData.name} 
            onUploadClick={scrollToUpload}
          />
        </div>

        {/* Stats Cards with Floating Animation */}
        <div className="relative z-10 container mx-auto px-4 -mt-8">
          <StatsCards patientData={patientData} />
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upload Section with Glass Morphism */}
              <section id="upload-section">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-blue-100/50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 text-2xl font-semibold">
                          <Scan className="h-6 w-6" />
                          X-ray Analysis Portal
                        </CardTitle>
                        <CardDescription className="text-blue-600/80 mt-1">
                          Upload your chest X-ray for instant AI-powered analysis
                        </CardDescription>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-md hover:shadow-lg transition-all group"
                        onClick={scrollToUpload}
                      >
                        <PlusCircle className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                        New Analysis
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <XrayUploader onImageUploaded={handleImageUploaded} />
                  </CardContent>
                </Card>
              </section>

              {/* Analysis Results Section */}
              {uploadedImageUrl && (
                <section id="analysis-section">
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="border-b border-blue-100/50">
                      <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 text-2xl font-semibold">
                        <Activity className="h-6 w-6" />
                        AI Analysis Results
                      </CardTitle>
                      <CardDescription className="text-blue-600/80">
                        Detailed findings from our advanced imaging analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <AIAnalysisViewer 
                        imageUrl={uploadedImageUrl} 
                        onAnalysisComplete={handleAnalysisComplete} 
                      />
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Records Tabs with Animated Underline */}
              <section id="records-tabs">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <Tabs defaultValue="history">
                    <CardHeader className="border-b border-blue-100/50 pb-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 text-2xl font-semibold">
                            Medical Records
                          </CardTitle>
                          <CardDescription className="text-blue-600/80">
                            Your complete health history and documents
                          </CardDescription>
                        </div>
                        <TabsList className="bg-blue-50/50 backdrop-blur-sm h-auto p-1">
                          <TabsTrigger 
                            value="history" 
                            className="relative px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
                          >
                            <span className="z-10">History</span>
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-bottom"></span>
                          </TabsTrigger>
                          <TabsTrigger 
                            value="pending" 
                            className="relative px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
                          >
                            <span className="z-10">Pending</span>
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-bottom"></span>
                          </TabsTrigger>
                          <TabsTrigger 
                            value="billing" 
                            className="relative px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
                          >
                            <span className="z-10">Billing</span>
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-bottom"></span>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-hidden rounded-b-xl">
                      <TabsContent value="pending" className="m-0">
                        <PendingReportsTab 
                          analysisResult={analysisResult}
                          scrollToUploadSection={scrollToUpload}
                        />
                      </TabsContent>

                      <TabsContent value="history" className="m-0">
                        <HistoryReportsTab reportHistory={reportHistory} />
                      </TabsContent>

                      <TabsContent value="billing" className="m-0">
                        <BillingHistoryTab 
                          billingHistory={billingHistory}
                          pendingPayment={patientData.pendingPayment}
                        />
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>
              </section>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-8">
              {/* Appointments Section */}
              <section id="appointments-section">
                <UpcomingAppointments />
              </section>

              {/* Quick Actions with Hover Effects */}
              <QuickActions />

              {/* Health Tips with Gradient Border */}
              <HealthTips />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
