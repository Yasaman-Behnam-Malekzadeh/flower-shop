  import React from 'react';
  import { Heart, ShoppingBag } from 'lucide-react';
  import { useTranslation,Trans } from 'react-i18next';
  import { Link } from 'react-router-dom';

  const HowItWorksBanner = () => {
    const { t } = useTranslation();
    return (
      <div className=" w-full pb-20 font-sans">
        <div className="bg-[#EFEAEF] rounded-3xl  sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2B2B2B] leading-tight">
                <Trans i18nKey="how-it-works-banner.title" components={{ br: <br /> }} />
              </h2>
              <p className="text-sm text-gray-600 mt-4 font-medium">
                {t("how-it-works-banner.subtitle")}
              </p>
            </div>
            <Link
              to="/build"
              className="inline-block mt-8 text-xs font-bold text-[#2B2B2B] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              <Trans i18nKey="how-it-works-banner.cta" />
            </Link>
          </div>

          {/* Right Column: 3 Steps */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <svg className="w-9 h-9 text-[#6C5389]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4z" />
                <path d="M6 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4z" />
                <path d="M18 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4z" />
                <path d="M12 14a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4z" />
                <circle cx="12" cy="10" r="2" fill="currentColor" />
              </svg>
              <h3 className="text-base font-bold text-[#2B2B2B]">
                {t("how-it-works-banner.step_1.title")}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("how-it-works-banner.step_1.desc")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Heart className="w-9 h-9 text-[#6C5389] stroke-[1.8]" />
              <h3 className="text-base font-bold text-[#2B2B2B]">
                {t("how-it-works-banner.step_2.title")}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("how-it-works-banner.step_2.desc")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <ShoppingBag className="w-9 h-9 text-[#6C5389] stroke-[1.8]" />
              <h3 className="text-base font-bold text-[#2B2B2B]">
                {t("how-it-works-banner.step_3.title")}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("how-it-works-banner.step_3.desc")}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  };

  export default HowItWorksBanner;