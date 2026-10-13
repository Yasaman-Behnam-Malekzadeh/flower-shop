



import React from "react";

export default function GiftWrap({ details, onChangeDetails }) {
  return (
    <div className="flex items-center justify-between pt-2">
      <span className="text-xs font-semibold text-stone-700">
        Gift wrap (+€4.90)
      </span>
      <button
        type="button"
        onClick={() =>
          onChangeDetails("isGiftWrapped", !details.isGiftWrapped)
        }
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors focus:outline-none ${
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
  );
}