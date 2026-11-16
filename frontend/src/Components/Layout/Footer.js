import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t border-gray-300 bg-cream py-8 px-6 sm:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
        
        {/* Brand Logo */}
        <div className="text-base font-extrabold text-[#2B2B2B]">
          KnitFlora
        </div>

        {/* Center Note */}
        <div>
          {t("footer.tagline")}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#contact" className="hover:text-black transition-colors">{t("footer.contact")}</a>
          <a href="#legal" className="hover:text-black transition-colors">{t("footer.legal")}</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;