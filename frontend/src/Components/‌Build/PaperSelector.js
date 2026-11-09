import React from "react";
import { useEffect , useState } from "react";

export default function PaperSelector({ selectedPaper, onSelectPaper }) {

  const [papers, setPapers] = useState([]);

  useEffect (() => {
    fetch("/api/papers")
      .then ((response) => response.json())
      .then ((data) => {
        const mappedPapers = data.map((item) => ({
          id : item.id,
          name : item.name,
          price : item.price
        }))
        setPapers(mappedPapers)
      })
      .catch((error) => console.error("Error fetching papers:", error))
  })

  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100">
      <h3 className="font-heading text-lg font-bold text-stone-800 mb-4">
        2. Paper
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {papers.map((paper) => {
          const isSelected = selectedPaper === paper.id;
          return (
            <button
              key={paper.id}
              type="button"
              onClick={() => onSelectPaper(paper.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-[#584172] bg-white shadow-sm"
                  : "border-transparent bg-stone-50/60 hover:bg-stone-100/80"
              }`}
            >
              <span className="text-xs font-semibold text-stone-800">
                {paper.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                +€{paper.price.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { PaperSelector };
