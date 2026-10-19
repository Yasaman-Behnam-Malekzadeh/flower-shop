import React, { useState } from "react";
import FlowerSelector from "../Components/\u200cBuild/FlowerSelector";
import PriceBreakdown from "../Components/\u200cBuild/PriceBreakdown";
import PaperSelector from "../Components/\u200cBuild/PaperSelector";
import PersonalTouch from "../Components/\u200cBuild/PersonalTouch";
import AiFloristAdvisor from "../Components/BuildAi/AiFloristAdvisor";

// import LivePreview from "../Components/Build/LivePreview";

export default function BuildPage() {
  // State for toggling between manual builder and AI advisor mode
  const [activeTab, setActiveTab] = useState("manual"); // "manual" | "ai"

  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [selectedPaper, setSelectedPaper] = useState("none");
  const [selectedRibbon, setSelectedRibbon] = useState("none");

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

  // Handler to apply AI suggestion back into the manual builder state and switch views
 const handleAiSuggestionApply = (aiData) => {
  if (aiData.recommendedBlooms) {
    const updatedFlowers = {};
    aiData.recommendedBlooms.forEach((bloom) => {
      // Map recommended quantities directly to flower state
      updatedFlowers[bloom.id] = bloom.quantity;
    });
    setSelectedFlowers(updatedFlowers);
  }

  if (aiData.recommendedPaper) {
    setSelectedPaper("kraft"); // Or set matching paper ID
  }

  // Switch tab back to manual builder view
  setActiveTab("manual");
};

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 px-4 sm:px-8 font-sans text-stone-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section & AI Mode Toggle */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Your dream bouquet
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Pick your blooms or let our AI Florist curate a custom mix for
              you.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 bg-stone-200/60 rounded-2xl border border-stone-200 shadow-inner">
            <button
              onClick={() => setActiveTab("manual")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "manual"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Manual Builder
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "ai"
                  ? "bg-[#584172] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <span>✨</span> Build with AI
            </button>
          </div>
        </header>

        {/* Conditional Rendering based on active tab */}
        {activeTab === "ai" ? (
          <AiFloristAdvisor onApplySuggestion={handleAiSuggestionApply} />
        ) : (
          /* Main Grid: Left Options & Right Live Card */
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

              <PersonalTouch
                cardDetails={cardDetails}
                onUpdateCardDetails={handleUpdateCardDetails}
                giftWrapDetails={giftWrapDetails}
                onUpdateGiftWrapDetails={handleUpdateGiftWrapDetails}
                selectedRibbon={selectedRibbon}
                onSelectRibbon={setSelectedRibbon}
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
                selectedRibbon={selectedRibbon}
                cardDetails={cardDetails}
                giftWrapDetails={giftWrapDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
