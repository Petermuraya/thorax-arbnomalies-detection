
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Calendar, User, CheckCheck, AlertCircle, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const HealthStaffDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample health staff data
  const staffData = {
    name: "Dr. Michael Rodriguez",
    role: "Radiologist",
    email: "m.rodriguez@xrayinsight.com",
    lastLogin: "April 25, 2025, 9:15 AM",
  };
  
  // Sample statistics
  const statistics = {
    pendingReviews: 5,
    reviewedToday: 12,
    totalReviewed: 1458,
    accuracy: 98.7
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
      aiAccuracy: "High"
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

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleReviewCase = (reportId: string) => {
    toast.info(`Opening report ${reportId} for review`);
    navigate(`/case-review/${reportId}`);
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
              <span className="text-white font-bold text-xl">X</span>
            </div>
            <span className="font-bold text-xl text-medical-gray-dark">XRay Insight</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.pendingReviews}</p>
                  <p className="text-sm text-medical-gray">Awaiting your assessment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Reviewed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCheck className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.reviewedToday}</p>
                  <p className="text-sm text-medical-gray">Cases completed today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
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
                  <p className="text-sm text-medical-gray">All-time reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">AI Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-semibold text-medical-gray-dark">{statistics.accuracy}%</p>
                <Progress value={statistics.accuracy} className="h-2" />
                <p className="text-sm text-medical-gray">AI accuracy correlation</p>
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
                  X-rays awaiting your professional assessment
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
          </div>

          {/* Right Column */}
          <div className="space-y-8">
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
                    </div>
                    <p className="text-sm text-medical-gray-dark">{review.findings}</p>
                    {index < recentReviews.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Today's Schedule</CardTitle>
                <CardDescription>
                  Your appointments for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-medical-blue mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-medical-gray-dark">Team Meeting</p>
                      <p className="text-sm text-medical-gray">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-medical-blue mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-medical-gray-dark">Patient Consultation</p>
                      <p className="text-sm text-medical-gray">4:15 PM - 4:45 PM</p>
                      <p className="text-sm text-medical-gray">Maria Rodriguez</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full">
                  View Full Calendar
                </Button>
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
                      <p className="font-medium text-medical-gray-dark">System Maintenance</p>
                      <p className="text-sm text-medical-gray">
                        Scheduled maintenance on April 30th from 2AM - 4AM EST.
                      </p>
                      <p className="text-xs text-medical-gray mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-medical-gray-dark">AI Model Updated</p>
                      <p className="text-sm text-medical-gray">
                        The AI diagnostic model has been updated to version 3.2.1 with improved accuracy.
                      </p>
                      <p className="text-xs text-medical-gray mt-1">1 day ago</p>
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
