import React from 'react';

export default function ShopFilterBar() {
  return (
    <div className="w-full bg-[#FAF8F5] py-6 border-b border-stone-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
        
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <label className="block font-semibold mb-1.5 text-stone-800">Find your bouquet</label>
          <input 
            type="text" 
            placeholder="Pastel, lavender ..." 
            className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30 transition-all text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-end gap-3 w-full md:w-auto">
          {/* Flower type */}
          <div className="flex-1 min-w-[120px]">
            <label className="block font-semibold mb-1.5 text-stone-800">Flower type</label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>All flowers</option>
              <option>Roses</option>
              <option>Tulips</option>
              <option>Daisies</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="flex-1 min-w-[130px]">
            <label className="block font-semibold mb-1.5 text-stone-800">Occasion</label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>Every occasion</option>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Thank you</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex-1 min-w-[110px]">
            <label className="block font-semibold mb-1.5 text-stone-800">Price</label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>All prices</option>
              <option>Under €30</option>
              <option>€30 - €40</option>
              <option>Over €40</option>
            </select>
          </div>

          {/* Reset Button */}
          <button className="text-[#6C5389] underline font-medium px-2 py-2.5 hover:text-purple-900 transition-colors">
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}