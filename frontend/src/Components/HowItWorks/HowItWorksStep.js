import React from "react";

export default function HowItWorksStep({ stepNumber, title, description, illustration }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-xs mx-auto">
      {/* Illustration Card */}
      <div className="relative w-full h-56 bg-[#EDE5F2] rounded-3xl flex items-center justify-center p-4 shadow-sm border border-stone-100 overflow-hidden">
        {/* Step Number Badge */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#584172] text-white flex items-center justify-center font-bold text-sm shadow-md">
          {stepNumber}
        </div>
        {/* Step Illustration / Content */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-5xl">{illustration}</span>
        </div>
      </div>

      {/* Step Text Info */}
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-bold text-stone-900">
          {title}
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export { HowItWorksStep };