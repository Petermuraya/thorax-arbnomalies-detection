
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calendar, Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Sample patient data
  const patientData = {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    lastLogin: "April 23, 2025, 8:35 AM",
    recentUploads: 3,
    pendingReports: 1,
    completedReports: 5
  };
  
  // Sample report history
  const reportHistory = [
    {
      id: "XR-8765",
      date: "April 22, 2025",
      status: "Completed",
      findings: "Normal lung fields, no abnormalities detected",
      doctor: "Dr. Michael Stevens"
    },
    {
      id: "XR-8532",
      date: "March 15, 2025",
      status: "Completed",
      findings: "Minor bronchial wall thickening, follow-up recommended",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: "XR-8217",
      date: "February 3, 2025",
      status: "Completed",
      findings: "Normal chest X-ray",
      doctor: "Dr. Michael Stevens"
    },
    {
      id: "XR-7995",
      date: "January 12, 2025",
      status: "Completed",
      findings: "Slight cardiomegaly, no acute pulmonary findings",
      doctor: "Dr. David Thompson"
    },
    {
      id: "XR-7854",
      date: "December 5, 2024",
      status: "Completed",
      findings: "Normal chest X-ray",
      doctor: "Dr. Sarah Johnson"
    }
  ];
  
  // Sample pending report
  const pendingReport = {
    id: "XR-8921",
    date: "April 24, 2025",
    status: "Pending Review",
    uploadedAt: "10:15 AM"
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // Check if file is an image
    if (!selectedFile.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("X-ray uploaded successfully");
      setSelectedFile(null);
      
      // Navigate to analysis result after short delay
      setTimeout(() => {
        navigate("/analysis-result");
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload X-ray. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-medical-gray-lightest">
      {/* Header */}
      <header className="bg-white border-b border-medical-gray-light shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-md overflow-hidden hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xl">X</span>
            </div>
            <span className="font-bold text-xl text-medical-gray-dark">XRay Insight</span>
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

      {/* Dashboard Content */}
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
            Upload New X-ray
          </Button>
        </div>

        {/* Overview Cards */}
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
              <CardTitle className="text-lg font-medium">X-ray Reports</CardTitle>
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
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <CardDescription>Your latest uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-medical-gray">This month</p>
                  <p className="text-2xl font-semibold text-medical-gray-dark">{patientData.recentUploads}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-medical-blue hover:text-medical-blue-dark hover:bg-medical-blue/5"
                  onClick={() => navigate("/upload-history")}
                >
                  View all
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Reports */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pending">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-medical-gray-dark">Your X-ray Reports</h2>
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending">
                {pendingReport ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-medical-gray-dark">
                            Report #{pendingReport.id}
                          </h3>
                          <p className="text-medical-gray">Uploaded on {pendingReport.date} at {pendingReport.uploadedAt}</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                          {pendingReport.status}
                        </div>
                      </div>
                      
                      <div className="rounded-md bg-medical-gray-lightest p-4 mb-4">
                        <div className="flex items-center mb-4">
                          <div className="animate-pulse-slow h-4 w-4 rounded-full bg-medical-teal mr-2"></div>
                          <span className="text-medical-gray-dark font-medium">Analysis in progress</span>
                        </div>
                        <p className="text-medical-gray text-sm">
                          Your X-ray is being analyzed by our AI system and will be reviewed by a healthcare professional.
                          Results are typically available within 30 minutes.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" className="mr-2">View Details</Button>
                        <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">Cancel Analysis</Button>
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
                        Upload New X-ray
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
                            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                              {report.status}
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
            </Tabs>
          </div>

          {/* Right Column - Upload and Calendar */}
          <div>
            {/* Upload Section */}
            <Card className="mb-8" id="upload-section">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Upload New X-ray</CardTitle>
                <CardDescription>
                  Upload your chest X-ray for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-medical-gray-light rounded-lg p-6 text-center">
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {selectedFile ? (
                    <div>
                      <p className="text-medical-gray-dark mb-2">
                        Selected file:
                      </p>
                      <p className="text-medical-blue font-medium mb-4">
                        {selectedFile.name}
                      </p>
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          className="mr-2"
                          onClick={() => setSelectedFile(null)}
                        >
                          Change
                        </Button>
                        <Button 
                          className="bg-medical-blue hover:bg-medical-blue-dark"
                          onClick={handleUpload}
                          disabled={isUploading}
                        >
                          {isUploading ? "Uploading..." : "Upload Now"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-medical-gray mx-auto mb-4" />
                      <p className="text-medical-gray mb-4">
                        Drag and drop your X-ray image here, or click to browse
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-medical-gray mt-2">
                  Supported formats: JPG, PNG, DICOM. Maximum file size: 20MB.
                </p>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
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
