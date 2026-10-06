import React from "react";
import ShopFilterBar from "../Components/Shop/ShopFilterBar";
import BouquetCard from "../Components/Shop/BouquetCard";
import FeaturesBar from "../Components/Hero/FeaturesBar";

const PRODUCTS = [
  {
    id: 1,
    title: "Pastel Poetry",
    description: "Crochet flowers · thoughtfully arranged",
    price: "39.90",
    tag: "Our favourite",
    bgCard: "bg-[#EDE8EC]",
    image: "/images/bouquet1.png",
  },
  {
    id: 2,
    title: "Meadow Joy",
    description: "Crochet flowers · thoughtfully arranged",
    price: "34.90",
    bgCard: "bg-[#EAECE6]",
    image: "/images/bouquet2.png",
  },
  {
    id: 3,
    title: "Little Sunshine",
    description: "Crochet flowers · thoughtfully arranged",
    price: "42.90",
    bgCard: "bg-[#F5ECE2]",
    image: "/images/bouquet3.png",
  },
  {
    id: 4,
    title: "Lavender Love",
    description: "Crochet flowers · thoughtfully arranged",
    price: "36.90",
    bgCard: "bg-[#EDE8EC]",
    image: "/images/bouquet1.png",
  },
  {
    id: 5,
    title: "Rose Wishes",
    description: "Crochet flowers · thoughtfully arranged",
    price: "44.90",
    bgCard: "bg-[#F6E8E8]",
    image: "/images/bouquet2.png",
  },
  {
    id: 6,
    title: "A Little Thank-you",
    description: "Crochet flowers · thoughtfully arranged",
    price: "29.90",
    bgCard: "bg-[#EAECE6]",
    image: "/images/bouquet3.png",
  },
];

export default function ShopPage() {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen flex flex-col font-sans text-stone-800">
      {/* 1. Header Banner Area */}
      <section className=" relative pt-8 pb-6 px-6 sm:px-12 text-center max-w-4xl mx-auto">
        <div className="absolute top-10 -left-8 sm:-left-12 z-30 animate-swing">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 fill-current drop-shadow-md"
            viewBox="0 0 100 100"
          >
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle
              cx="50"
              cy="50"
              r="10"
              className="text-amber-600 fill-current"
            />
          </svg>
        </div>
        <div className="text-xs text-stone-400 mb-4 font-medium">
          Home / Bouquets
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2B2B2B] tracking-tight leading-tight">
          Little bouquets.
          <br />
          <span className="text-[#6C5389]">Lasting joy.</span>
        </h1>
        <div
          className="absolute bottom-10 -right-6 sm:-right-10 z-30 animate-swing"
          style={{ animationDelay: "0.6s" }}
        >
          <svg
            className="w-10 h-10 sm:w-14 sm:h-14 text-[#584172] fill-current drop-shadow-md"
            viewBox="0 0 100 100"
          >
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle
              cx="50"
              cy="50"
              r="10"
              className="text-purple-300 fill-current"
            />
          </svg>
        </div>
        <p className="text-stone-600 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
          Thoughtfully arranged. Ready to fall in love with. Find your handmade
          crochet bouquet — for yourself or someone special.
        </p>
      </section>

      {/* 2. Top Features Green Bar */}
      <FeaturesBar />

      {/* 3. Filter Bar */}
      <ShopFilterBar />

      {/* 4. Products Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full flex-1">
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-8">
          <span>
            {PRODUCTS.length} of {PRODUCTS.length} bouquets
          </span>
          <div className="flex items-center gap-2">
            <span>Sort:</span>
            <select className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer">
              <option>Our picks</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <BouquetCard key={product.id} item={product} />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-[#EDE8EC] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Want something uniquely yours?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Choose your flowers, paper and ribbon. We'll make your
              one-of-a-kind bouquet.
            </p>
          </div>
          <button className="bg-[#6C5389] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#584272] transition-colors whitespace-nowrap">
            Design your bouquet
          </button>
        </div>
      </main>
    </div>
  );
}
