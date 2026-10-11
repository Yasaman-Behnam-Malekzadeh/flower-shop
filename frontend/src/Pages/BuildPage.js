import React, { useState } from "react";
import FlowerSelector from "../Components/‌Build/FlowerSelector";
import PriceBreakdown from "../Components/‌Build/PriceBreakdown";

export default function BuildPage() {
  const [selectedFlowers, setSelectedFlowers] = useState({});

  const handleUpdateCount = (flowerId, delta) => {
    setSelectedFlowers((prev) => {
      const currentCount = prev[flowerId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      return { ...prev, [flowerId]: newCount };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <div className="md:col-span-2">
        <FlowerSelector 
          selectedFlowers={selectedFlowers} 
          onUpdateCount={handleUpdateCount} 
        />
      </div>
      <div>
        <PriceBreakdown 
          selectedFlowers={selectedFlowers} 
        />
      </div>
    </div>
  );
}