import React, { useState } from 'react';
import AccountHeader from './AccountHeader';
import AccountNavTabs from './AccountNavTabs';
import OrdersList from './OrdersList';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const mockOrders = [
    {
      id: 'MB-1042',
      date: '28/09/2026',
      status: 'crocheting',
      price: 64.90,
    },
    {
      id: 'MB-1031',
      date: '12/09/2026',
      status: 'shipped',
      price: 49.90,
    },
    {
      id: 'MB-0987',
      date: '02/08/2026',
      status: 'delivered',
      price: 89.90,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col justify-between selection:bg-[#584172] selection:text-white">
     

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        {/* User Greeting */}
        <AccountHeader username="yasaman.bmk" />

        {/* Tab Navigation */}
        <AccountNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Section */}
        {activeTab === 'orders' && <OrdersList orders={mockOrders} />}

        {activeTab !== 'orders' && (
          <div className="bg-white/60 border border-[#EBE5DB] rounded-2xl p-12 text-center text-[#9E93A7] text-sm">
            No items in {activeTab} yet.
          </div>
        )}
      </main>
    </div>
  );
}