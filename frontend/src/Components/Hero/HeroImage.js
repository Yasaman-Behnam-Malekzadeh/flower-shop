import React from 'react';
import heroImage from '../../assets/hero-image-7.png';

const HeroImage = () => {
  return (
    <div className="relative flex items-center justify-center py-6 w-full">
      {/* Kanten / Blob Container */}
      <div 
        className="w-[320px] h-[400px] sm:w-[460px] sm:h-[540px] bg-[#EBE4F4] relative flex items-center justify-center overflow-visible"
        style={{
          borderRadius: '52% 48% 63% 37% / 42% 55% 45% 58%',
        }}
      >
        {/* Bouquet Image */}
        <img 
          src={heroImage}
          alt="Handmade crochet bouquet" 
          className="w-[100%] h-[97%] object-contain z-10 drop-shadow-sm transition-transform duration-300"
        />


        <div className="absolute top-10 -left-8 sm:-left-12 z-30 animate-swing">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 fill-current drop-shadow-md" viewBox="0 0 100 100">
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle cx="50" cy="50" r="10" className="text-amber-600 fill-current" />
          </svg>
        </div>


        <div className="absolute bottom-10 -right-6 sm:-right-10 z-30 animate-swing" style={{ animationDelay: '0.6s' }}>
          <svg className="w-10 h-10 sm:w-14 sm:h-14 text-[#584172] fill-current drop-shadow-md" viewBox="0 0 100 100">
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle cx="50" cy="50" r="10" className="text-purple-300 fill-current" />
          </svg>
        </div>
      </div>


      <div className="absolute top-2 right-4 sm:right-20 bg-white/95 backdrop-blur-sm border border-pink-100 rounded-full w-22 h-22 sm:w-24 sm:h-24 flex flex-col items-center justify-center text-center p-2 shadow-sm z-30 animate-swing">
        <span className="text-sm font-extrabold text-[#2B2B2B] leading-none">100%</span>
        <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
          Handmade<br />with love
        </span>
      </div>

     
      <div className="absolute bottom-6 left-2 sm:left-12 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-xs text-gray-600 font-medium z-30 transform -rotate-6">
        No water. Just love.
      </div>
    </div>
  );
};

export default HeroImage;