import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Calendar, User, CheckCheck, AlertCircle, Clock, Search, Upload, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const HealthStaffDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user, signOut } = useAuth();

  // Sample health staff data
  const staffData = {
    name: user?.user_metadata?.full_name || "Dr. Medical Professional",
    role: "Radiologist",
    email: user?.email || "professional@chest.com",
    lastLogin: new Date().toLocaleString(),
  };
  
  // Sample statistics
  const statistics = {
    pendingReviews: 5,
    reviewedToday: 12,
    totalReviewed: 1458,
    accuracy: 98.7,
    totalEarnings: 4520,
    earningsThisMonth: 560
  };
  
  // Sample patient list
  const patientList = [
    {
      id: "PT-5642",
      name: "Jane Cooper",
      reportId: "XR-8921",
      date: "April 25, 2025",
      time: "10:15 AM",
      status: "Waiting for Review",
      priority: "High",
      aiFindings: "Possible pneumonia, right lower lobe"
    },
    {
      id: "PT-5638",
      name: "Alex Morgan",
      reportId: "XR-8920",
      date: "April 25, 2025",
      time: "9:42 AM",
      status: "Waiting for Review",
      priority: "Medium",
      aiFindings: "No significant abnormalities detected"
    },
    {
      id: "PT-5635",
      name: "Robert Johnson",
      reportId: "XR-8918",
      date: "April 25, 2025",
      time: "9:21 AM",
      status: "Waiting for Review",
      priority: "Medium",
      aiFindings: "Minor cardiomegaly noted"
    },
    {
      id: "PT-5632",
      name: "Samantha Lee",
      reportId: "XR-8916",
      date: "April 25, 2025",
      time: "8:55 AM",
      status: "Waiting for Review",
      priority: "Low",
      aiFindings: "Normal chest X-ray"
    },
    {
      id: "PT-5630",
      name: "David Thompson",
      reportId: "XR-8915",
      date: "April 24, 2025",
      time: "5:30 PM",
      status: "Waiting for Review",
      priority: "High",
      aiFindings: "Possible hilar lymphadenopathy"
    }
  ];
  
  // Sample recent reviews
  const recentReviews = [
    {
      id: "XR-8914",
      patientName: "Maria Gonzalez",
      date: "April 24, 2025",
      time: "4:40 PM",
      findings: "Confirmed mild bronchial wall thickening. Recommended follow-up in 4 weeks.",
      aiAccuracy: "High",
      earnings: "$45"
    },
    {
      id: "XR-8912",
      patientName: "William Chen",
      date: "April 24, 2025",
      time: "3:15 PM",
      findings: "Normal chest X-ray. AI assessment confirmed.",
      aiAccuracy: "High"
    },
    {
      id: "XR-8909",
      patientName: "Sarah Johnson",
      date: "April 24, 2025",
      time: "1:50 PM",
      findings: "Detected early infiltrates not identified by AI. Recommended antibiotics and follow-up.",
      aiAccuracy: "Medium"
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleReviewCase = (reportId: string) => {
    toast.info(`Opening report ${reportId} for review`);
    navigate(`/case-review/${reportId}`);
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
    
    if (!selectedFile.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Chest X-ray uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload X-ray. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredPatients = searchQuery
    ? patientList.filter(
        patient =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.aiFindings.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patientList;

  return (
    <div className="min-h-screen bg-medical-gray-lightest">
      {/* Header */}
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
              onClick={() => navigate("/staff-profile")}
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
            Healthcare Staff Dashboard
          </h1>
          <div className="text-right">
            <h2 className="font-semibold text-medical-gray-dark">{staffData.name}</h2>
            <p className="text-sm text-medical-gray">{staffData.role}</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.pendingReviews}</p>
                  <p className="text-sm text-medical-gray">Awaiting</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Reviewed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCheck className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.reviewedToday}</p>
                  <p className="text-sm text-medical-gray">Cases today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-medical-blue rounded-full flex items-center justify-center text-white mr-3">
                  <span className="font-semibold">#</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.totalReviewed}</p>
                  <p className="text-sm text-medical-gray">All-time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">AI Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.accuracy}%</p>
                <Progress value={statistics.accuracy} className="h-2" />
                <p className="text-sm text-medical-gray">AI correlation</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">${statistics.earningsThisMonth}</p>
                  <p className="text-sm text-medical-gray">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">${statistics.totalEarnings}</p>
                  <p className="text-sm text-medical-gray">All-time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Pending Reviews */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  <span>Pending Reviews</span>
                  <Badge variant="outline" className="ml-2">
                    {filteredPatients.length} cases
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Chest X-rays awaiting your professional assessment
                </CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                  <Input
                    placeholder="Search by patient name, ID or findings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-medical-gray-lightest text-medical-gray-dark text-sm">
                        <th className="py-3 px-4 text-left font-medium">Patient</th>
                        <th className="py-3 px-4 text-left font-medium">Report</th>
                        <th className="py-3 px-4 text-left font-medium">Submitted</th>
                        <th className="py-3 px-4 text-left font-medium">Priority</th>
                        <th className="py-3 px-4 text-left font-medium">AI Findings</th>
                        <th className="py-3 px-4 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient, index) => (
                          <tr key={patient.reportId} className={`border-t border-medical-gray-light ${index % 2 === 1 ? 'bg-medical-gray-lightest/50' : ''}`}>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=random`} alt={patient.name} />
                                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-medical-gray-dark">{patient.name}</p>
                                  <p className="text-xs text-medical-gray">{patient.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p className="font-medium text-medical-gray-dark">{patient.reportId}</p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-medical-gray-dark">{patient.time}</p>
                              <p className="text-xs text-medical-gray">{patient.date}</p>
                            </td>
                            <td className="py-4 px-4">
                              <Badge 
                                className={`${
                                  patient.priority === "High" ? "bg-red-100 text-red-800" :
                                  patient.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-green-100 text-green-800"
                                }`}
                              >
                                {patient.priority}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 max-w-[200px]">
                              <p className="text-medical-gray-dark truncate" title={patient.aiFindings}>
                                {patient.aiFindings}
                              </p>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Button 
                                size="sm"
                                onClick={() => handleReviewCase(patient.reportId)}
                                className="bg-medical-blue hover:bg-medical-blue-dark"
                              >
                                Review
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-medical-gray">
                            {searchQuery ? "No patients match your search" : "No pending reviews at the moment"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Upload Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Upload Patient Chest X-ray</CardTitle>
                <CardDescription>
                  Upload a chest X-ray for AI analysis and consultation
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
                        Drag and drop a chest X-ray image here, or click to browse
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
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Earnings Breakdown</CardTitle>
                <CardDescription>
                  Your revenue from consultations and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-medical-gray-dark">Consultations</span>
                    <span className="font-medium">$320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-medical-gray-dark">X-ray Reviews</span>
                    <span className="font-medium">$240</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-medical-gray-dark">Total This Month</span>
                    <span className="text-medical-blue">${statistics.earningsThisMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Reviews</CardTitle>
                <CardDescription>
                  Your latest case assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {recentReviews.map((review, index) => (
                  <div key={review.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-medical-gray-dark">{review.patientName}</h3>
                        <p className="text-xs text-medical-gray">{review.id} • {review.date} {review.time}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${
                            review.aiAccuracy === "High" ? "border-green-500 text-green-700" :
                            review.aiAccuracy === "Medium" ? "border-yellow-500 text-yellow-700" :
                            "border-red-500 text-red-700"
                          }`}
                        >
                          {review.aiAccuracy} AI Match
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {review.earnings}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-medical-gray-dark">{review.findings}</p>
                    {index < recentReviews.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">System Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-medical-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-medical-gray-dark">Patient Analysis Complete</p>
                      <p className="text-sm text-medical-gray">
                        AI analysis completed for 3 patients. Ready for your review.
                      </p>
                      <p className="text-xs text-medical-gray mt-1">2 hours ago</p>
                    </div>
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

export default HealthStaffDashboard;
