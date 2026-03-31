import React from "react";
import heroBg from "../assets/hero-bg.png";
import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";


function Hero() {
  return (
    <div className="relative h-[900px] bg-lightPink overflow-hidden">

      <img
        src={heroBg}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 80%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 80%)",
        }}
      />

      <div className="flex flex-col justify-center h-full relative z-10 gap-6 px-8x container mx-auto">
        <div className="text-7xl text-gray-700 font-bold">
          Flowers That
        </div>
        <div className="text-7xl font-bold text-darkPink">
          Never Fade
        </div>
        <div className="text-2xl text-gray-700 max-w-md">
          Each petal is lovingly crocheted by hand — bringing warmth, beauty,
          and everlasting bloom into your world.
        </div>
        <Link to="/" className="btn bg-darkPink hover:bg-darkPinkHover flex text-white text-xl p-3 px-4 rounded-md w-[200px]">
          <BsShop size={20} className="mr-2" />
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
