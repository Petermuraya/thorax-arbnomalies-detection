
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useHealthcareStaff } from "@/hooks/useHealthcareStaff";
import { HealthStaffStats } from "@/components/healthcare/HealthStaffStats";
import { PendingAnalysisTable } from "@/components/healthcare/PendingAnalysisTable";
import { PatientConsultations } from "@/components/healthcare/PatientConsultations";

const HealthStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { 
    pendingAnalyses, 
    completedAnalyses,
    todayConsultations,
    isLoading,
    refreshData,
    stats
  } = useHealthcareStaff();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Health Staff Dashboard</h1>
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        <HealthStaffStats stats={stats} isLoading={isLoading} />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending-analysis">
              Pending Analysis
              {pendingAnalyses.length > 0 && (
                <Badge variant="warning" className="ml-2">
                  {pendingAnalyses.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest healthcare activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span>You reviewed 3 X-ray analyses</span>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span>Completed consultation with James Wilson</span>
                        </div>
                        <span className="text-sm text-gray-500">Yesterday</span>
                      </div>
                    </>
                  )}
                  <div className="text-center mt-2">
                    <Button variant="link" className="text-blue-600">View All Activity</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Consultations</CardTitle>
                  <CardDescription>Scheduled appointments for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ) : todayConsultations.length > 0 ? (
                    <div className="space-y-2">
                      {todayConsultations.map(consultation => (
                        <div key={consultation.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{consultation.patient_name}</p>
                            <p className="text-sm text-gray-500">{new Date(consultation.scheduled_for).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          <Badge variant={consultation.status === 'scheduled' ? 'warning' : 'success'}>
                            {consultation.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No consultations scheduled for today</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pending-analysis" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending X-ray Analyses</CardTitle>
                  <CardDescription>
                    Review and provide professional feedback on patient X-rays
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search analyses..." 
                    className="max-w-xs"
                    startContent={<Search className="h-4 w-4" />}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <PendingAnalysisTable analyses={pendingAnalyses} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Consultations</CardTitle>
                <CardDescription>View and manage your patient consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientConsultations />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HealthStaffDashboard;
