
import { Button } from "@/components/ui/button";
import { Calendar, Upload } from "lucide-react";

interface WelcomeSectionProps {
  userName: string;
  onUploadClick: () => void;
}

export const WelcomeSection = ({ userName, onUploadClick }: WelcomeSectionProps) => {
  const scrollToAppointments = () => {
    document.getElementById("appointments-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Welcome back, <span className="text-blue-600">{userName}</span>
        </h1>
        <p className="text-slate-500">Here's your health dashboard overview</p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline"
          className="border-blue-100 bg-white hover:bg-blue-50 text-blue-600"
          onClick={scrollToAppointments}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Appointments
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onUploadClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload X-ray
        </Button>
      </div>
    </div>
  );
};
