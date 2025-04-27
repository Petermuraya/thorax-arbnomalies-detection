
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  patientData: {
    name: string;
    recentUploads: number;
    pendingReports: number;
    completedReports: number;
    totalBilled: number;
    pendingPayment: number;
  };
}

export const StatsCards = ({ patientData }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-medical-blue-light/10 to-medical-teal-light/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Welcome Back</CardTitle>
          <CardDescription>{patientData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-medical-gray space-y-1">
            <p>Recent Uploads: {patientData.recentUploads}</p>
            <p>Pending Reviews: {patientData.pendingReports}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-medical-teal-light/10 to-medical-blue-light/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Report Status</CardTitle>
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

      <Card className="bg-gradient-to-br from-medical-blue-light/10 to-medical-teal-light/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Billing Summary</CardTitle>
          <CardDescription>Your financial overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-medical-gray">Pending</p>
              <p className="text-2xl font-semibold text-yellow-600">
                ${(patientData.pendingPayment / 100).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-medical-gray">Total Billed</p>
              <p className="text-2xl font-semibold text-medical-gray-dark">
                ${(patientData.totalBilled / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
