import React from "react";

export default function PriceBreakdown({ state }) {
  const totalPrice = 81.4;

  return (
    <div className="p-6 space-y-4">
      <h4 className="font-heading text-sm font-bold text-stone-800">
        Price breakdown
      </h4>

      <div className="space-y-2 text-xs text-stone-600 border-b border-stone-100 pb-4">
        <div className="flex justify-between">
          <span>4x Roses</span>
          <span>€26.00</span>
        </div>
        <div className="flex justify-between">
          <span>3x Tulips</span>
          <span>€16.50</span>
        </div>
        <div className="flex justify-between">
          <span>2x Daisies</span>
          <span>€8.00</span>
        </div>
        <div className="flex justify-between">
          <span>2x Sunflowers</span>
          <span>€14.00</span>
        </div>
        <div className="flex justify-between">
          <span>Lavender paper</span>
          <span>€3.50</span>
        </div>
        <div className="flex justify-between">
          <span>Lace ribbon</span>
          <span>€3.50</span>
        </div>
        <div className="flex justify-between">
          <span>Arranging</span>
          <span>€5.00</span>
        </div>
        <div className="flex justify-between">
          <span>Gift wrap</span>
          <span>€4.90</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="text-xs font-semibold text-stone-800">Total</div>
          <div className="text-[10px] text-stone-400">incl. VAT</div>
        </div>
        <div className="text-2xl font-black text-stone-900 font-heading">
          €{totalPrice.toFixed(2)}
        </div>
      </div>

      <button className="w-full bg-[#584172] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-[#46335c] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2">
        <span>🛒</span> Add to cart
      </button>
    </div>
  );
}

export { PriceBreakdown };
