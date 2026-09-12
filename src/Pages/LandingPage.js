import React from "react";
import HeroContent from "../Components/Hero/HeroContent";
import HeroImage from "../Components/Hero/HeroImage";
import FeaturesBar from "../Components/Hero/FeaturesBar";
import FeaturedBouquets from "../Components/Collection/FeaturedBouquets";
import CtaBanner from "../Components/Sections/CtaBanner";
import HowItWorks from "../Components/Sections/HowItWorks";

export default function LandingPage() {
  return (
    <>
      {/* 1. Hero Group */}
      <div className="h-[calc(100vh-80px)] min-h-[600px] flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <HeroContent />
          <HeroImage />
        </div>
        <FeaturesBar />
      </div>

      {/* 2. Main Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 space-y-6">
        <FeaturedBouquets />
        <HowItWorks />
        <CtaBanner />
      </div>
    </>
  );
}
