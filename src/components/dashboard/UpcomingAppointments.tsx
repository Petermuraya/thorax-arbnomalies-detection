
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: {
    name: string;
    specialty: string;
    image: string;
  };
  status: string;
}

export const UpcomingAppointments = () => {
  const appointments: Appointment[] = [
    {
      id: "APT-7894",
      date: "May 3, 2025",
      time: "2:00 PM",
      type: "Follow-up Consultation",
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Pulmonology",
        image: "https://images.unsplash.com/photo-1537368910025-70a0788ddc2a?w=400&auto=format&fit=crop&q=60"
      },
      status: "Confirmed"
    },
    {
      id: "APT-7895",
      date: "May 10, 2025",
      time: "10:30 AM",
      type: "Annual Checkup",
      doctor: {
        name: "Dr. Michael Stevens",
        specialty: "General Medicine",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
      },
      status: "Pending"
    }
  ];

  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Calendar className="h-5 w-5 text-blue-600" />
          Upcoming Appointments
        </CardTitle>
        <CardDescription>
          Your scheduled consultations and visits
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={appointment.doctor.image} />
                  <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-slate-800">{appointment.type}</h3>
                    <Badge variant={appointment.status === 'Confirmed' ? 'success' : 'warning'}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{appointment.doctor.name}</p>
                  <p className="text-sm text-slate-500">{appointment.doctor.specialty}</p>
                  <div className="mt-2 flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {appointment.date} • {appointment.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-0" />
        <div className="p-4">
          <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
            Schedule New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
