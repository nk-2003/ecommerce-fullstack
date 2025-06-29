import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";

const Navbar = ({
  toggleUserMenu,
  token,
  setShowLogin,
  searchTerm,
  setSearchTerm,
  cart,
  setShowCart, // ✅ NEW PROP
}) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div
        className="text-3xl font-bold text-white-400 tracking-wide cursor-pointer"
        onClick={() => window.location.href = "/"}
      >
        Retrofy
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-10 py-2 rounded-md bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-2 top-2.5 text-white-500" size={18} />
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
          onClick={token ? toggleUserMenu : () => setShowLogin(true)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
