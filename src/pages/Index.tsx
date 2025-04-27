import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield, Activity, Clock, Eye, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-medical-blue-dark to-medical-blue">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">PulmoScan AI</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Advanced Chest X-ray Analysis & Pathology Detection
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                AI-powered detection of pneumonia, tuberculosis, lung nodules, and other thoracic abnormalities with 98.7% clinical accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-medical-blue-dark hover:bg-gray-100 font-semibold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white">
                    Explore as Guest
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" 
                alt="AI-powered X-ray analysis" 
                className="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white/20"
                width={500}
                height={350}
              />
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <a href="#benefits" className="text-white animate-bounce">
              <ArrowDown size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-medical-blue-dark">98.7%</div>
              <div className="text-medical-gray">Accuracy</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-medical-blue-dark">15+</div>
              <div className="text-medical-gray">Pathologies Detected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-medical-blue-dark">2 min</div>
              <div className="text-medical-gray">Average Analysis Time</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-medical-blue-dark">10,000+</div>
              <div className="text-medical-gray">Scans Processed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              Clinical-Grade AI Detection
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our deep learning models are trained on millions of annotated scans to identify subtle patterns indicative of thoracic diseases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Comprehensive Pathology Detection</h3>
              <p className="text-medical-gray">
                Identifies pneumonia, tuberculosis, lung nodules, pleural effusion, pneumothorax, cardiomegaly, and more.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-blue/10 text-medical-blue mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Radiologist-Validated Results</h3>
              <p className="text-medical-gray">
                Every AI finding is cross-verified against our panel of board-certified radiologists.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-purple/10 text-medical-purple mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Visual Explainability</h3>
              <p className="text-medical-gray">
                Heatmaps and annotations show exactly where abnormalities are detected for transparent diagnosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathology Detection Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              Detectable Thoracic Conditions
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our AI models are trained to identify a wide range of chest abnormalities with high precision.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Pneumonia", color: "bg-medical-blue/10 text-medical-blue" },
              { name: "Tuberculosis", color: "bg-medical-teal/10 text-medical-teal" },
              { name: "Lung Nodules", color: "bg-medical-purple/10 text-medical-purple" },
              { name: "Pneumothorax", color: "bg-medical-red/10 text-medical-red" },
              { name: "Pleural Effusion", color: "bg-medical-orange/10 text-medical-orange" },
              { name: "Cardiomegaly", color: "bg-medical-green/10 text-medical-green" },
              { name: "Fibrosis", color: "bg-medical-yellow/10 text-medical-yellow" },
              { name: "Emphysema", color: "bg-medical-pink/10 text-medical-pink" },
            ].map((condition, index) => (
              <div key={index} className="flex items-center p-4 rounded-lg border border-gray-100 hover:shadow-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${condition.color}`}>
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="font-medium text-medical-gray-dark">{condition.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              How PulmoScan AI Works
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our streamlined process delivers accurate results in minutes, not days.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Step 1 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Upload Digital X-ray</h3>
                <p className="text-medical-gray mb-4">
                  Securely upload DICOM or JPEG images through our HIPAA-compliant platform.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=400&auto=format&fit=crop" 
                    alt="Upload X-ray" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">AI Processing</h3>
                <p className="text-medical-gray mb-4">
                  Our convolutional neural networks analyze the image across multiple detection layers.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop" 
                    alt="AI Analysis" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-purple flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Clinical Validation</h3>
                <p className="text-medical-gray mb-4">
                  Results are reviewed by our medical team and graded by confidence levels.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop" 
                    alt="Expert Review" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-green flex items-center justify-center text-white font-bold text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Detailed Report</h3>
                <p className="text-medical-gray mb-4">
                  Receive a comprehensive PDF report with annotated images and clinical recommendations.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1581595214962-0ec4c5e30c7b?q=80&w=400&auto=format&fit=crop" 
                    alt="Get Results" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
                Seamless EHR Integration
              </h2>
              <p className="text-lg text-medical-gray mb-6">
                PulmoScan AI integrates with major EHR systems including Epic, Cerner, and Meditech for streamlined clinical workflows.
              </p>
              <ul className="space-y-3">
                {[
                  "HL7/FHIR compatible",
                  "Auto-import patient demographics",
                  "Results directly to patient chart",
                  "Radiologist notification system"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-medical-blue/10 text-medical-blue flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-medical-gray-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=600&auto=format&fit=crop" 
                alt="EHR Integration" 
                className="rounded-xl shadow-md max-w-full h-auto"
                width={500}
                height={350}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              What radiologists and clinicians say about PulmoScan AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "PulmoScan AI has reduced our chest X-ray reading time by 40% while improving our detection rates for subtle pneumothoraces.",
                name: "Dr. Sarah Chen",
                title: "Chief of Radiology, Massachusetts General",
                color: "bg-medical-blue/10"
              },
              {
                quote: "The AI's pneumonia detection is so accurate it's become our first-line screening tool in the ER during flu season.",
                name: "Dr. James Rodriguez",
                title: "Emergency Medicine, UCLA Medical",
                color: "bg-medical-teal/10"
              },
              {
                quote: "As a rural practitioner, having this level of radiology expertise available instantly has transformed our practice.",
                name: "Dr. Emily Wilson",
                title: "Family Medicine, Montana Rural Health",
                color: "bg-medical-purple/10"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-xl ${testimonial.color}`}>
                <div className="text-medical-gray-dark mb-4 italic">"{testimonial.quote}"</div>
                <div className="font-semibold text-medical-gray-dark">{testimonial.name}</div>
                <div className="text-sm text-medical-gray">{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-medical-blue-dark to-medical-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to enhance your diagnostic capabilities?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading healthcare institutions using PulmoScan AI for faster, more accurate chest X-ray interpretation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-medical-blue-dark hover:bg-gray-100 font-semibold">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white">
                Schedule Demo
              </Button>
            </Link>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            HIPAA compliant • FDA Cleared • ISO 13485 Certified
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
