import React from 'react';
import { Bell, Search } from 'lucide-react';
import walidImage from '../assets/images/profile.jpg'; // Correct import

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3">
            <img
              src={walidImage} 
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">AKHI LMOBARMIJ</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
