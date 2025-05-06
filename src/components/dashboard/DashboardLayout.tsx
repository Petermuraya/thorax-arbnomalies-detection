
import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      {/* Notification Center */}
      <NotificationCenter />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
};
