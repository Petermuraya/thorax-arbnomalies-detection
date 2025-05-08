
import React from "react";
import { Activity, Users, Zap } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ThoraxIQ: AI-Powered Abnormality Detection</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our deep learning system provides fast, accurate support for radiological interpretation in low-resource settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Deep Learning</h3>
            </div>
            <p>Advanced computer vision for chest X-ray analysis trained on diverse global datasets</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">High Accuracy</h3>
            </div>
            <p>95% sensitivity and 90% specificity validated by radiologists</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Reduces Workload</h3>
            </div>
            <p>Cuts radiologist workload by 40% and improves diagnostic speed</p>
          </div>
        </div>
      </div>
    </section>
  );
};
