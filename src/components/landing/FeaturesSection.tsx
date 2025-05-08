
import React from "react";
import { BarChart2, CheckCircle, Cloud, Layers, Shield } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features & Technology</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">All-in-One Platform</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>AI Detection: Identifies 20+ thoracic conditions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>Teleconsultation: Built-in chat and scan annotation tools</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>Works Anywhere: Supports online and offline modes</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fast & Accurate</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>Generates results in under 8 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>95% accuracy validated by radiologists</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span>HIPAA-compliant and secure cloud platform</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">Technology Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Layers className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Deep Learning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Cloud className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Cloud Platform</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Diverse Datasets</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>PACS Integration</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" 
                alt="AI Technology" 
                className="rounded-lg shadow-md"
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
