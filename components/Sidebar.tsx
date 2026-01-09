import React from 'react';
import { LayoutDashboard, Funnel, Network, Activity, Menu, ChevronLeft } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentPage, setPage }) => {
  const menuItems = [
    { id: Page.STRATEGIC_PULSE, icon: LayoutDashboard, label: 'Strategic Pulse' },
    { id: Page.PIPELINE_GROWTH, icon: Funnel, label: 'Sales Pipeline' },
    { id: Page.NETWORK_HEALTH, icon: Network, label: 'Network Health' },
    { id: Page.FIELD_EXECUTION, icon: Activity, label: 'Field Force' },
  ];

  return (
    <div 
      className={`bg-brand-dark text-white h-screen transition-all duration-300 flex flex-col shadow-xl sticky top-0 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-teal-800">
        {isOpen && <h1 className="font-bold text-xl tracking-wider text-brand-accent font-heading">EXE.DASH</h1>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1 hover:bg-teal-800 rounded transition-colors"
        >
          {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 space-y-2 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
              currentPage === item.id 
                ? 'bg-teal-800/50 text-brand-accent border-l-4 border-brand-accent' 
                : 'hover:bg-teal-900/50 text-gray-300'
            }`}
          >
            <item.icon size={24} className={currentPage === item.id ? 'text-brand-accent' : 'text-gray-400 group-hover:text-white'} />
            {isOpen && (
              <span className="ml-4 font-medium whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-teal-800 text-xs text-gray-400">
        {isOpen ? (
          <div>
            <p>System Status: <span className="text-green-400">Online</span></p>
            <p className="mt-1">Last Sync: 10:42 AM</p>
          </div>
        ) : (
          <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse"></div>
        )}
      </div>
    </div>
  );
};