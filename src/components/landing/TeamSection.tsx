
import React from "react";

export const TeamSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Team & Expertise</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow card-high-contrast">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Founders</h3>
            <p className="text-slate-700 mb-4">
              Seasoned entrepreneurs with backgrounds in AI, IoT, and nursing, bringing a unique blend of technical and healthcare expertise.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-12 h-12 rounded-full bg-blue-100 border-2 border-white"></div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow card-high-contrast">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Advisors</h3>
            <p className="text-slate-700 mb-4">
              World-renowned pulmonologists and global health specialists guiding our strategy and ensuring clinical relevance.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-12 h-12 rounded-full bg-green-100 border-2 border-white"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm card-high-contrast">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">Track Record</h3>
          <p className="text-slate-700 mb-4">
            Proven success in medical imaging and software development, delivering innovative solutions to healthcare challenges.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm text-slate-800">Medical Imaging</div>
            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm text-slate-800">AI Development</div>
            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm text-slate-800">Healthcare IoT</div>
            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm text-slate-800">Clinical Validation</div>
          </div>
        </div>
      </div>
    </section>
  );
};
