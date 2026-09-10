import React from 'react';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import FeaturesBar from './FeaturesBar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-light-cream flex flex-col font-sans text-gray-800 antialiased">
      {/* Top Announcement Banner */}
      <TopBanner />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <HeroContent />
        <HeroImage />
      </main>

      {/* Bottom Features Bar */}
      <FeaturesBar />
    </div>
  );
}