import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    title: 'Pastel Poetry',
    tag: 'Our favourite',
    description: 'Pink, cream & a touch of lavender',
    price: '39.90',
    bgCardColor: '#F3EBEA', // Soft blush pink
    imageSrc: '/images/bouquet-pastel.png',
  },
  {
    id: 2,
    title: 'Meadow Joy',
    tag: 'Just for you',
    description: 'A little piece of a wildflower meadow',
    price: '34.90',
    bgCardColor: '#E2E8DC', // Soft sage green
    imageSrc: '/images/bouquet-meadow.png',
  },
  {
    id: 3,
    title: 'Little Sunshine',
    tag: 'A little happiness',
    description: 'Warm colours, happy feelings',
    price: '42.90',
    bgCardColor: '#F4ECE1', // Soft warm cream/yellow
    imageSrc: '/images/bouquet-sunshine.png',
  },
  {
    id: 4,
    title: 'Lavender Love',
    tag: 'So much love',
    description: 'Soft shades for special people',
    price: '36.90',
    bgCardColor: '#EAE5F2', // Soft lavender
    imageSrc: '/images/bouquet-lavender.png',
  },
];

const FeaturedBouquets = () => {
  return (
    <div className=" w-full my-32 font-sans">
      <div className=" mx-auto">
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2B2B] tracking-tight">
              Made to fall in love with.
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Our favourite bouquets. Maybe yours, too?
            </p>
          </div>

          <a 
            href="#all-bouquets" 
            className="text-xs font-semibold text-[#2B2B2B] underline underline-offset-4 hover:opacity-75 transition-opacity self-start sm:self-auto"
          >
            Explore all bouquets
          </a>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBouquets;