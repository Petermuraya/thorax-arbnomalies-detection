
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 border border-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">ThoraxIQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Revolutionizing Chest X-Ray Diagnosis with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              AI-powered system for under-resourced healthcare settings that swiftly detects tuberculosis, pneumonia, and lung cancer with 95% accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-200 modern-card">
                  Get Started
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold border-2 hover:bg-muted transition-all duration-200">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" 
                alt="AI-powered X-ray analysis" 
                className="relative modern-card max-w-full h-auto"
                width={500}
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 animate-bounce">
          <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowDown size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};
