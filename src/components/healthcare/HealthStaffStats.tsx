
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  stats: {
    pendingAnalysesCount: number;
    completedAnalysesCount: number;
    todayConsultationsCount: number;
    totalPatientsCount: number;
  };
  isLoading: boolean;
}

export function HealthStaffStats({ stats, isLoading }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Pending Reviews"
        value={stats.pendingAnalysesCount}
        color="amber"
        isLoading={isLoading}
      />
      <StatCard 
        title="Completed Reviews"
        value={stats.completedAnalysesCount}
        color="green"
        isLoading={isLoading}
      />
      <StatCard 
        title="Today's Consultations"
        value={stats.todayConsultationsCount}
        color="blue"
        isLoading={isLoading}
      />
      <StatCard 
        title="Total Patients"
        value={stats.totalPatientsCount}
        color="purple"
        isLoading={isLoading}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  color: "blue" | "green" | "amber" | "purple";
  isLoading: boolean;
}

function StatCard({ title, value, color, isLoading }: StatCardProps) {
  const bgColor = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    amber: "bg-amber-50",
    purple: "bg-purple-50",
  };
  
  const textColor = {
    blue: "text-blue-700",
    green: "text-green-700",
    amber: "text-amber-700",
    purple: "text-purple-700",
  };

  return (
    <Card className={`${bgColor[color]} border-none`}>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
        ) : (
          <p className={`text-2xl font-bold ${textColor[color]}`}>{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
