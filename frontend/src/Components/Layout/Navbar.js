import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  LogOut,
  Package,
  UserCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import CartDrawer from "../Build/CartDrawer";
import { useTranslation } from "react-i18next";

const Navbar = ({ selectedFlowers = {}, onUpdateCount }) => {
  const { t, i18n } = useTranslation();
  const isGerman = i18n.language?.startsWith("de");

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(isGerman ? "en" : "de");
  };

  // Calculate total items for badge counter
  const totalCartCount = Object.values(selectedFlowers).reduce(
    (acc, qty) => acc + (Number(qty) || 0),
    0,
  );

  // Check login state on mount and handle clicks outside to close dropdown
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="w-full font-sans">
        {/* Main Navigation Bar */}
        <nav className="bg-cream border-b border-gray-300 px-6 sm:px-12 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#2B2B2B]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
              <path d="M6 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
              <path d="M18 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
              <path d="M12 14a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
              <circle cx="12" cy="10" r="2" fill="currentColor" />
            </svg>
            <Link
              to="/"
              className="font-heading text-xl font-extrabold tracking-tight text-[#2B2B2B]"
            >
              KnitFlora
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4A4A]">
            <Link to="/shop" className="hover:text-black transition-colors">
              {t("nav.shop", "Shop bouquets")}
            </Link>
            <Link to="/build" className="hover:text-black transition-colors">
              {t("nav.build", "Build a bouquet")}
            </Link>
            <Link
              to="/HowItWorks"
              className="hover:text-black transition-colors"
            >
              {t("nav.how_it_works", "How it works")}
            </Link>
          </div>

          {/* Right Utility Bar */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="bg-[#EFECE6] text-[#2B2B2B] text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label="Switch language"
            >
              <span
                className={
                  !isGerman ? "font-extrabold underline" : "opacity-60"
                }
              >
                EN
              </span>
              {" / "}
              <span
                className={isGerman ? "font-extrabold underline" : "opacity-60"}
              >
                DE
              </span>
            </button>

            {/* Action Icons */}
            <button
              className="text-[#2B2B2B] hover:text-black transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            <button
              className="text-[#2B2B2B] hover:text-black transition-colors p-1"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* User Account Menu / Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
                className="text-[#2B2B2B] hover:text-black transition-colors p-1 flex items-center focus:outline-none"
                aria-label="Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Dropdown Menu when Logged In */}
              {user && dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                    <p className="text-xs text-gray-500 font-medium">
                      {t("nav.signed_in_as", "Signed in as")}
                    </p>
                    <p className="text-sm font-bold text-[#2B2B2B] truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-purple-700" />
                      <span>{t("nav.profile", "Profile & Address")}</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors"
                    >
                      <Package className="w-4 h-4 text-purple-700" />
                      <span>{t("nav.dashboard", "Dashboard & Orders")}</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 my-1"></div>

                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t("nav.logout", "Log Out")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon with Counter Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#6C5389] hover:opacity-80 transition-opacity p-1"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6C5389] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-Out Cart Drawer */}
      {/* <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={selectedFlowers}
        onUpdateCount={onUpdateCount}
      /> */}
    </>
  );
};

export default Navbar;
