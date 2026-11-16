import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CtaBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full pb-10 font-sans">
      <div className="bg-[#F6DDD9] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B] tracking-tight">
            {t("cta_banner.title")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
            {t("cta_banner.subtitle")}
          </p>
        </div>

        <button className="bg-[#6C5389] hover:bg-[#584172] text-white text-xs font-semibold px-6 py-3.5 rounded-2xl shadow-sm transition-all flex items-center gap-2 shrink-0 active:scale-95">
          {t("cta_banner.cta")}
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};

export default CtaBanner;
