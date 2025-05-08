
import React from "react";
import { LandingLayout } from "@/components/landing/Layout";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <WorkflowSection />
      <FeaturesSection />
      <ImpactSection />
      <TeamSection />
      <CTASection />
    </LandingLayout>
  );
};

export default Index;
