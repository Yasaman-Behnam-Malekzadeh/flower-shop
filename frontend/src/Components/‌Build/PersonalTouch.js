import React from "react";
import GreetingCard from "./GreetingCard";
import GiftWrap from "./GiftWrap";

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
      <GiftWrap
        details={giftWrapDetails}
        onChangeDetails={onUpdateGiftWrapDetails}
      />
    </div>
  );
}