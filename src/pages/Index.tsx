
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Fast, AI-powered Chest X-ray Analysis
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                Accelerate diagnosis, improve patient outcomes, and enhance healthcare delivery with cutting-edge AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-medical-blue-dark hover:bg-medical-gray-light">
                    Get Started
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Explore as Guest
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=600&auto=format&fit=crop" 
                alt="AI-powered X-ray analysis" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
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

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              Why Choose XRay Insight?
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our platform combines advanced AI technology with medical expertise to deliver accurate, fast, and accessible chest X-ray analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="medical-card p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-blue/10 text-medical-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Early Detection</h3>
              <p className="text-medical-gray">
                AI-powered technology identifies potential issues that might be missed by the human eye, enabling earlier intervention and treatment.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="medical-card p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Rapid Results</h3>
              <p className="text-medical-gray">
                Get analysis within minutes instead of days, accelerating the diagnostic process and reducing patient anxiety.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="medical-card p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-medical-blue/10 text-medical-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-gray-dark">Expert Supervision</h3>
              <p className="text-medical-gray">
                Our health professionals review AI findings, providing guidance and ensuring accurate diagnoses with human oversight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-medical-gray-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              How XRay Insight Works
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our streamlined process makes it easy to get accurate X-ray analysis in just a few simple steps.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Step 1 */}
            <div className="flex-1 relative">
              <div className="medical-card p-6 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Upload Your X-ray</h3>
                <p className="text-medical-gray mb-4">
                  Easily upload your chest X-ray image through our secure platform.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop" 
                  alt="Upload X-ray" 
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative">
              <div className="medical-card p-6 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">AI Analysis</h3>
                <p className="text-medical-gray mb-4">
                  Our advanced AI technology quickly analyzes the image to identify potential conditions.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22731cc35a?q=80&w=400&auto=format&fit=crop" 
                  alt="AI Analysis" 
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative">
              <div className="medical-card p-6 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Expert Review</h3>
                <p className="text-medical-gray mb-4">
                  Healthcare professionals review the AI findings and provide additional insights.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop" 
                  alt="Expert Review" 
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 relative">
              <div className="medical-card p-6 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Get Results</h3>
                <p className="text-medical-gray mb-4">
                  Receive comprehensive results with visualizations and recommendations.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=400&auto=format&fit=crop" 
                  alt="Get Results" 
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              See what doctors and radiologists are saying about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="medical-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-gray-light flex items-center justify-center mr-4">
                  <span className="text-medical-gray-dark font-bold">DR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Rebecca Chen</h4>
                  <p className="text-sm text-medical-gray">Radiologist, Metro Hospital</p>
                </div>
              </div>
              <p className="text-medical-gray">
                "XRay Insight has drastically reduced our diagnostic time. The AI catches subtle findings that might be missed during a busy shift, serving as an excellent second opinion."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="medical-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-gray-light flex items-center justify-center mr-4">
                  <span className="text-medical-gray-dark font-bold">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dr. James Thompson</h4>
                  <p className="text-sm text-medical-gray">Pulmonologist, Central Medical Center</p>
                </div>
              </div>
              <p className="text-medical-gray">
                "The visualization tools in XRay Insight help me explain findings to patients in a way they can understand. This has significantly improved patient compliance with treatment plans."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="medical-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-gray-light flex items-center justify-center mr-4">
                  <span className="text-medical-gray-dark font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Patel, RN</h4>
                  <p className="text-sm text-medical-gray">Nurse Practitioner, Community Health</p>
                </div>
              </div>
              <p className="text-medical-gray">
                "In our rural clinic, we don't always have immediate access to radiologists. XRay Insight provides quick preliminary analysis that helps us triage patients effectively."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg key={star} className={`w-5 h-5 ${index < 4 ? "text-yellow-400" : "text-yellow-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your diagnostic workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals using XRay Insight to improve patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-medical-blue-dark hover:bg-medical-gray-light">
                Get Started Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
