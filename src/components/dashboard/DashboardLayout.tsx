
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      {/* Notification Bell - Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
};
