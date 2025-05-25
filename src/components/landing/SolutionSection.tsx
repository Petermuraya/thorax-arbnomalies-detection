
import React from "react";
import { Activity, Users, Zap } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            ThoraxIQ: AI-Powered Abnormality Detection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our deep learning system provides fast, accurate support for radiological interpretation in low-resource settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Deep Learning",
              description: "Advanced computer vision for chest X-ray analysis trained on diverse global datasets"
            },
            {
              icon: Activity,
              title: "High Accuracy",
              description: "95% sensitivity and 90% specificity validated by radiologists"
            },
            {
              icon: Users,
              title: "Reduces Workload",
              description: "Cuts radiologist workload by 40% and improves diagnostic speed"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="modern-card p-6 group hover:border-primary/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
