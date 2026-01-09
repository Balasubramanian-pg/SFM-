import React from 'react';
import { KPICard } from '../components/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data
const billingData = [
  { state: 'MH', plan: 4000, actual: 4200 },
  { state: 'GJ', plan: 3000, actual: 2800 },
  { state: 'KA', plan: 2000, actual: 2100 },
  { state: 'TN', plan: 2780, actual: 2500 },
  { state: 'MP', plan: 1890, actual: 2000 },
  { state: 'RJ', plan: 2390, actual: 2300 },
  { state: 'UP', plan: 3490, actual: 3600 },
];

const tmData = [
  { metric: 'Enquiries', tm1: 45, tm2: 32, tm3: 55, tm4: 28, tm5: 41, total: 201 },
  { metric: 'Dealers Visited', tm1: 12, tm2: 10, tm3: 15, tm4: 8, tm5: 11, total: 56 },
  { metric: 'Villages Covered', tm1: 8, tm2: 6, tm3: 10, tm4: 5, tm5: 7, total: 36 },
  { metric: 'Hot Leads', tm1: 15, tm2: 8, tm3: 20, tm4: 7, tm5: 12, total: 62 },
  { metric: 'Delivered', tm1: 5, tm2: 3, tm3: 6, tm4: 2, tm5: 4, total: 20 },
];

const productionHeatmap = [
  { model: '16 HP', plan: 100, actual: 95 },
  { model: '20 HP', plan: 150, actual: 160 },
  { model: '25 HP', plan: 200, actual: 180 },
  { model: 'ES Model', plan: 80, actual: 40 },
  { model: 'Ultra', plan: 120, actual: 120 },
  { model: 'Max', plan: 90, actual: 95 },
  { model: 'Pro', plan: 60, actual: 45 },
  { model: 'Lite', plan: 40, actual: 30 },
];

// Helper for heatmap color
const getHeatmapColor = (plan: number, actual: number) => {
  const percent = (actual / plan) * 100;
  if (percent >= 100) return 'bg-green-500';
  if (percent >= 80) return 'bg-yellow-400';
  return 'bg-red-400';
};

