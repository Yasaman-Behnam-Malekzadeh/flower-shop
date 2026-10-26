import React, { useState, useEffect } from "react";

export default function FlowerSelector({ selectedFlowers, onUpdateCount }) {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load flowers (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.error || "The flowers API returned invalid data");
        }
        const mappedFlowers = data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price ?? item.selling_price ?? 0,
          image: item.image ?? item.image_url ?? "",
        }));
        setFlowers(mappedFlowers);
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100 text-center text-stone-500">
        Loading flowers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100 text-center text-red-600">
        {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-100">
      <h3 className="font-heading text-lg font-bold text-stone-800 mb-4">
        1. Pick blooms
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {flowers.map((flower) => {
          const count = selectedFlowers[flower.id] || 0;
          return (
            <div
              key={flower.id}
              className="flex items-center justify-between p-3.5 bg-stone-50/60 rounded-xl border border-stone-100"
            >
              <div className="flex items-center gap-3">
                {flower.image ? (
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    ✿
                  </span>
                )}
                <div>
                  <div className="font-semibold text-stone-800 text-sm">{flower.name}</div>
                  <div className="text-xs text-stone-400">€{Number(flower.price).toFixed(2)}</div>
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