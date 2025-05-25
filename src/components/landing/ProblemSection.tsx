
import React from "react";
import { Globe } from "lucide-react";

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            The Global Diagnostic Gap in Chest Radiology
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl transition-transform hover:scale-105 card-high-contrast">
            <div className="text-5xl font-bold text-blue-900 mb-4">15%</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Of Global Deaths</h3>
            <p className="text-slate-700">Caused by thoracic diseases where timely diagnosis is challenging</p>
          </div>

          <div className="bg-red-50 p-6 rounded-xl transition-transform hover:scale-105 card-high-contrast">
            <div className="text-5xl font-bold text-red-700 mb-4">1:100K</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Radiologist Ratio</h3>
            <p className="text-slate-700">In Africa leads to 2-4 week wait times for X-ray results</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl transition-transform hover:scale-105 card-high-contrast">
            <div className="text-5xl font-bold text-purple-700 mb-4">$8B</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Annual Loss</h3>
            <p className="text-slate-700">Hospitals lose on repeat scans due to delayed diagnosis</p>
          </div>
        </div>

        <div className="mt-12 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm card-high-contrast">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Without action:</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                <li>40% of TB cases progress before diagnosis</li>
                <li>3 billion people lack access to basic radiology</li>
                <li>Current systems are fragmented and expensive ($50-200 per outsourced read)</li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Globe className="h-20 w-20 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
