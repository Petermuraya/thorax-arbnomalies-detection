
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, Stethoscope, User } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: User, label: "My Profile" },
    { icon: FileText, label: "Medical Records" },
    { icon: DollarSign, label: "Payments" },
    { icon: Stethoscope, label: "Find Doctors" },
  ];

  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-slate-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto py-3 flex-col gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-normal">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
