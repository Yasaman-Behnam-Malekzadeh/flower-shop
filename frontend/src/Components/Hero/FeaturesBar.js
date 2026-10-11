import React from 'react';
import { Flower2, Heart, Package } from 'lucide-react';

const FeaturesBar = () => {
  const features = [
    {
      icon: <Flower2 className="w-4 h-4 text-green-text" />,
      text: "Every bloom is unique",
    },
    {
      icon: <Heart className="w-4 h-4 text-green-text" />,
      text: "Joy that never wilts",
    },
    {
      icon: <Package className="w-4 h-4 text-green-text" />,
      text: "Wrapped with love",
    },
  ];

  return (
    <div className="bg-[#E2EBE0] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-around items-center gap-4 text-xs font-semibold text-[#3A4B3E]">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBar;