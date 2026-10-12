import React, { useState } from "react";
import FlowerSelector from "../Components/‌Build/FlowerSelector";
import PriceBreakdown from "../Components/‌Build/PriceBreakdown";
import PaperSelector from "../Components/‌Build/PaperSelector";
import PersonalTouch from "../Components/‌Build/PersonalTouch";
// import RibbonSelector from "../Components/‌Build/RibbonSelector";

// import RibbonSelector from "../Components/Build/RibbonSelector";
// import LivePreview from "../Components/Build/LivePreview";

export default function BuildPage() {
  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [selectedPaper, setSelectedPaper] = useState("lavender");

  // 1. Greeting Card State & Handler
  const [cardDetails, setCardDetails] = useState({
    includeCard: false,
    cardText: "",
  });

  const handleUpdateCardDetails = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  // 2. Gift Wrap State & Handler
  const [giftWrapDetails, setGiftWrapDetails] = useState({
    isGiftWrapped: false,
  });

  const handleUpdateGiftWrapDetails = (field, value) => {
    setGiftWrapDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateCount = (flowerId, delta) => {
    setSelectedFlowers((prev) => {
      const currentCount = prev[flowerId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      return { ...prev, [flowerId]: newCount };
    });
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
              onUpdateCount={handleUpdateCount}
            />

            <PaperSelector
              selectedPaper={selectedPaper}
              onSelectPaper={setSelectedPaper}
            />

            {/* <RibbonSelector
              selectedRibbon={selectedRibbon}
              onSelectRibbon={setSelectedRibbon}
            />*/}

            <PersonalTouch
              cardDetails={cardDetails}
              onUpdateCardDetails={handleUpdateCardDetails}
              giftWrapDetails={giftWrapDetails}
              onUpdateGiftWrapDetails={handleUpdateGiftWrapDetails}
            />
          </div>

          {/* Right Column: Sticky Live Preview & Price Breakdown (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 bg-white/90 rounded-3xl p-3 shadow-sm border border-stone-100">
            {/* <LivePreview
              selectedFlowers={selectedFlowers}
              selectedPaper={selectedPaper}
              selectedRibbon={selectedRibbon}
            /> */}

            <PriceBreakdown
              selectedFlowers={selectedFlowers}
              selectedPaper={selectedPaper}
              cardDetails={cardDetails}
              giftWrapDetails={giftWrapDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
