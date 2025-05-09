
import { Input } from "@/components/ui/input";
import { ReactNode, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className={
            cn("absolute inset-y-0 flex items-center pointer-events-none",
              iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
            )
          }>
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            iconPosition === 'left' ? 'pl-10' : 'pr-10',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

IconInput.displayName = "IconInput";
