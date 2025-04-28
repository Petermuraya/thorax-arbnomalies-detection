
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

export const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <div>
      <label className="label-text mb-3 inline-block">Select Role</label>
      <RadioGroup value={role} onValueChange={setRole}>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="patient" />
            <Label htmlFor="patient">Patient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="healthstaff" id="healthstaff" />
            <Label htmlFor="healthstaff">Healthcare Professional</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
