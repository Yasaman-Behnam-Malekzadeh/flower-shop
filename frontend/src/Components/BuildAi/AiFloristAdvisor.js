import React, { useState } from "react";

export default function AiFloristAdvisor({ onApplySuggestion }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      // Try fetching from backend endpoint
      const response = await fetch("/api/ai-florist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Backend unavailable");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.warn("Backend API not connected yet, using mockup AI response:", error);

      // Local mock response to test UI rendering
      setTimeout(() => {
        setResult({
          title: "Romantic Rose Birthday Bouquet",
          reasoning:
            "A rich and elegant selection featuring handcrafted crochet roses, paired with warm kraft wrapping for a classic birthday surprise.",
          recommendedBlooms: [
            { id: "rose_l", name: "Rose (L)", quantity: 3 },
            { id: "rose_m", name: "Rose (M)", quantity: 2 },
          ],
          recommendedPaper: "Kraft paper",
        });
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm max-w-2xl mx-auto my-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-purple-50 text-[#584172] rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
          ✨
        </div>
        <h2 className="text-2xl font-bold text-stone-900">KnitFlora AI Advisor</h2>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Describe the mood, occasion, recipient, or color palette in any language.
        </p>
      </div>

      <form onSubmit={handleAskAi} className="space-y-4">
        <div>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., I want a bouquet with just roses for my sister's birthday..."
            className="w-full p-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#584172] focus:border-transparent outline-none text-stone-800 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full py-3.5 bg-[#584172] text-white rounded-2xl font-medium hover:bg-[#48345e] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          {loading ? (
            <span>Generating bouquet...</span>
          ) : (
            <>
              <span>✨</span> Generate Bouquet Recommendation
            </>
          )}
        </button>
      </form>

      {/* Render AI recommendation result card */}
      {result && (
        <div className="mt-8 p-6 bg-purple-50/50 rounded-2xl border border-purple-100 animate-fadeIn">
          <h3 className="text-lg font-bold text-[#584172] mb-2">{result.title}</h3>
          <p className="text-stone-600 text-sm mb-4 leading-relaxed">{result.reasoning}</p>

          <div className="space-y-2 mb-6">
            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Suggested items:
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.recommendedBlooms?.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-white px-3 py-1.5 rounded-xl border border-purple-100 text-xs font-medium text-stone-700 shadow-sm"
                >
                  {item.quantity}x {item.name}
                </span>
              ))}
              {result.recommendedPaper && (
                <span className="bg-white px-3 py-1.5 rounded-xl border border-purple-100 text-xs font-medium text-stone-700 shadow-sm">
                  Paper: {result.recommendedPaper}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onApplySuggestion(result)}
              className="flex-1 py-2.5 bg-[#584172] text-white rounded-xl text-sm font-medium hover:bg-[#48345e] transition-colors shadow-sm"
            >
              Load into Manual Builder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}