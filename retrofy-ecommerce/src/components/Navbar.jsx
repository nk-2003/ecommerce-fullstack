import React from 'react';
import { ShoppingCart, User, PackageSearch, Search } from 'lucide-react';

const Navbar = ({ token, setShowLogin }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-3xl font-bold text-yellow-400 tracking-wide">
        Retrofy
      </div>

      <div className="flex items-center space-x-6 text-xl">
        <button className="hover:text-yellow-400 transition" title="Search"><Search /></button>
        <button className="hover:text-yellow-400 transition" title="Orders"><PackageSearch /></button>
        <button className="hover:text-yellow-400 transition" title="Cart"><ShoppingCart /></button>

        {token ? (
          <button className="hover:text-yellow-400 transition" title="User"><User /></button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition text-sm"
          >
            Login / Signup
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
