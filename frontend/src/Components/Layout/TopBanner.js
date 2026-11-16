import React from "react";
import { useTranslation } from "react-i18next";

const TopBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-sage text-green-text text-[11px] font-medium py-1.5 px-4 text-center flex justify-center items-center gap-1.5 tracking-wide">
      <span>{t("top_banner.crafted")}</span>
      <span className="inline-block w-1 h-1 rounded-full bg-green-text/30" />
      <span>{t("top_banner.shipping")}</span>
    </div>
  );
};

export default TopBanner;
