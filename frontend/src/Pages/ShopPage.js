import React, { useEffect, useState } from "react";
import ShopFilterBar from "../Components/Shop/ShopFilterBar";
import BouquetCard from "../Components/Shop/BouquetCard";
import FeaturesBar from "../Components/Hero/FeaturesBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const INITIAL_FILTERS = {
  search: "",
  flowerType: "all",
  occasion: "all",
  price: "all",
};

const matchesSearch = (product, search) => {
  if (!search.trim()) return true;
  const query = search.toLowerCase();
  return (
    (product.name || "").toLowerCase().includes(query) ||
    (product.description || "").toLowerCase().includes(query)
  );
};

const matchesFlowerType = (product, flowerType) => {
  if (flowerType === "all") return true;
  const haystack = `${product.flower_type || ""} ${product.name || ""} ${
    product.description || ""
  }`.toLowerCase();
  return haystack.includes(flowerType.toLowerCase());
};

const matchesOccasion = (product, occasion) => {
  if (occasion === "all") return true;
  const haystack = `${product.occasion || ""} ${
    product.description || ""
  }`.toLowerCase();
  return haystack.includes(occasion.toLowerCase());
};

const matchesPrice = (product, priceRange) => {
  const price = Number(product.price);
  if (priceRange === "under_5") return price < 5;
  if (priceRange === "5_to_10") return price >= 5 && price <= 10;
  if (priceRange === "over_10") return price > 10;
  return true;
};

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState("default");
  const { t } = useTranslation();

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const mappedProducts = data.map((item) => ({
          id: item.id,
          name: item.name,
          title: item.name,
          price: item.price,
          description: item.description || "",
          flower_type: item.flower_type || "",
          occasion: item.occasion || "",
          image: item.image_url,
          image_url: item.image_url,
        }));

        setProducts(mappedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        matchesSearch(product, filters.search) &&
        matchesFlowerType(product, filters.flowerType) &&
        matchesOccasion(product, filters.occasion) &&
        matchesPrice(product, filters.price)
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen flex flex-col font-sans text-stone-800">
      {/* 1. Header Banner Area */}
      <section className="relative pt-8 pb-6 px-6 sm:px-12 text-center max-w-4xl mx-auto">
        <div className="absolute top-10 -left-8 sm:-left-12 z-30 animate-swing">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 fill-current drop-shadow-md"
            viewBox="0 0 100 100"
          >
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle
              cx="50"
              cy="50"
              r="10"
              className="text-amber-600 fill-current"
            />
          </svg>
        </div>
        <div className="text-xs text-stone-400 mb-4 font-medium">
          {t("shop.breadcrumb.home")} / {t("shop.breadcrumb.bouquets")}
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2B2B2B] tracking-tight leading-tight">
          {t("shop.header.title")}
          <br />
          <span className="text-[#6C5389]">
            {t("shop.header.title_purple")}
          </span>
        </h1>
        <div
          className="absolute bottom-10 -right-6 sm:-right-10 z-30 animate-swing"
          style={{ animationDelay: "0.6s" }}
        >
          <svg
            className="w-10 h-10 sm:w-14 sm:h-14 text-[#584172] fill-current drop-shadow-md"
            viewBox="0 0 100 100"
          >
            <path d="M50 35 C55 15, 75 25, 62 38 C80 32, 85 55, 66 58 C80 72, 60 88, 50 68 C40 88, 20 72, 34 58 C15 55, 20 32, 38 38 C25 25, 45 15, 50 35 Z" />
            <circle
              cx="50"
              cy="50"
              r="10"
              className="text-purple-300 fill-current"
            />
          </svg>
        </div>
        <p className="text-stone-600 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
          {t("shop.header.subtitle")}
        </p>
      </section>

      {/* 2. Top Features Green Bar */}
      <FeaturesBar />

      {/* 3. Filter Bar */}
      <ShopFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* 4. Products Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full flex-1">
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-8">
          <div className="flex items-center gap-2">
            <span>{t("shop.sort.label")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="default">{t("shop.sort.our_picks")}</option>
              <option value="price_asc">{t("shop.sort.price_low_to_high")}</option>
              <option value="price_desc">{t("shop.sort.price_high_to_low")}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <BouquetCard key={product.id} item={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white/70 border border-stone-200/80 rounded-3xl py-16 px-6 text-center max-w-lg mx-auto my-6">
            <h3 className="font-heading text-xl font-bold text-[#2B2B2B]">
              {t("shop.empty.title")}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              {t("shop.empty.subtitle")}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 bg-[#6C5389] hover:bg-[#584172] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {t("shop.empty.reset_button")}
            </button>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-[#EDE8EC] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t("shop.cta_card.title")}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              {t("shop.cta_card.text")}
            </p>
          </div>
          <Link
            to="/build"
            className="bg-[#6C5389] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#584272] transition-colors whitespace-nowrap"
          >
            {t("shop.cta_card.design_button")}
          </Link>
        </div>
      </main>
    </div>
  );
}