
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ThoraxIQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Revolutionizing Chest X-Ray Diagnosis with AI
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
              AI-powered system for under-resourced healthcare settings that swiftly detects tuberculosis, pneumonia, and lung cancer with 95% accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                  Get Started
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white">
                  Request Demo
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
          <a href="#problem" className="text-white animate-bounce">
            <ArrowDown size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};
