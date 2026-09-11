import React from "react";
import TopBanner from "../Components/Layout/TopBanner";
import Navbar from "../Components/Layout/Navbar";
import HeroContent from "../Components/Hero/HeroContent";
import HeroImage from "../Components/Hero/HeroImage";
import FeaturesBar from "../Components/Hero/FeaturesBar";
import FeaturedBouquets from "../Components/Collection/FeaturedBouquets";
import CtaBanner from "../Components/Sections/CtaBanner";
import HowItWorks from "../Components/Sections/HowItWorks";
import Footer from "../Components/Layout/Footer";

export default function LandingPage() {
  return (
    // 1. Outermost container MUST NOT have `overflow-hidden`
    <div className="bg-light-cream font-sans text-gray-800 antialiased min-h-screen">
      
      {/* Top Banner (Scrolls away normally) */}
      <TopBanner />

      {/* 2. Sticky Navbar wrapper as a DIRECT child of the page */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* 3. Hero Section */}
      <div className="flex flex-col justify-between">
        <main className="container mx-auto px-6 sm:px-12 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
          <HeroContent />
          <HeroImage />
        </main>
        <FeaturesBar />
      </div>

      {/* 4. Main Sections (Navbar will stay pinned while scrolling through all of these) */}
      <div className="container mx-auto px-6 sm:px-12 w-full py-12 space-y-6">
        <FeaturedBouquets />
        <HowItWorks />
        <CtaBanner />
      </div>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}