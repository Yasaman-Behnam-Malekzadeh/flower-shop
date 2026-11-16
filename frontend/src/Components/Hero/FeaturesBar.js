import React from 'react';
import { Flower2, Heart, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesBar = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <Flower2 className="w-4 h-4 text-green-text" />,
      text: t("hero.highlights.unique"),
    },
    {
      icon: <Heart className="w-4 h-4 text-green-text" />,
      text: t("hero.highlights.never_wilts"),
    },
    {
      icon: <Package className="w-4 h-4 text-green-text" />,
      text: t("hero.highlights.wrapped"),
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