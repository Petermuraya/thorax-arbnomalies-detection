import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HealthcareVerificationForm from '@/components/HealthcareVerificationForm';
import { useHealthcareVerification } from '@/hooks/useHealthcareVerification';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

// Mock data for the dashboard
const mockPatients = [
  { id: 1, name: 'Sarah Johnson', age: 42, status: 'Pending Review', image: 'https://randomuser.me/api/portraits/women/20.jpg', uploadedAt: '2025-04-25' },
  { id: 2, name: 'Michael Chen', age: 35, status: 'Reviewed', image: 'https://randomuser.me/api/portraits/men/32.jpg', uploadedAt: '2025-04-24' },
  { id: 3, name: 'Emily Rodriguez', age: 28, status: 'Pending Review', image: 'https://randomuser.me/api/portraits/women/56.jpg', uploadedAt: '2025-04-23' },
  { id: 4, name: 'David Kim', age: 51, status: 'Reviewed', image: 'https://randomuser.me/api/portraits/men/45.jpg', uploadedAt: '2025-04-22' },
];

const mockAnalysisResults = [
  { id: 101, patientName: 'Sarah Johnson', condition: 'Possible pneumonia', confidence: '87%', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000', aiVerdict: 'High confidence of infection' },
  { id: 102, patientName: 'Michael Chen', condition: 'Normal', confidence: '92%', image: 'https://w0.peakpx.com/wallpaper/744/474/HD-wallpaper-chest-x-ray-xray-medicine-health-doctor.jpg', aiVerdict: 'No abnormalities detected' },
  { id: 103, patientName: 'Emily Rodriguez', condition: 'Possible fracture', confidence: '76%', image: 'https://media.licdn.com/dms/image/D5612AQHUMdhxKTq8-Q/article-cover_image-shrink_720_1280/0/1693326405786?e=2147483647&v=beta&t=L5rL5tIpBJQOzqIF7OfcLTn6PXwHOK0JosrTl-R9P_I', aiVerdict: 'Recommend additional tests' },
];

const StatCard = ({ title, value, className }: { title: string; value: string; className?: string }) => (
  <Card className={`p-6 ${className}`}>
    <p className="text-sm font-medium text-medical-gray">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </Card>
);

const HealthStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { verification, loading } = useHealthcareVerification();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  // Show loading state while verification status is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-medical-gray-dark">Loading verification status...</p>
        </div>
      </div>
    );
  }

  // If not verified or pending verification, still show verification form
  if (!verification || verification.status !== 'approved') {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <HealthcareVerificationForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Healthcare Professional Dashboard</h1>
          <p className="text-medical-gray">Manage patient cases and review AI analysis results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Pending Reviews" value="8" className="bg-amber-50 border-amber-200" />
          <StatCard title="Completed Reviews" value="42" className="bg-green-50 border-green-200" />
          <StatCard title="Total Cases" value="50" className="bg-blue-50 border-blue-200" />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">New patient case assigned</h3>
                      <p className="text-sm text-gray-500">Sarah Johnson's x-ray needs your review</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      2 hours ago
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Case review completed</h3>
                      <p className="text-sm text-gray-500">You've completed review for Michael Chen</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      Yesterday
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">New verification request</h3>
                      <p className="text-sm text-gray-500">Dr. James Wilson has requested verification</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
                <div className="space-y-4">
                  {mockPatients.filter(p => p.status === 'Pending Review').slice(0, 3).map(patient => (
                    <div key={patient.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={patient.image} alt={patient.name} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-gray-500">Age: {patient.age} • Uploaded on {patient.uploadedAt}</p>
                      </div>
                      <Button className="ml-auto" size="sm">Review</Button>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent AI Analyses</h2>
                <div className="space-y-4">
                  {mockAnalysisResults.slice(0, 3).map(result => (
                    <div key={result.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="h-16 w-16 rounded-lg overflow-hidden">
                        <img src={result.image} alt="X-ray" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{result.patientName}</h3>
                        <p className="text-sm text-gray-500">{result.condition} • {result.confidence} confidence</p>
                      </div>
                      <Button variant="outline" className="ml-auto" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Patient Cases</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Avatar>
                                <AvatarImage src={patient.image} alt={patient.name} />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.age}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.uploadedAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'Pending Review' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-medical-blue hover:text-medical-blue-dark"
                            onClick={() => toast.info(`Viewing case for ${patient.name}`)}
                          >
                            View Case
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">AI Analysis Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAnalysisResults.map((result) => (
                  <Card key={result.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={result.image} 
                        alt="X-ray scan" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{result.patientName}</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Condition:</span>
                        <span className="text-sm font-medium">{result.condition}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm text-gray-500">AI Confidence:</span>
                        <span className="text-sm font-medium">{result.confidence}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">{result.aiVerdict}</p>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.info(`Viewing details for ${result.patientName}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => toast.success(`Review submitted for ${result.patientName}`)}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper component for the button
const Button = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'default' | 'outline'; 
  size?: 'default' | 'sm';
  onClick?: () => void;
}) => {
  const baseClasses = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";
  const variantClasses = variant === 'default' 
    ? "bg-medical-blue text-white hover:bg-medical-blue-dark" 
    : "border border-medical-gray-light text-medical-blue hover:bg-blue-50";
  const sizeClasses = size === 'default' ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default HealthStaffDashboard;
