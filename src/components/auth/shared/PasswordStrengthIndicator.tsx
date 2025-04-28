
interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 4:
        return { label: "Strong", color: "bg-green-500" };
      case 3:
        return { label: "Good", color: "bg-blue-500" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500" };
      default:
        return { label: "Weak", color: "bg-red-500" };
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${strength.color}`}
            style={{ width: `${(getPasswordStrength(password).label === "Weak" ? 1 : getPasswordStrength(password).label === "Fair" ? 2 : getPasswordStrength(password).label === "Good" ? 3 : 4) * 25}%` }}
          />
        </div>
        <span className="text-xs font-medium text-medical-gray-dark ml-2 w-12">
          {strength.label}
        </span>
      </div>
    </div>
  );
};
