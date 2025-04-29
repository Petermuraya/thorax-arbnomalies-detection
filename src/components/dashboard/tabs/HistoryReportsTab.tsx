
import React from "react";
import { ReportCard } from "@/components/dashboard/ReportCard";

interface Report {
  id: string;
  date: string;
  status: string;
  findings: string;
  doctor: {
    name: string;
    image: string;
  };
  cost: string;
}

interface HistoryReportsTabProps {
  reportHistory: Report[];
}

export const HistoryReportsTab = ({ reportHistory }: HistoryReportsTabProps) => {
  return (
    <div className="divide-y divide-slate-100">
      {reportHistory.map((report) => (
        <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
          <ReportCard report={report} />
        </div>
      ))}
    </div>
  );
};