export const StrategicPulse: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Row: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Billing" 
          value="4.2M" 
          plan="4.0M" 
          actual="4.2M" 
          variance={5.0} 
          trend="up" 
          isCurrency={true} 
          source="SAP" 
        />
        <KPICard 
          title="Total Production (Units)" 
          value="1,240" 
          plan="1,200" 
          actual="1,240" 
          variance={3.3} 
          trend="up" 
          source="SAP" 
        />
        <KPICard 
          title="Total Collections" 
          value="3.8M" 
          plan="3.9M" 
          actual="3.8M" 
          variance={-2.5} 
          trend="down" 
          isCurrency={true} 
          source="SAP" 
        />
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-heading">Target Achievement</h3>
             <span className="text-[10px] italic text-gray-300">Source: SAP</span>
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="relative w-24 h-24">
               {/* Simple SVG Gauge mockup */}
               <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="#134E4A"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    className="animate-[spin_1s_ease-out_reverse]"
                  />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-xl font-bold text-brand-dark">85%</span>
                 <span className="text-[10px] text-gray-400">Achieved</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Block 1: Metric Matrix */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide font-heading">Performance Matrix (Source: Vistaar)</h2>
            <div className="flex space-x-2 text-xs">
                <span className="px-2 py-1 bg-white border rounded text-gray-600">Daily</span>
                <span className="px-2 py-1 bg-brand-dark text-white rounded shadow-sm">MTD</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                <th className="px-4 py-3 font-bold border-b border-gray-200">Metric</th>
                <th colSpan={6} className="px-4 py-2 border-b border-r border-gray-300 text-center bg-gray-200 text-brand-dark font-heading">AS ON TODAY</th>
                <th colSpan={6} className="px-4 py-2 border-b border-gray-300 text-center bg-teal-50 text-brand-dark font-heading">MONTH TO DATE</th>
              </tr>
              <tr className="text-xs text-gray-500 border-b border-gray-200">
                <th className="px-4 py-2 bg-gray-50"></th>
                {/* As On Today Subheaders */}
                <th className="px-2 py-2">TM 1</th>
                <th className="px-2 py-2">TM 2</th>
                <th className="px-2 py-2">TM 3</th>
                <th className="px-2 py-2">TM 4</th>
                <th className="px-2 py-2">TM 5</th>
                <th className="px-2 py-2 font-bold text-gray-700 bg-gray-50 border-r border-gray-200">Total</th>
                
                 {/* MTD Subheaders */}
                <th className="px-2 py-2 bg-teal-50/30">TM 1</th>
                <th className="px-2 py-2 bg-teal-50/30">TM 2</th>
                <th className="px-2 py-2 bg-teal-50/30">TM 3</th>
                <th className="px-2 py-2 bg-teal-50/30">TM 4</th>
                <th className="px-2 py-2 bg-teal-50/30">TM 5</th>
                <th className="px-2 py-2 font-bold text-gray-700 bg-teal-100/50">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tmData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-700 bg-gray-50/50">{row.metric}</td>
                  
                  {/* Today Data (Simulated as random small numbers for mockup) */}
                  <td className="px-2 py-2 text-center text-gray-600">{Math.floor(row.tm1 / 10)}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{Math.floor(row.tm2 / 10)}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{Math.floor(row.tm3 / 10)}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{Math.floor(row.tm4 / 10)}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{Math.floor(row.tm5 / 10)}</td>
                  <td className="px-2 py-2 text-center font-bold text-gray-800 bg-gray-50 border-r border-gray-200">
                    {Math.floor(row.total / 10)}
                  </td>

                  {/* MTD Data (Actual data from mock) */}
                  <td className="px-2 py-2 text-center text-gray-600 bg-teal-50/10">{row.tm1}</td>
                  <td className="px-2 py-2 text-center text-gray-600 bg-teal-50/10">{row.tm2}</td>
                  <td className="px-2 py-2 text-center text-gray-600 bg-teal-50/10">{row.tm3}</td>
                  <td className="px-2 py-2 text-center text-gray-600 bg-teal-50/10">{row.tm4}</td>
                  <td className="px-2 py-2 text-center text-gray-600 bg-teal-50/10">{row.tm5}</td>
                  <td className="px-2 py-2 text-center font-bold text-brand-dark bg-teal-100/30">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Block 2: Bottom Row */}
      <div className="flex flex-col lg:flex-row gap-4 h-96">
        
        {/* Left: Statewise Billing (60%) */}
        <div className="lg:w-3/5 bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 font-heading">Billing Variance: State vs Plan</h3>
              <div className="flex items-center space-x-2">
                 <div className="flex items-center text-xs text-gray-500">
                    <span className="w-3 h-3 bg-brand-dark mr-1 rounded-sm"></span> Actual
                 </div>
                 <div className="flex items-center text-xs text-gray-500">
                    <span className="w-3 h-3 bg-gray-300 mr-1 rounded-sm"></span> Plan
                 </div>
              </div>
           </div>
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={billingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                 <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                 />
                 <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                 <Bar dataKey="plan" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Plan" />
                 <Bar dataKey="actual" fill="#134E4A" radius={[4, 4, 0, 0]} name="Actual" />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: SAP</div>
        </div>

        {/* Right: Production Heatmap (40%) */}
        <div className="lg:w-2/5 bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
            <h3 className="text-sm font-bold text-gray-700 mb-4 font-heading">Production Efficiency (Model-wise)</h3>
            <div className="flex-1 overflow-auto">
               <div className="grid grid-cols-2 gap-3">
                  {productionHeatmap.map((item, idx) => {
                     const achievement = Math.round((item.actual / item.plan) * 100);
                     const colorClass = getHeatmapColor(item.plan, item.actual);
                     
                     return (
                       <div key={idx} className="border border-gray-100 rounded p-3 flex flex-col justify-between hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                             <span className="font-semibold text-sm text-gray-700">{item.model}</span>
                             <span className={`text-[10px] px-1.5 py-0.5 rounded text-white font-medium ${colorClass}`}>
                                {achievement}%
                             </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                             <div>
                                <span className="block text-[9px] uppercase text-gray-400">Plan</span>
                                {item.plan}
                             </div>
                             <div className="text-right">
                                <span className="block text-[9px] uppercase text-gray-400">Actual</span>
                                <span className="font-medium text-gray-800">{item.actual}</span>
                             </div>
                          </div>
                          {/* Mini Progress Bar */}
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                             <div 
                               className={`h-full rounded-full ${colorClass}`} 
                               style={{ width: `${Math.min(achievement, 100)}%` }}
                             ></div>
                          </div>
                       </div>
                     )
                  })}
               </div>
            </div>
            <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: SAP Production Module</div>
        </div>
      </div>
    </div>
  );
};