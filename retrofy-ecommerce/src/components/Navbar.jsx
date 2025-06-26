import React from 'react';
import { ShoppingCart, User, PackageSearch, Search } from 'lucide-react';

const Navbar = ({ toggleUserMenu, token, setShowLogin }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-widest text-yellow-400">Retrofy</div>

      <div className="flex gap-6 items-center">
        <Search className="cursor-pointer hover:text-yellow-400" />
        <PackageSearch className="cursor-pointer hover:text-yellow-400" />
        <ShoppingCart className="cursor-pointer hover:text-yellow-400" />
        <User
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => {
            if (token) {
              toggleUserMenu();
            } else {
              setShowLogin(true);
            }
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
