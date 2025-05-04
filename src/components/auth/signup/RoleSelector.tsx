
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Role, ROLES, ROLE_DISPLAY_NAMES, UserRoles } from "@/types/roles";

interface RoleSelectorProps {
  selectedRoles: UserRoles;
  onRoleChange: (role: Role, checked: boolean) => void;
}

export const RoleSelector = ({ selectedRoles, onRoleChange }: RoleSelectorProps) => {
  return (
    <div>
      <label className="label-text mb-3 inline-block">Select Role(s)</label>
      <div className="flex flex-col space-y-3">
        {ROLES.map((role) => (
          <div key={role} className="flex items-center space-x-2">
            <Checkbox 
              id={role} 
              checked={!!selectedRoles[role]} 
              onCheckedChange={(checked) => onRoleChange(role, !!checked)} 
            />
            <Label htmlFor={role} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {ROLE_DISPLAY_NAMES[role]}
            </Label>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Users can have multiple roles. For example, a healthcare professional can also be a patient.
      </p>
    </div>
  );
};
