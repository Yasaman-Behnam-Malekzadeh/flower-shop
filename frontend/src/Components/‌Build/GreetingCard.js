import React from "react";

export default function GreetingCard({ details, onChangeDetails }) {
  return (
    <div>
      {/* Toggle Header */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-stone-700">
          Include greeting card (handwritten) (+€3.50)
        </label>
        
        {/* Toggle Switch */}
        <button
          type="button"
          onClick={() => onChangeDetails("includeCard", !details.includeCard)}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            details.includeCard ? "bg-[#584172]" : "bg-stone-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              details.includeCard ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Textarea Container (Disabled state applied when off) */}
      <div
        className={`relative transition-all duration-200 ${
          !details.includeCard ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <textarea
          disabled={!details.includeCard}
          maxLength={200}
          rows={3}
          value={details.cardText || ""}
          onChange={(e) => onChangeDetails("cardText", e.target.value)}
          placeholder="Happy birthday, with love..."
          className="w-full text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#584172] resize-none text-stone-700 bg-stone-50/30 disabled:bg-stone-100 disabled:cursor-not-allowed"
        />
        <span className="absolute bottom-3 right-3 text-[10px] text-stone-400">
          {(details.cardText || "").length}/200
        </span>
      </div>
    </div>
  );
}