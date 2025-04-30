import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Role, ROLES } from "@/types/roles";  // 💥 Import Role type and ROLES array

interface RoleSelectorProps {
  role: Role;
  setRole: (role: Role) => void;
}

export const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <div>
      <label className="label-text mb-3 inline-block">Select Role</label>
      <RadioGroup value={role} onValueChange={(val) => setRole(val as Role)}>
        <div className="flex flex-col space-y-3">
          {ROLES.map((r) => (
            <div key={r} className="flex items-center space-x-2">
              <RadioGroupItem value={r} id={r} />
              <Label htmlFor={r}>
                {r === "healthstaff" ? "Healthcare Professional" : r.charAt(0).toUpperCase() + r.slice(1)}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
