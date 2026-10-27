import React from 'react';

export default function AccountNavTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'designs', label: 'My designs' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="inline-flex bg-[#EBE5DB]/60 p-1 rounded-full mb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              isActive
                ? 'bg-white text-[#2D2335] shadow-sm'
                : 'text-[#6E6377] hover:text-[#2D2335]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}