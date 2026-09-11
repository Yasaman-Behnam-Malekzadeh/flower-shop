import React from "react";
import TopBanner from "../Components/Layout/TopBanner";
import Navbar from "../Components/Layout/Navbar";
import HeroContent from "../Components/Hero/HeroContent";
import HeroImage from "../Components/Hero/HeroImage";
import FeaturesBar from "../Components/Hero/FeaturesBar";
import FeaturedBouquets from "../Components/Collection/FeaturedBouquets";
import CtaBanner from "../Components/Sections/CtaBanner";
import HowItWorks from "../Components/Sections/HowItWorks";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-light-cream flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Full Screen Hero Group */}
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <TopBanner />
          <Navbar />
        </div>

        {/* Main Hero Section */}
        <main className="container mx-auto px-6 sm:px-12 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
          <HeroContent />
          <HeroImage />
        </main>

        {/* Bottom Features Bar */}
        <FeaturesBar />
      </div>

      {/* 2. Main Sections Container */}
      <div className="container mx-auto px-6 sm:px-12 w-full py-12 space-y-6">
        <FeaturedBouquets />
        <HowItWorks />
        <CtaBanner />
      </div>
    </div>
  );
}