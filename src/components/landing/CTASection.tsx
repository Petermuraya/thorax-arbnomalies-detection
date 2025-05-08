
import React from "react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Revolutionizing Respiratory Diagnosis</h2>
          <p className="text-xl mb-8">
            Seeking Ksh 20M seed funding to scale operations and bring AI diagnostics to underserved communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all">
              <h3 className="font-semibold mb-2">Market Opportunity</h3>
              <p>$2.5B global market for AI in medical imaging</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all">
              <h3 className="font-semibold mb-2">Business Model</h3>
              <p>SaaS subscription based on usage/beds</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all">
              <h3 className="font-semibold mb-2">Partnerships</h3>
              <p>NGOs, government agencies, and hospitals</p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold">
            Invest in ThoraxIQ
          </Button>
        </div>
      </div>
    </section>
  );
};
