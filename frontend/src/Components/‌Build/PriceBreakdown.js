import React, { useState, useEffect } from "react";

export default function PriceBreakdown({ selectedFlowers = {} }) {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setFlowers(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Map database flowers to the ones the user selected
  const selectedItems = flowers
    .map((flower) => {
      const count = selectedFlowers[flower.id] || selectedFlowers[flower.id.toString()] || 0;
      return {
        ...flower,
        count,
        subtotal: count * Number(flower.price),
      };
    })
    .filter((item) => item.count > 0);

  // Calculate totals (flowers + fixed wrapping/arranging extras)
  const flowersTotal = selectedItems.reduce((acc, item) => acc + item.subtotal, 0);
  const extrasTotal = 3.50 + 3.50 + 5.00 + 4.90; // Lavender paper, ribbon, arranging, gift wrap
  const totalPrice = flowersTotal + (selectedItems.length > 0 ? extrasTotal : 0);

  return (
    <div className="p-6 space-y-4 bg-white/80 rounded-2xl shadow-sm border border-stone-100">
      <h4 className="font-heading text-sm font-bold text-stone-800">
        Price breakdown
      </h4>

      <div className="space-y-2 text-xs text-stone-600 border-b border-stone-100 pb-4">
        {selectedItems.length === 0 ? (
          <div className="text-stone-400 italic">No blooms selected yet.</div>
        ) : (
          selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.count}x {item.name}</span>
              <span>€{item.subtotal.toFixed(2)}</span>
            </div>
          ))
        )}

        {/* Extras */}
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