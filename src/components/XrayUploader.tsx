
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useChestAnalysis } from "@/hooks/useChestAnalysis";

interface XrayUploaderProps {
  onImageUploaded: (imageUrl: string, file: File) => void;
}

const XrayUploader = ({ onImageUploaded }: XrayUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImage } = useChestAnalysis();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      // Check file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size exceeds 20MB limit");
        return;
      }
      
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Perform the actual upload
      const result = await uploadImage(selectedFile);
      
      if (result) {
        // Pass the uploaded image URL and file to parent component
        // In a real app, we'd use the URL from Supabase storage here
        onImageUploaded(previewUrl!, selectedFile);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card id="upload-section">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Upload Chest X-ray</CardTitle>
        <CardDescription>
          Upload your chest X-ray for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${previewUrl ? 'border-medical-blue bg-blue-50/50' : 'border-medical-gray-light'}`}>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {previewUrl ? (
            <div className="space-y-4">
              <div className="aspect-square max-h-64 mx-auto overflow-hidden rounded-lg">
                <img 
                  src={previewUrl} 
                  alt="Selected X-ray" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-medical-gray-dark font-medium">
                {selectedFile?.name}
              </p>
              <div className="flex justify-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={resetUpload}
                  disabled={isUploading}
                >
                  Change
                </Button>
                <Button 
                  className="bg-medical-blue hover:bg-medical-blue-dark"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <span className="animate-spin mr-2">◠</span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-medical-gray mx-auto mb-4" />
              <p className="text-medical-gray mb-4">
                Drag and drop your chest X-ray image here, or click to browse
              </p>
              <Button 
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Browse Files
              </Button>
            </>
          )}
        </div>
        <p className="text-xs text-medical-gray mt-2">
          Supported formats: JPG, PNG, DICOM. Maximum file size: 20MB.
        </p>
      </CardContent>
    </Card>
  );
};

export default XrayUploader;
