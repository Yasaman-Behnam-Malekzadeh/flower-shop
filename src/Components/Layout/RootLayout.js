import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <div className="bg-light-cream font-sans text-gray-800 antialiased min-h-screen">
      {/* 1. Non-sticky Top Banner */}
      <TopBanner />

      {/* 2. Sticky Navbar Wrapper - Must sit at top-0 directly in page flow */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* 3. Main Outlet for Dynamic Pages */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
}