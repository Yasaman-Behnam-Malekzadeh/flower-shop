import React, { useState } from "react";
import FlowerSelector from "../Components/‌Build/FlowerSelector";
import PaperSelector from "../Components/‌Build/PaperSelector";
import RibbonSelector from "../Components/‌Build/RibbonSelector";
import PersonalTouch from "../Components/‌Build/PersonalTouch";
import LivePreview from "../Components/‌Build/LivePreview";
import PriceBreakdown from "../Components/‌Build/PriceBreakdown";

export default function BuildPage() {
  const [selectedFlowers, setSelectedFlowers] = useState({
    roses: 4,
    tulips: 3,
    daisies: 2,
    sunflowers: 2,
  });

  const [selectedPaper, setSelectedPaper] = useState("lavender");
  const [selectedRibbon, setSelectedRibbon] = useState("lace");

  const [personalDetails, setPersonalDetails] = useState({
    cardText: "Happy birthday, with love...",
    isGiftWrapped: true,
    deliveryDate: "",
    deliveryTime: "10:00",
  });

  const handleUpdateFlowerCount = (id, delta) => {
    setSelectedFlowers((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleUpdateDetails = (key, value) => {
    setPersonalDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 px-4 sm:px-8 font-sans text-stone-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Your dream bouquet
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Pick your blooms and watch your bouquet come together live.
          </p>
        </header>

        {/* Main Grid: Left Options & Right Live Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customization Steps (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <FlowerSelector
              selectedFlowers={selectedFlowers}
              onUpdateCount={handleUpdateFlowerCount}
            />

            <PaperSelector
              selectedPaper={selectedPaper}
              onSelectPaper={setSelectedPaper}
            />

            <RibbonSelector
              selectedRibbon={selectedRibbon}
              onSelectRibbon={setSelectedRibbon}
            />

            <PersonalTouch
              details={personalDetails}
              onChangeDetails={handleUpdateDetails}
            />
          </div>

          {/* Right Column: Sticky Live Preview & Price Breakdown (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 bg-white/90 rounded-3xl p-3 shadow-sm border border-stone-100">
            <LivePreview
              selectedFlowers={selectedFlowers}
              selectedPaper={selectedPaper}
              selectedRibbon={selectedRibbon}
            />

            <PriceBreakdown
              selectedFlowers={selectedFlowers}
              selectedPaper={selectedPaper}
              selectedRibbon={selectedRibbon}
              personalDetails={personalDetails}
            />
          </div>

        </div>
      </div>
    </div>
  );
}