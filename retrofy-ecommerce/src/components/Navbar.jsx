import React from 'react';
import { ShoppingCart, User, PackageSearch, Search } from 'lucide-react';

const Navbar = ({ toggleUserMenu, token, setShowLogin }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold text-yellow-400 tracking-wide">
        Retrofy
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6 text-xl">
        <button
          className="hover:text-yellow-400 transition"
          title="Search"
        >
          <Search />
        </button>

        <button
          className="hover:text-yellow-400 transition"
          title="Orders"
        >
          <PackageSearch />
        </button>

        <button
          className="hover:text-yellow-400 transition"
          title="Cart"
        >
          <ShoppingCart />
        </button>

        <button
          className="hover:text-yellow-400 transition"
          title="User"
          onClick={() => {
            if (token) {
              toggleUserMenu();
            } else {
              setShowLogin(true);
            }
          }}
        >
          <User />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
