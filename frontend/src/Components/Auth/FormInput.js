import React from 'react';

export default function FormInput({ type, placeholder, value, onChange, required = true }) {
  return (
    <div>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-3.5 bg-white border border-[#EBE5DB] rounded-full text-sm text-[#2D2335] placeholder-[#9E93A7] focus:outline-none focus:ring-2 focus:ring-[#584172]/30 focus:border-[#584172] transition-all"
      />
    </div>
  );
}