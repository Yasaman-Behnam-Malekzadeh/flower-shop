import React from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export default function ShopFilterBar({ searchTerm = "", onSearchChange }) {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#FAF8F5] py-6 border-b border-stone-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <label className="block font-semibold mb-1.5 text-stone-800">
            {t("shop.filters.search_label")}
          </label>
          <div className="relative">
            <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder={t("shop.filters.search_placeholder")}
            className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30 transition-all text-stone-800 placeholder-stone-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          </div>
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-end gap-3 w-full md:w-auto">
          {/* Flower type */}
          <div className="flex-1 min-w-[120px]">
            <label className="block font-semibold mb-1.5 text-stone-800">
              {t("shop.filters.flower_type_label")}
            </label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>{t("shop.filters.all_flowers")}</option>
              <option>{t("shop.filters.roses")}</option>
              <option>{t("shop.filters.tulips")}</option>
              <option>{t("shop.filters.daisies")}</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="flex-1 min-w-[130px]">
            <label className="block font-semibold mb-1.5 text-stone-800">
              {t("shop.filters.occasion_label")}
            </label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>{t("shop.filters.every_occasion")}</option>
              <option>{t("shop.filters.birthday")}</option>
              <option>{t("shop.filters.anniversary")}</option>
              <option>{t("shop.filters.thank_you")}</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex-1 min-w-[110px]">
            <label className="block font-semibold mb-1.5 text-stone-800">
              {t("shop.filters.price_label")}
            </label>
            <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30">
              <option>{t("shop.filters.every_occasion")}</option>
              <option>{t("shop.filters.every_occasion_under")} €30</option>
              <option>€30 - €40</option>
              <option>{t("shop.filters.every_occasion_over")} €40</option>
            </select>
          </div>

          {/* Reset Button */}
          <button className="text-[#6C5389] underline font-medium px-2 py-2.5 hover:text-purple-900 transition-colors">
            {t("shop.filters.reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
