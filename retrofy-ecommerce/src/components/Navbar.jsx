import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";

const Navbar = ({
  toggleUserMenu,
  token,
  setShowLogin,
  searchTerm,
  setSearchTerm,
  cart,
  setShowCart,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-3xl font-bold text-yellow-400 tracking-wide cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Retrofy
        </div>

        {/* Hamburger Menu Icon (Mobile Only) */}
        <div className="md:hidden">
          {menuOpen ? (
            <X size={28} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={28} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>

        {/* Desktop Icons (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 rounded-md bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-2 top-2.5 text-gray-600" size={18} />
          </div>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              if (token) setShowCart(true);
              else setShowLogin(true);
            }}
          >
            <ShoppingCart size={24} />
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* User Icon */}
          <User
            size={24}
            className="cursor-pointer"
            onClick={() => {
              if (token) toggleUserMenu();
              else setShowLogin(true);
            }}
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 rounded-md bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-2 top-2.5 text-gray-600" size={18} />
          </div>

          {/* Cart */}
          <div
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (token) setShowCart(true);
              else setShowLogin(true);
              setMenuOpen(false); // close mobile menu
            }}
          >
            <ShoppingCart size={24} />
            <span>Cart</span>
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* User */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (token) toggleUserMenu();
              else setShowLogin(true);
              setMenuOpen(false); // close mobile menu
            }}
          >
            <User size={24} />
            <span>{token ? "Account" : "Login"}</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
