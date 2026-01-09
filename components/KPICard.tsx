import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPIProps } from '../types';

export const KPICard: React.FC<KPIProps> = ({ title, value, plan, actual, variance, trend, source, isCurrency }) => {
  const isPositive = variance >= 0;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-1 h-full bg-gray-100 group-hover:bg-brand-accent transition-colors"></div>
      
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 font-heading">{title}</h3>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold text-brand-dark">
          {isCurrency ? '$' : ''}{value}
        </span>
        
        <div className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend === 'up' && <TrendingUp size={12} className="mr-1" />}
          {trend === 'down' && <TrendingDown size={12} className="mr-1" />}
          {trend === 'neutral' && <Minus size={12} className="mr-1" />}
          {Math.abs(variance)}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
        <div>
          <span className="block text-gray-400 text-[10px]">PLAN</span>
          <span className="font-semibold">{plan}</span>
        </div>
        <div>
          <span className="block text-gray-400 text-[10px]">ACTUAL</span>
          <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{actual}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] italic text-gray-300 group-hover:text-gray-400 transition-colors">
        Source: {source}
      </div>
    </div>
  );
};