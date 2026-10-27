import React from 'react';

export default function AccountHeader({ username = 'yasaman.bmk' }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2D2335] tracking-tight">
        Hello, {username}
      </h1>
      <span className="text-3xl md:text-4xl">🌸</span>
    </div>
  );
}