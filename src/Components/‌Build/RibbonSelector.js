import React from "react";

const RIBBONS = [
  { id: "satin-red", name: "Satin red", price: 2.0, color: "bg-red-500" },
  { id: "velvet-cream", name: "Velvet cream", price: 3.0, color: "bg-[#F3ECE1]" },
  { id: "lace", name: "Lace", price: 3.5, color: "bg-stone-200 border-dashed border-stone-400" },
];

export default function RibbonSelector({ selectedRibbon, onSelectRibbon }) {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100">
      <h3 className="font-heading text-lg font-bold text-stone-800 mb-4">
        3. Ribbon
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {RIBBONS.map((ribbon) => {
          const isSelected = selectedRibbon === ribbon.id;
          return (
            <button
              key={ribbon.id}
              onClick={() => onSelectRibbon(ribbon.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-[#584172] bg-white shadow-sm"
                  : "border-transparent bg-stone-50/60 hover:bg-stone-100/80"
              }`}
            >
              <div className={`w-10 h-3 rounded-full ${ribbon.color} mb-4 shadow-sm`} />
              <span className="text-xs font-semibold text-stone-800">{ribbon.name}</span>
              <span className="text-[10px] text-stone-400 mt-0.5">+€{ribbon.price.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { RibbonSelector };