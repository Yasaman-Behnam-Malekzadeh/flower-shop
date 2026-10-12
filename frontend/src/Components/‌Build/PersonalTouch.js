import React from "react";
import GreetingCard from "./GreetingCard";

export default function PersonalTouch({
  cardDetails,
  onUpdateCardDetails,
  giftWrapDetails,
  onUpdateGiftWrapDetails,
}) {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100 space-y-6">
      <h3 className="font-heading text-lg font-bold text-stone-800">
        4. Personal touch
      </h3>

      {/* Greeting Card Note */}
      <GreetingCard
        details={cardDetails}
        onChangeDetails={onUpdateCardDetails}
      />

      {/* Gift Wrap Toggle */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold text-stone-700">
          Gift wrap (+€4.90)
        </span>
        <button
          type="button"
          onClick={() =>
            onUpdateGiftWrapDetails(
              "isGiftWrapped",
              !giftWrapDetails.isGiftWrapped
            )
          }
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            giftWrapDetails.isGiftWrapped ? "bg-[#584172]" : "bg-stone-200"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              giftWrapDetails.isGiftWrapped ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}