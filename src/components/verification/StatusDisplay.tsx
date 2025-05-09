
import { Check, AlertTriangle } from "lucide-react";

interface StatusDisplayProps {
  status: 'approved' | 'pending' | 'rejected' | null;
}

export const StatusDisplay = ({ status }: StatusDisplayProps) => {
  if (status === 'approved') {
    return (
      <div className="text-center">
        <Check className="mx-auto h-12 w-12 text-green-500 mb-2" />
        <p className="text-green-600 font-medium">Your account is verified!</p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
        <p className="text-yellow-600 font-medium">Your verification is pending review.</p>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-2" />
        <p className="text-red-600 font-medium">Your verification was rejected. Please upload a valid document.</p>
      </div>
    );
  }

  return null;
};
