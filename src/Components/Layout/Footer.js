import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-[#FAF8F5] py-8 px-6 sm:px-12 font-sans mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
        
        {/* Brand Logo */}
        <div className="text-base font-extrabold text-[#2B2B2B]">
          maschenblüte.
        </div>

        {/* Center Note */}
        <div>
          Made with love. Stitch by stitch.
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#contact" className="hover:text-black transition-colors">Contact & questions</a>
          <a href="#legal" className="hover:text-black transition-colors">Legal & privacy</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;