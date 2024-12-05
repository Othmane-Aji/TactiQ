import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, Activity, Calendar, BarChart2, FileText, 
  Settings, LogOut, BrainCircuit 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Users, label: 'Players', path: '/players' },
    { icon: Activity, label: 'Performances', path: '/performances' },
    { icon: Calendar, label: 'Matches', path: '/matches' },
    { icon: BarChart2, label: 'Statistics', path: '/statistics' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-emerald-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <BrainCircuit className="w-6 h-6" />
        <h1 className="text-xl font-bold">TactiQ</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-700 text-white'
                  : 'hover:bg-emerald-700/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-700/50 mt-auto absolute bottom-4 w-[calc(100%-2rem)]">
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;
