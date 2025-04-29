
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChestAnalysis } from "@/hooks/useChestAnalysis";
import { useConsultations } from "@/hooks/useConsultations";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import XrayUploader from "@/components/XrayUploader";
import AIAnalysisViewer from "@/components/AIAnalysisViewer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <DashboardLayout>
      <WelcomeSection 
        userName={patientData.name} 
        onUploadClick={scrollToUpload}
      />
      
      <StatsCards patientData={patientData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Section */}
          <section id="upload-section">
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="border-b border-blue-50">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <FileText className="h-5 w-5 text-blue-600" />
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
                    imageUrl={uploadedImageUrl} 
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
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Appointments Section */}
          <section id="appointments-section">
            <UpcomingAppointments />
          </section>

          {/* Quick Actions */}
          <QuickActions />

          {/* Health Tips */}
          <HealthTips />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
