
import React from "react";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  colorClass: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
  imageUrl,
  imageAlt,
  colorClass
}) => {
  return (
    <div className="flex-1 relative group">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full transform group-hover:-translate-y-2 transition-transform card-high-contrast">
        <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-4 text-slate-900 pt-2">{title}</h3>
        <p className="text-slate-700 mb-4">
          {description}
        </p>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="rounded-md w-full h-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export const WorkflowSection = () => {
  const steps = [
    {
      number: 1,
      title: "Upload Digital X-ray",
      description: "Securely upload DICOM or JPEG images through our HIPAA-compliant platform.",
      imageUrl: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=400&auto=format&fit=crop",
      imageAlt: "Upload X-ray",
      colorClass: "bg-blue-600"
    },
    {
      number: 2,
      title: "AI Processing",
      description: "Our convolutional neural networks analyze the image across multiple detection layers.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop",
      imageAlt: "AI Analysis",
      colorClass: "bg-teal-600"
    },
    {
      number: 3,
      title: "Clinical Validation",
      description: "Results are reviewed by our medical team and graded by confidence levels.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop",
      imageAlt: "Expert Review",
      colorClass: "bg-purple-600"
    },
    {
      number: 4,
      title: "Detailed Report",
      description: "Receive a comprehensive PDF report with annotated images and clinical recommendations.",
      imageUrl: "https://images.unsplash.com/photo-1581595214962-0ec4c5e30c7b?q=80&w=400&auto=format&fit=crop",
      imageAlt: "Get Results",
      colorClass: "bg-green-600"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How ThoraxIQ Works
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Our streamlined process delivers accurate results in minutes, not days.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step) => (
            <WorkflowStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};
