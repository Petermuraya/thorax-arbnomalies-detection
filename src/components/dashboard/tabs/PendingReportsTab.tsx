
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PendingReportsTabProps {
  analysisResult: string | null;
  scrollToUploadSection: () => void;
}

export const PendingReportsTab = ({
  analysisResult,
  scrollToUploadSection
}: PendingReportsTabProps) => {
  return (
    <div className="p-6">
      {analysisResult ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                New Analysis Result
              </h3>
              <p className="text-slate-500 text-sm">
                Uploaded on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <Badge variant="warning">Pending Review</Badge>
          </div>
          
          <div className="rounded-lg bg-blue-50 p-4 mb-4">
            <h4 className="font-medium mb-2 text-slate-800">AI Analysis Results:</h4>
            <p className="text-slate-700">{analysisResult}</p>
            <div className="mt-4">
              <div className="animate-pulse flex items-center text-blue-600">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm font-medium">Sent for healthcare professional review</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                A healthcare professional will review your results and provide final interpretation.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-500">Estimated cost:</span>
              <span className="font-medium text-slate-800">$2.99</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-slate-500">You have no pending reports</p>
          <Button 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={scrollToUploadSection}
          >
            Upload New Chest X-ray
          </Button>
        </div>
      )}
    </div>
  );
};
