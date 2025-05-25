
import React from "react";
import { BarChart2, Globe, HeartPulse, Users } from "lucide-react";

export const ImpactSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Social Impact & Value Creation</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow card-high-contrast">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <HeartPulse className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Early Diagnosis</h3>
            <p className="text-slate-700">Reduces TB mortality by 40% and identifies lung cancer at earlier stages</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow card-high-contrast">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Health System Benefits</h3>
            <p className="text-slate-700">Frees up radiologists' time and cuts hospital waitlists by 50%</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow card-high-contrast">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Economic Impact</h3>
            <p className="text-slate-700">Saves $1B+ annually by preventing unnecessary scans and repeat visits</p>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-sm card-high-contrast">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">UN Sustainable Development Goal #3</h3>
              <p className="text-slate-700 mb-4">
                ThoraxIQ supports Good Health and Well-being by bringing expert diagnostics to underserved regions.
              </p>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-900">Target: 1M+ scans/year in Africa/SE Asia by 2026</span>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/07/SDG_Guidelines_AUG_2019_Final_3.png" 
                alt="UN SDG 3" 
                className="h-40 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
