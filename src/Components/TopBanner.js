import React from 'react';

const TopBanner = () => {
  return (
    <div className="bg-[#E2EBE0] text-green-text text-[11px] font-medium py-1.5 px-4 text-center flex justify-center items-center gap-1.5 tracking-wide">
      <span>Crocheted with love. Made to keep forever.</span>
      <span className="inline-block w-1 h-1 rounded-full bg-green-text/30" />
      <span>Shipping within Germany</span>
    </div>
  );
};

export default TopBanner;