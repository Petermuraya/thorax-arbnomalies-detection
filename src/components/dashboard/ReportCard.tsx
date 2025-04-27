
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ReportCardProps {
  report: {
    id: string;
    date: string;
    status: string;
    findings: string;
    doctor: {
      name: string;
      image?: string;
    };
    cost: string;
  };
}

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={report.doctor.image} />
              <AvatarFallback>{report.doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-medical-gray-dark">
                Report #{report.id}
              </h3>
              <p className="text-medical-gray text-sm">{report.date} • {report.doctor.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              {report.status}
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              {report.cost}
            </div>
          </div>
        </div>
        
        <div className="text-medical-gray-dark">
          <p><span className="font-medium">Findings:</span> {report.findings}</p>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" className="text-medical-blue hover:bg-medical-blue/5">
            <FileText className="h-4 w-4 mr-2" />
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
