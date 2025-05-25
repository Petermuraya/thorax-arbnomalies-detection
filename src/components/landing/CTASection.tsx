
import React from "react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Revolutionizing Respiratory Diagnosis</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Seeking Ksh 20M seed funding to scale operations and bring AI diagnostics to underserved communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Market Opportunity",
                description: "$2.5B global market for AI in medical imaging"
              },
              {
                title: "Business Model",
                description: "SaaS subscription based on usage/beds"
              },
              {
                title: "Partnerships",
                description: "NGOs, government agencies, and hospitals"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300 modern-card border-white/20 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Invest in ThoraxIQ
          </Button>
        </div>
      </div>
    </section>
  );
};
