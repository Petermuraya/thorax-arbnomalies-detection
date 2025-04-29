
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface IconInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  Icon: LucideIcon;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

export const IconInput = ({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
  Icon,
  required = true,
  autoComplete,
  disabled = false
}: IconInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="label-text">
        {label}
      </label>
      <div className="relative mt-1">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="input-field pl-10"
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
        />
        <Icon className="absolute left-3 top-3 h-5 w-5 text-medical-gray" />
      </div>
    </div>
  );
};
