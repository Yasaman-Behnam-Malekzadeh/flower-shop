import React from "react";

export default function PersonalTouch({ details, onChangeDetails }) {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100 space-y-6">
      <h3 className="font-heading text-lg font-bold text-stone-800">
        4. Personal touch
      </h3>

      {/* Greeting Card Note */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-2">
          Greeting card (handwritten) (+€3.50)
        </label>
        <div className="relative">
          <textarea
            maxLength={200}
            rows={3}
            value={details.cardText}
            onChange={(e) => onChangeDetails("cardText", e.target.value)}
            placeholder="Happy birthday, with love..."
            className="w-full text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#584172] resize-none text-stone-700 bg-stone-50/30"
          />
          <span className="absolute bottom-3 right-3 text-[10px] text-stone-400">
            {details.cardText.length}/200
          </span>
        </div>
      </div>

      {/* Gift Wrap Toggle */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold text-stone-700">
          Gift wrap (+€4.90)
        </span>
        <button
          onClick={() => onChangeDetails("isGiftWrapped", !details.isGiftWrapped)}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            details.isGiftWrapped ? "bg-[#584172]" : "bg-stone-200"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              details.isGiftWrapped ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Delivery Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-[11px] font-semibold text-stone-500 mb-1.5">
            Delivery date
          </label>
          <input
            type="date"
            value={details.deliveryDate}
            onChange={(e) => onChangeDetails("deliveryDate", e.target.value)}
            className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#584172] bg-stone-50/30 text-stone-700"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-stone-500 mb-1.5">
            Time
          </label>
          <input
            type="time"
            value={details.deliveryTime}
            onChange={(e) => onChangeDetails("deliveryTime", e.target.value)}
            className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#584172] bg-stone-50/30 text-stone-700"
          />
        </div>
      </div>
    </div>
  );
}

export { PersonalTouch };