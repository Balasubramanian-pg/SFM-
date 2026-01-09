import React from 'react';
import { Filter, Calendar, User, Layers, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-brand-dark">
        <Filter size={20} />
        <span className="font-semibold text-sm uppercase tracking-wide font-heading">Global Filters</span>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        {/* State Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <MapPin size={14} className="text-gray-400" />
          </div>
          <select className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none bg-gray-50 text-gray-700 w-32 md:w-40">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* TM Name Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <User size={14} className="text-gray-400" />
          </div>
          <select className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none bg-gray-50 text-gray-700 w-32 md:w-40">
            <option>All TMs</option>
            <option>R. Sharma</option>
            <option>A. Patel</option>
            <option>K. Singh</option>
          </select>
        </div>

        {/* Product Group Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Layers size={14} className="text-gray-400" />
          </div>
          <select className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none bg-gray-50 text-gray-700 w-32 md:w-40">
            <option>All Products</option>
            <option>Core</option>
            <option>Non-Core</option>
          </select>
        </div>

         {/* Date Filter */}
         <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Calendar size={14} className="text-gray-400" />
          </div>
          <select className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none bg-gray-50 text-gray-700 w-32 md:w-40">
            <option>MTD (Month)</option>
            <option>QTD (Quarter)</option>
            <option>YTD (Year)</option>
          </select>
        </div>
      </div>
    </header>
  );
};