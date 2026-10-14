import React from "react";
import HowItWorksStep from "../Components/HowItWorks/HowItWorksStep";

// 1. Define step data in a clean array
const STEPS = [
  {
    stepNumber: "1",
    title: "Select your blooms",
    description:
      "Browse our ready-made bouquets or build your own. Pick your favourite flowers, colours and style.",
    illustration: "🌸🌿",
  },
  {
    stepNumber: "2",
    title: "We assemble by hand",
    description:
      "Our skilled makers thoughtfully arrange your selected blooms, creating a bouquet just for you, stem by stem.",
    illustration: "✂️📜",
  },
  {
    stepNumber: "3",
    title: "We package with love",
    description:
      "Your unique bouquet is carefully placed in sustainable, gift-ready packaging with a personal note.",
    illustration: "📦✨",
  },
  {
    stepNumber: "4",
    title: "It arrives at your door",
    description:
      "Sit back and relax. Your handmade bouquet is on its way – ready to bring lasting joy.",
    illustration: "🚪🎁",
  },
];

// 2. Define bottom feature highlights data in an array
const FEATURES = [
  {
    icon: "🌿",
    title: "Every bloom is unique",
    subtitle: "No two bouquets are the same.",
  },
  {
    icon: "💖",
    title: "Joy that never wilts",
    subtitle: "Lasting beauty, always.",
  },
  {
    icon: "📦",
    title: "Wrapped with love",
    subtitle: "Sustainable & gift-ready.",
  },
  {
    icon: "✈️",
    title: "Worldwide shipping",
    subtitle: "To Germany and Europe.",
  },
];

export default function HowItWorks() {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen font-sans text-stone-800 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EDE5F2]/60 rounded-3xl p-8 sm:p-12 border border-stone-100 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#584172]">
              Simple steps. Lasting joy.
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Create your dream bouquet. <br />
              <span className="text-[#584172]">
                From your blooms to a forever memory.
              </span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              Creating your unique handmade crochet bouquet is easy. Just a few
              simple steps and you’ll have a bespoke gift that lasts forever.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#584172]/10 flex items-center justify-center border-4 border-white shadow-inner">
              <span className="text-6xl">🧶💐</span>
            </div>
          </div>
        </div>

        {/* Four Steps Section - Mapped cleanly */}
        <div className="space-y-8">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
              How it works in 4 easy steps
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Designed with love and crafted to perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {STEPS.map((step) => (
              <HowItWorksStep
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                illustration={step.illustration}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Light Green Feature Banner - Mapped cleanly */}
      <div className="w-full bg-[#E5EFE9] border-t border-stone-200/60 py-8 px-4 sm:px-8 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-stone-700 text-xs sm:text-sm font-medium">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <span>
                {feature.icon} {feature.title}
              </span>
              <span className="text-[11px] text-stone-500">
                {feature.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { HowItWorks };
