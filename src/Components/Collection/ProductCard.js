
import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { title, tag, description, price, bgCardColor, imageSrc } = product;

  return (
    <div className="flex flex-col justify-between group">
      {/* Image Container Card */}
      <div 
        className="relative rounded-3xl p-6 flex flex-col justify-between items-center h-[320px] transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: bgCardColor }}
      >
        {/* Top Badges Bar */}
        <div className="w-full flex justify-between items-center z-10">
          <span className="bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-[#2B2B2B] px-3 py-1 rounded-full shadow-sm">
            {tag}
          </span>
          <button 
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-pink-500 shadow-sm transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Bouquet Image / Vector */}
        <div className="flex-1 flex items-center justify-center my-2 w-full">
          <img 
            src={imageSrc} 
            alt={title} 
            className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-4 px-1">
        <h3 className="text-lg font-bold text-[#2B2B2B] tracking-tight">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{description}</p>

        {/* Pricing & Add to Bag Footer */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-base font-extrabold text-[#2B2B2B]">€{price}</span>
            <p className="text-[10px] text-gray-400 font-normal">incl. VAT, plus shipping</p>
          </div>

          <button className="bg-white border border-gray-200 hover:border-gray-400 text-[#2B2B2B] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all flex items-center gap-1 active:scale-95">
            Add to bag <span className="text-sm font-light">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;