import React from 'react';

export default function AuthTabSwitch({ activeTab, setActiveTab }) {
  return (
    <div className="bg-[#EBE5DB]/60 p-1 rounded-full flex mb-6">
      <button
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
          activeTab === 'login'
            ? 'bg-white text-[#2D2335] shadow-sm'
            : 'text-[#6E6377] hover:text-[#2D2335]'
        }`}
      >
        Log in
      </button>
      <button
        onClick={() => setActiveTab('register')}
        className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
          activeTab === 'register'
            ? 'bg-white text-[#2D2335] shadow-sm'
            : 'text-[#6E6377] hover:text-[#2D2335]'
        }`}
      >
        Register
      </button>
    </div>
  );
}