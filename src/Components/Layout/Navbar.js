import React from 'react';
import { Search, Heart, User, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full font-sans">
    

      {/* Main Navigation Bar */}
      <nav className="bg-[#FAF8F5] border-b border-gray-100/60 px-6 sm:px-12 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          {/* Flower Icon SVG */}
          <svg className="w-6 h-6 text-[#2B2B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a4 4 0 0 0-4 4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
            <path d="M6 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
            <path d="M18 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
            <path d="M12 14a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
            <circle cx="12" cy="10" r="2" fill="currentColor" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#2B2B2B]">
            JasminBlüte <span className="text-[#6C5389]">•</span>
          </span>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4A4A]">
          <a href="#shop" className="hover:text-black transition-colors">Shop bouquets</a>
          <a href="#build" className="hover:text-black transition-colors">Build a bouquet</a>
          <a href="#how" className="hover:text-black transition-colors">How it works</a>
        </div>

        {/* Right Utility Bar */}
        <div className="flex items-center gap-5">
          {/* Language Switcher Pill */}
          <div className="bg-[#EFECE6] text-[#2B2B2B] text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
            EN / DE
          </div>

          {/* Action Icons */}
          <button className="text-[#2B2B2B] hover:text-black transition-colors p-1" aria-label="Search">
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>
          
          <button className="text-[#2B2B2B] hover:text-black transition-colors p-1" aria-label="Favorites">
            <Heart className="w-5 h-5 stroke-[1.8]" />
          </button>
          
          <button className="text-[#2B2B2B] hover:text-black transition-colors p-1" aria-label="Account">
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Cart Icon with Counter */}
          <button className="relative text-[#6C5389] hover:opacity-80 transition-opacity p-1" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <span className="absolute -top-1 -right-1 bg-[#6C5389] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;