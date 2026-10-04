import React from "react";

const FLOWERS = [
  { id: "roses", name: "Roses", price: 6.5, color: "bg-pink-300" },
  { id: "tulips", name: "Tulips", price: 5.5, color: "bg-purple-300" },
  { id: "daisies", name: "Daisies", price: 4.0, color: "bg-amber-300" },
  { id: "sunflowers", name: "Sunflowers", price: 7.0, color: "bg-amber-500" },
];

export default function FlowerSelector({ selectedFlowers, onUpdateCount }) {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100">
      <h3 className="font-heading text-lg font-bold text-stone-800 mb-4">
        1. Pick blooms
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FLOWERS.map((flower) => {
          const count = selectedFlowers[flower.id] || 0;
          return (
            <div
              key={flower.id}
              className="flex items-center justify-between p-3.5 bg-stone-50/60 rounded-xl border border-stone-100"
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full ${flower.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                  ✿
                </span>
                <div>
                  <div className="font-semibold text-stone-800 text-sm">{flower.name}</div>
                  <div className="text-xs text-stone-400">€{flower.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200">
                <button
                  onClick={() => onUpdateCount(flower.id, -1)}
                  className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-bold text-stone-800">{count}</span>
                <button
                  onClick={() => onUpdateCount(flower.id, 1)}
                  className="w-6 h-6 flex items-center justify-center bg-[#584172] text-white rounded-md hover:bg-[#46335c] transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { FlowerSelector };