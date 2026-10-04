import React from "react";

const PAPERS = [
  { id: "pastel-pink", name: "Pastel pink", price: 3.5, color: "bg-[#F7E5E9]" },
  { id: "kraft-paper", name: "Kraft paper", price: 2.5, color: "bg-[#E6D4C3]" },
  { id: "lavender", name: "Lavender", price: 3.5, color: "bg-[#E6E1F0]" },
  { id: "sky-blue", name: "Sky blue", price: 3.5, color: "bg-[#E1EFF7]" },
];

export default function PaperSelector({ selectedPaper, onSelectPaper }) {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100">
      <h3 className="font-heading text-lg font-bold text-stone-800 mb-4">
        2. Paper
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PAPERS.map((paper) => {
          const isSelected = selectedPaper === paper.id;
          return (
            <button
              key={paper.id}
              onClick={() => onSelectPaper(paper.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-[#584172] bg-white shadow-sm"
                  : "border-transparent bg-stone-50/60 hover:bg-stone-100/80"
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${paper.color} mb-3 shadow-inner`} />
              <span className="text-xs font-semibold text-stone-800">{paper.name}</span>
              <span className="text-[10px] text-stone-400 mt-0.5">+€{paper.price.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { PaperSelector };