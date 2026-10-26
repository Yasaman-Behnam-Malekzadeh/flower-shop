import React, { useState, useEffect } from "react";
import { PAPERS } from "./PaperSelector";
import { RIBBONS } from "./RibbonSelector";

export default function PriceBreakdown({
  selectedFlowers = {},
  selectedPaper = "none",
  selectedRibbon = "none",
  cardDetails = { includeCard: false },
  giftWrapDetails = { isGiftWrapped: false },
}) {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Unable to load flowers (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.error || "The flowers API returned invalid data");
        }
        setFlowers(
          data.map((flower) => ({
            ...flower,
            price: flower.price ?? flower.selling_price ?? 0,
          }))
        );
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 1. Map database flowers to user selections
  const selectedItems = flowers
    .map((flower) => {
      const count =
        selectedFlowers[flower.id] ||
        selectedFlowers[flower.id.toString()] ||
        0;
      return {
        ...flower,
        count,
        subtotal: count * Number(flower.price),
      };
    })
    .filter((item) => item.count > 0);

  // 2. Find active paper and ribbon objects
  const currentPaper = PAPERS.find((p) => p.id === selectedPaper) || {
    id: "none",
    name: "No paper",
    price: 0,
  };

  const currentRibbon = RIBBONS.find((r) => r.id === selectedRibbon) || {
    id: "none",
    name: "No ribbon",
    price: 0,
  };

  // 3. Dynamic Total Calculation
  const flowersTotal = selectedItems.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  const paperPrice = currentPaper.price || 0;
  const ribbonPrice = currentRibbon.price || 0;
  const cardPrice = cardDetails?.includeCard ? 3.5 : 0;
  const giftWrapPrice = giftWrapDetails?.isGiftWrapped ? 4.9 : 0;

  const totalPrice =
    flowersTotal + paperPrice + ribbonPrice + cardPrice + giftWrapPrice;

  // Check if any item or add-on is currently active
  const hasItems =
    selectedItems.length > 0 ||
    (currentPaper.id !== "none" && currentPaper.price > 0) ||
    (currentRibbon.id !== "none" && currentRibbon.price > 0) ||
    cardDetails?.includeCard ||
    giftWrapDetails?.isGiftWrapped;

  return (
    <div className="p-6 space-y-4 bg-white/80 rounded-2xl shadow-sm border border-stone-100">
      <h4 className="font-heading text-sm font-bold text-stone-800">
        Price breakdown
      </h4>

      <div className="space-y-2.5 text-xs text-stone-600 border-b border-stone-100 pb-4">
        {!hasItems ? (
          <div className="text-stone-400 italic">No blooms or add-ons selected yet.</div>
        ) : (
          <>
            {/* Flowers List */}
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.count}x {item.name}
                </span>
                <span className="font-medium text-stone-800">
                  €{item.subtotal.toFixed(2)}
                </span>
              </div>
            ))}

            {/* Selected Paper Line Item */}
            {currentPaper.id !== "none" && (
              <div className="flex justify-between text-stone-700">
                <span>{currentPaper.name}</span>
                <span className="font-medium text-stone-800">
                  €{currentPaper.price.toFixed(2)}
                </span>
              </div>
            )}

            {/* Selected Ribbon Line Item */}
            {currentRibbon.id !== "none" && (
              <div className="flex justify-between text-stone-700">
                <span>{currentRibbon.name} ribbon</span>
                <span className="font-medium text-stone-800">
                  €{currentRibbon.price.toFixed(2)}
                </span>
              </div>
            )}

            {/* Handwritten Card Line Item */}
            {cardDetails?.includeCard && (
              <div className="flex justify-between text-stone-700">
                <span>Greeting card (handwritten)</span>
                <span className="font-medium text-stone-800">€3.50</span>
              </div>
            )}

            {/* Gift Wrap Line Item */}
            {giftWrapDetails?.isGiftWrapped && (
              <div className="flex justify-between text-stone-700">
                <span>Gift wrap</span>
                <span className="font-medium text-stone-800">€4.90</span>
              </div>
            )}
          </>
        )}
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