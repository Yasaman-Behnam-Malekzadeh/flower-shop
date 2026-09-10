import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

const HeroContent = () => {
  return (
    <div className="flex flex-col justify-center max-w-lg">
      {/* Subtitle Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-brand-purple" />
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
          Little Stitches. Big Feelings.
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-[#2B2B2B] leading-[1.1] mb-6">
        Flowers that <br />
        <span className="text-brand-purple">stay forever.</span>
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-md">
        A little yarn. A whole lot of love. Discover handmade crochet flowers that never wilt — as one of a kind as your favourite person.
      </p>

      {/* Primary CTA Button */}
      <div className="mb-8">
        <button className="bg-brand-purple hover:bg-[#584172] text-white font-medium px-7 py-3.5 rounded-2xl flex items-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-sm">
          <span>Design your own bouquet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Tagline */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Heart className="w-3.5 h-3.5 text-gray-400" />
        <span>Dreamed up by you. Handmade just for you.</span>
      </div>
    </div>
  );
};

export default HeroContent;