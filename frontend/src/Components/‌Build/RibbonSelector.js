import React from "react";
import { useEffect, useState } from "react";

export default function RibbonSelector({ selectedRibbon, onSelectRibbon }) {
  const [ribbons, setRibbons] = useState([]);

  useEffect(() => {
    fetch("/api/ribbons")
      .then((response) => response.json())
      .then((data) => {
        const mappedRibbons = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
        }));
        setRibbons(mappedRibbons);
      })
      .catch((error) => console.error("Error fetching ribbons:", error))
  }, [])

  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 mb-3">
        Select ribbon
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ribbons.map((ribbon) => {
          const isSelected = selectedRibbon === ribbon.id;
          return (
            <button
              key={ribbon.id}
              type="button"
              onClick={() => onSelectRibbon(ribbon.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all focus:outline-none ${
                isSelected
                  ? "border-[#584172] bg-white shadow-sm"
                  : "border-transparent bg-stone-50/60 hover:bg-stone-100/80"
              }`}
            >
              <div
                className={`w-10 h-3 rounded-full ${ribbon.color} mb-3 shadow-sm`}
              />
              <span className="text-xs font-semibold text-stone-800">
                {ribbon.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                {ribbon.price === 0 ? "Free" : `+€${ribbon.price.toFixed(2)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { RibbonSelector };
