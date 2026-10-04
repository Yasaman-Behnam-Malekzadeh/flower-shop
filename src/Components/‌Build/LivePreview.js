import React from "react";

export default function LivePreview() {
  return (
    <div className="bg-[#F8EFF4] rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[260px]">
      <span className="absolute top-4 left-4 bg-white/80 text-[10px] font-semibold text-stone-600 px-2.5 py-1 rounded-full shadow-sm">
        Live preview
      </span>
      {/* Visual Illustration Holder */}
      <div className="w-48 h-48 relative flex items-center justify-center">
        {/* Placeholder for SVG or Image Bouquet rendering */}
        <div className="w-40 h-40 bg-purple-200/50 rounded-full flex items-center justify-center border border-purple-300/30 shadow-inner">
          <span className="text-4xl">💐</span>
        </div>
      </div>
    </div>
  );
}

export { LivePreview };