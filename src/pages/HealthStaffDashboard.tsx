
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, FileText } from "lucide-react";
import { useHealthcareStaff } from "@/hooks/useHealthcareStaff";
import { HealthStaffStats } from "@/components/healthcare/HealthStaffStats";
import { PendingAnalysisTable } from "@/components/healthcare/PendingAnalysisTable";
import { PatientConsultations } from "@/components/healthcare/PatientConsultations";

const HealthStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newSearchParams = new URLSearchParams(location.search);
    if (value === 'overview') {
      newSearchParams.delete('tab');
    } else {
      newSearchParams.set('tab', value);
    }
    const newSearch = newSearchParams.toString();
    navigate({
      pathname: location.pathname,
      search: newSearch ? `?${newSearch}` : '',
    }, { replace: true });
  };

  // Filter analyses based on search query
  const filteredAnalyses = pendingAnalyses.filter(analysis => {
    if (!searchQuery) return true;
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      analysis.user_name?.toLowerCase().includes(lowercaseQuery) ||
      analysis.analysis_result?.toLowerCase().includes(lowercaseQuery) ||
      new Date(analysis.created_at).toLocaleDateString().includes(lowercaseQuery)
    );
  });

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

        <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending-analysis">
              Pending Analysis
              {pendingAnalyses.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingAnalyses.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity showing completed analyses */}
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
                  ) : completedAnalyses.length > 0 ? (
                    completedAnalyses.slice(0, 3).map((analysis) => (
                      <div key={analysis.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span>Reviewed X-ray for {analysis.user_name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(analysis.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">No recent activities to show</p>
                  )}
                  {completedAnalyses.length > 3 && (
                    <div className="text-center mt-2">
                      <Button 
                        variant="link" 
                        className="text-blue-600"
                        onClick={() => handleTabChange('completed-analysis')}
                      >
                        View All Activity
                      </Button>
                    </div>
                  )}
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
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search analyses..." 
                      className="pl-8 max-w-xs"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PendingAnalysisTable analyses={filteredAnalyses} isLoading={isLoading} />
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
