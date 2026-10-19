import React from "react";

export default function BuildHeader({ activeTab, setActiveTab }) {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Your dream bouquet
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Pick your blooms and watch your bouquet come together live.
        </p>
      </div>

      {/* Toggle buttons to switch between Manual Builder and Build with AI */}
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
  );
}