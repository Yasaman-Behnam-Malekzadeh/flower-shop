import React from 'react';
import heroImage from '../assets/hero-image-7.png';

const HeroImage = () => {
  return (
    <div className="relative flex items-center justify-center py-6 w-full">
      {/* Irregular Organic Purple Blob */}
      <div 
        className="w-[320px] h-[400px] sm:w-[460px] sm:h-[540px] bg-[#EBE4F4] relative flex items-center justify-center overflow-hidden"
        style={{
          borderRadius: '52% 48% 63% 37% / 42% 55% 45% 58%',
        }}
      >
        {/* Bouquet Image constrained inside the shape */}
        <img 
          src={heroImage}
          alt="Handmade crochet bouquet" 
          className="w-[100%] h-[100%] object-contain z-10 drop-shadow-sm transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Top Right Badge */}
      <div className="absolute top-2 right-4 sm:right-24 bg-white/95 backdrop-blur-sm border border-pink-100 rounded-full w-22 h-22 sm:w-24 sm:h-24 flex flex-col items-center justify-center text-center p-2 shadow-sm z-20">
        <span className="text-sm font-extrabold text-[#2B2B2B] leading-none">100%</span>
        <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
          Handmade<br />with love
        </span>
      </div>

      {/* Bottom Left Tag */}
      <div className="absolute bottom-6 left-2 sm:left-12 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-xs text-gray-600 font-medium z-20 transform -rotate-6">
        No water. Just love.
      </div>
    </div>
  );
};

export default HeroImage;