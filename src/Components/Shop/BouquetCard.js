import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

export default function BouquetCard({ item }) {
  const { title, description, price, bgCard, tag, image } = item;

  return (
    <div className="flex flex-col group">
      {/* Image Container */}
      <div className={`relative w-full aspect-square ${bgCard || 'bg-cream'} rounded-2xl p-6 flex items-center justify-center overflow-hidden transition-shadow hover:shadow-md`}>
        
        {/* Favorite Icon */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-stone-700 hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4" />
        </button>

        {/* Optional Tag */}
        {tag && (
          <span className="absolute top-4 left-4 bg-white/90 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {tag}
          </span>
        )}

        {/* Product Image */}
        <img src={image} alt={title} className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-300" />

        {/* Quick View Button */}
        <button className="absolute bottom-4 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-semibold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
          Quick view
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-stone-900 tracking-tight">{title}</h3>
          <p className="text-xs text-stone-500 font-normal mt-0.5">{description}</p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-stone-900 text-base">€{price}</span>
            <span className="block text-[10px] text-stone-400">incl. VAT, plus shipping</span>
          </div>

          <button className="bg-[#6C5389] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#584272] transition-colors">
            Add to bag
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}