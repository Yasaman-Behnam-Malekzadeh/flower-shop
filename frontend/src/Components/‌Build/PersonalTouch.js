import React from "react";
import RibbonSelector from "./RibbonSelector";
import GreetingCard from "./GreetingCard";
import GiftWrap from "./GiftWrap";
import { useTranslation } from "react-i18next";

export default function PersonalTouch({
  selectedRibbon,
  onSelectRibbon,
  cardDetails,
  onUpdateCardDetails,
  giftWrapDetails,
  onUpdateGiftWrapDetails,
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100 space-y-6">
      <h3 className="font-heading text-lg font-bold text-stone-800">
        {t("build.personal-touch")}
      </h3>

      {/* Ribbon Selector */}
      <RibbonSelector
        selectedRibbon={selectedRibbon}
        onSelectRibbon={onSelectRibbon}
      />

      <hr className="border-stone-100" />

      {/* Greeting Card Note */}
      <GreetingCard
        details={cardDetails}
        onChangeDetails={onUpdateCardDetails}
      />

      <hr className="border-stone-100" />

      {/* Gift Wrap Toggle */}
      <GiftWrap
        details={giftWrapDetails}
        onChangeDetails={onUpdateGiftWrapDetails}
      />
    </div>
  );
}