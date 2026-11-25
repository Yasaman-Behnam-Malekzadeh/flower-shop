import React from "react";
import { useTranslation } from "react-i18next";

export default function ShopFilterBar({ filters, onFilterChange, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#FAF8F5] py-6 border-b border-stone-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <label htmlFor="shop-search-input" className="block font-semibold mb-1.5 text-stone-800">
            {t("shop.filters.search_label")}
          </label>
          <input
            id="shop-search-input"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            type="text"
            placeholder={t("shop.filters.search_placeholder")}
            className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30 transition-all text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-end gap-3 w-full md:w-auto">
          {/* Flower type */}
          <div className="flex-1 min-w-[120px]">
            <label
              htmlFor="filter-flower-type"
              className="block font-semibold mb-1.5 text-stone-800"
            >
              {t("shop.filters.flower_type_label")}
            </label>
            <select
              id="filter-flower-type"
              value={filters.flowerType}
              onChange={(e) => onFilterChange("flowerType", e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30"
            >
              <option value="all">{t("shop.filters.all_flowers")}</option>
              <option value="rose">{t("shop.filters.roses")}</option>
              <option value="tulip">{t("shop.filters.tulips")}</option>
              <option value="daisy">{t("shop.filters.daisies")}</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="flex-1 min-w-[130px]">
            <label className="block font-semibold mb-1.5 text-stone-800">
              {t("shop.filters.occasion_label")}
            </label>
            <select
              value={filters.occasion}
              onChange={(e) => onFilterChange("occasion", e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30"
            >
              <option value="all">{t("shop.filters.every_occasion")}</option>
              <option value="birthday">{t("shop.filters.birthday")}</option>
              <option value="anniversary">
                {t("shop.filters.anniversary")}
              </option>
              <option value="thank_you">{t("shop.filters.thank_you")}</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex-1 min-w-[110px]">
            <label className="block font-semibold mb-1.5 text-stone-800">
              {t("shop.filters.price_label")}
            </label>
            <select
              value={filters.price}
              onChange={(e) => onFilterChange("price", e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C5389]/30"
            >
              <option value="all">{t("shop.filters.every_occasion")}</option>
              <option value="under_5">
                {t("shop.filters.every_occasion_under")} €5
              </option>
              <option value="5_to_10">€5 - €10</option>
              <option value="over_10">
                {t("shop.filters.every_occasion_over")} €10
              </option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="text-[#6C5389] underline font-medium px-2 py-2.5 hover:text-purple-900 transition-colors"
          >
            {t("shop.filters.reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
