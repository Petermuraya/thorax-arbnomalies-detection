
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface DocumentUploaderProps {
  error: string | null;
  uploading: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => Promise<void>;
}

export const DocumentUploader = ({ error, uploading, onFileChange, onUpload }: DocumentUploaderProps) => {
  return (
    <div className="mt-4">
      <input 
        type="file" 
        accept=".pdf,.jpg,.jpeg,.png" 
        onChange={onFileChange} 
        className="mb-2" 
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button 
        onClick={onUpload} 
        disabled={uploading} 
        className="bg-blue-500 text-white"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </>
        )}
      </Button>
    </div>
  );
};
