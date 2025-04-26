
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AIAnalysisViewerProps {
  imageUrl: string;
  onAnalysisComplete: (result: string) => void;
}

const AIAnalysisViewer = ({ imageUrl, onAnalysisComplete }: AIAnalysisViewerProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const startAnalysis = () => {
    setAnalyzing(true);
    setProgress(0);
    setAnalysisResult(null);
    
    // Simulate AI analysis with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Generate a random analysis result
        const results = [
          "No significant abnormalities detected. Lung fields are clear. Cardiac silhouette is normal in size. No pneumothorax or pleural effusion.",
          "Mild cardiomegaly noted. Lung fields appear clear. No evidence of pneumothorax or pleural effusion. Recommend clinical correlation.",
          "Linear opacity in the right lower lobe, potentially representing atelectasis or early pneumonia. Recommend follow-up imaging in 2 weeks.",
          "Lungs are clear without focal consolidation. Mild perihilar bronchial wall thickening may represent mild bronchitis. Heart size is normal.",
          "No acute cardiopulmonary process. Degenerative changes noted in the thoracic spine. Recommend clinical correlation with patient history."
        ];
        
        const randomResult = results[Math.floor(Math.random() * results.length)];
        setAnalysisResult(randomResult);
        onAnalysisComplete(randomResult);
        
        // End analyzing state after a slight delay
        setTimeout(() => {
          setAnalyzing(false);
        }, 500);
      }
      setProgress(currentProgress);
    }, 300);
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
        <p className="text-medical-gray text-sm">
          Our AI system can analyze your chest X-ray and provide preliminary findings before a healthcare professional review.
        </p>
      </div>
      
      <div className="mb-6 aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="Chest X-ray" className="w-full h-full object-contain" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-medical-gray">No image available</p>
          </div>
        )}
      </div>
      
      {analyzing ? (
        <div className="space-y-3">
          <div className="flex items-center">
            <Activity className="text-medical-blue animate-pulse mr-2 h-5 w-5" />
            <span className="font-medium">AI Analysis in progress</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-medical-gray">Processing image features {Math.round(progress)}%</p>
        </div>
      ) : analysisResult ? (
        <div className="space-y-3">
          <h4 className="font-medium">AI Analysis Results:</h4>
          <div className="p-3 bg-medical-blue/10 rounded-lg text-medical-gray-dark">
            {analysisResult}
          </div>
          <p className="text-xs text-medical-gray">
            Note: This is an automated analysis and should not be considered a medical diagnosis. 
            A healthcare professional will review your results.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={startAnalysis}
          >
            Run analysis again
          </Button>
        </div>
      ) : (
        <Button 
          className="w-full bg-medical-blue hover:bg-medical-blue-dark"
          onClick={startAnalysis}
          disabled={!imageUrl}
        >
          <Activity className="mr-2 h-5 w-5" />
          Start AI Analysis
        </Button>
      )}
    </Card>
  );
};

export default AIAnalysisViewer;
