
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, Calendar, Stethoscope } from "lucide-react";
import { useNotify } from "@/hooks/useNotify";

interface HealthStaffStatsProps {
  stats: {
    pendingAnalysesCount: number;
    completedAnalysesCount: number;
    todayConsultationsCount: number;
    totalPatientsCount: number;
  };
  isLoading: boolean;
}

export const HealthStaffStats = ({ stats, isLoading }: HealthStaffStatsProps) => {
  const { notifySuccess, notifyWarning, notifyInfo } = useNotify();
  const welcomeNotificationSent = useRef(false);
  
  useEffect(() => {
    // Only show welcome notification once per session and when data is loaded
    if (!isLoading && !welcomeNotificationSent.current) {
      // Welcome notification - only show once per session
      notifySuccess(
        "Welcome back, Doctor", 
        "Your dashboard is ready with the latest updates",
        { showToast: true }
      );
      welcomeNotificationSent.current = true;
      
      // Only show these notifications if there's something to notify about
      if (stats.pendingAnalysesCount > 0) {
        notifyWarning(
          "Pending Analyses", 
          `You have ${stats.pendingAnalysesCount} X-ray ${stats.pendingAnalysesCount === 1 ? 'analysis' : 'analyses'} waiting for your review`,
          { 
            showToast: false,
            link: "/health-staff-dashboard?tab=pending-analysis",
            actionText: "Review Analyses" 
          }
        );
      }
      
      if (stats.todayConsultationsCount > 0) {
        notifyInfo(
          "Today's Schedule", 
          `You have ${stats.todayConsultationsCount} ${stats.todayConsultationsCount === 1 ? 'consultation' : 'consultations'} scheduled for today`,
          { 
            showToast: false,
            link: "/health-staff-dashboard?tab=consultations",
            actionText: "View Schedule" 
          }
        );
      }
    }
  }, [isLoading, stats, notifyInfo, notifySuccess, notifyWarning]);
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Pending Reviews"
        value={stats.pendingAnalysesCount}
        icon={<MessageSquare className="h-5 w-5 text-amber-700" />}
        color="amber"
        isLoading={isLoading}
      />
      <StatCard 
        title="Completed Reviews"
        value={stats.completedAnalysesCount}
        icon={<Stethoscope className="h-5 w-5 text-green-700" />}
        color="green"
        isLoading={isLoading}
      />
      <StatCard 
        title="Today's Consultations"
        value={stats.todayConsultationsCount}
        icon={<Calendar className="h-5 w-5 text-blue-700" />}
        color="blue"
        isLoading={isLoading}
      />
      <StatCard 
        title="Total Patients"
        value={stats.totalPatientsCount}
        icon={<Users className="h-5 w-5 text-purple-700" />}
        color="purple"
        isLoading={isLoading}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color: "blue" | "green" | "amber" | "purple";
  isLoading: boolean;
}

function StatCard({ title, value, icon, color, isLoading }: StatCardProps) {
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <p className={`text-2xl font-bold ${textColor[color]}`}>{value}</p>
            )}
          </div>
          <div className={`p-2 rounded-full ${bgColor[color]} bg-opacity-70`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
