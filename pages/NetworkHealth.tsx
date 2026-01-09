import React from 'react';
import { KPICard } from '../components/KPICard';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// --- Mock Data ---

// Health Matrix Data (State-wise status)
const healthMatrixData = [
  { state: 'Maharashtra', pc: 45, active: 120, inactive: 15, total: 135 },
  { state: 'Gujarat', pc: 32, active: 95, inactive: 8, total: 103 },
  { state: 'Karnataka', pc: 28, active: 80, inactive: 12, total: 92 },
  { state: 'Tamil Nadu', pc: 25, active: 70, inactive: 5, total: 75 },
  { state: 'Madhya Pradesh', pc: 30, active: 85, inactive: 10, total: 95 },
  { state: 'Rajasthan', pc: 20, active: 60, inactive: 20, total: 80 },
];

// Activity Trend (Total vs Active)
const activityTrendData = [
  { month: 'Jan', total: 500, active: 420 },
  { month: 'Feb', total: 510, active: 430 },
  { month: 'Mar', total: 515, active: 410 },
  { month: 'Apr', total: 520, active: 450 },
  { month: 'May', total: 530, active: 460 },
  { month: 'Jun', total: 540, active: 480 },
];

// Exception Report (Zero Enquiry Dealers)
const atRiskDealers = [
  { name: 'Jai Hind Motors', state: 'MH', tm: 'R. Sharma', daysInactive: 45, lastBill: '2023-10-15' },
  { name: 'Agro Tech Solutions', state: 'RJ', tm: 'A. Patel', daysInactive: 60, lastBill: '2023-09-20' },
  { name: 'Karnataka Farm Equip', state: 'KA', tm: 'K. Singh', daysInactive: 32, lastBill: '2023-10-28' },
  { name: 'Gujarat Tractors', state: 'GJ', tm: 'M. Shah', daysInactive: 90, lastBill: '2023-08-10' },
  { name: 'TN Power Tillers', state: 'TN', tm: 'S. Kumar', daysInactive: 35, lastBill: '2023-10-25' },
];

export const NetworkHealth: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* --- Top Row: KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Active Dealers" 
          value="480" 
          plan="500" 
          actual="480" 
          variance={-4.0} 
          trend="neutral" 
          source="SAP" 
        />
        <KPICard 
          title="PC Dealers Count" 
          value="180" 
          plan="175" 
          actual="180" 
          variance={2.8} 
          trend="up" 
          source="SAP" 
        />
        {/* Special styling for negative KPI */}
        <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1 h-full bg-red-100 group-hover:bg-red-500 transition-colors"></div>
           <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 font-heading">At-Risk (Zero Enq)</h3>
           <div className="flex items-end gap-2 mb-2">
             <span className="text-2xl font-bold text-gray-800">45</span>
             <div className="flex items-center text-xs font-semibold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                <AlertTriangle size={12} className="mr-1" /> Critical
             </div>
           </div>
           <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
             <div><span className="block text-gray-400 text-[10px]">PREV MONTH</span><span className="font-semibold">40</span></div>
             <div><span className="block text-gray-400 text-[10px]">VARIANCE</span><span className="font-semibold text-red-600">+12.5%</span></div>
           </div>
           <div className="absolute bottom-2 right-3 text-[10px] italic text-gray-300">Source: Vistaar</div>
        </div>

        <KPICard 
          title="New Activations (QTD)" 
          value="15" 
          plan="12" 
          actual="15" 
          variance={25.0} 
          trend="up" 
          source="SAP" 
        />
      </div>

      {/* --- Middle Row: Matrix & Trend --- */}
      <div className="flex flex-col lg:flex-row gap-6 h-[400px]">
        
        {/* Left: Health Matrix (60%) */}
        <div className="lg:w-3/5 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Dealer Health Matrix</h3>
              <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">
                Logic: Inactive > 90 Days
              </span>
           </div>
           <div className="flex-1 overflow-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 bg-gray-50 sticky top-0">
                 <tr>
                   <th className="px-4 py-3 font-medium">State</th>
                   <th className="px-4 py-3 font-medium text-center">PC Dealers</th>
                   <th className="px-4 py-3 font-medium text-center text-green-700">Active</th>
                   <th className="px-4 py-3 font-medium text-center text-red-600">Inactive</th>
                   <th className="px-4 py-3 font-medium text-center">Total Network</th>
                   <th className="px-4 py-3 font-medium text-center">Health %</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {healthMatrixData.map((row, idx) => {
                   const healthPercent = Math.round((row.active / row.total) * 100);
                   return (
                     <tr key={idx} className="hover:bg-gray-50 transition-colors">
                       <td className="px-4 py-3 font-medium text-gray-800">{row.state}</td>
                       <td className="px-4 py-3 text-center text-gray-600">{row.pc}</td>
                       <td className="px-4 py-3 text-center font-semibold text-green-700 bg-green-50/30">{row.active}</td>
                       <td className="px-4 py-3 text-center font-semibold text-red-600 bg-red-50/30">{row.inactive}</td>
                       <td className="px-4 py-3 text-center text-gray-800 font-bold">{row.total}</td>
                       <td className="px-4 py-3 text-center">
                         <span className={`px-2 py-1 rounded text-xs font-medium ${healthPercent > 85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                           {healthPercent}%
                         </span>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           </div>
        </div>

        {/* Right: Activity Trend (40%) */}
        <div className="lg:w-2/5 bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Network Activation Trend</h3>
              <div className="flex items-center space-x-3 text-xs">
                 <div className="flex items-center"><span className="w-3 h-3 bg-gray-300 mr-1 rounded-full"></span> Total</div>
                 <div className="flex items-center"><span className="w-3 h-3 bg-brand-dark mr-1 rounded-full"></span> Active</div>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={activityTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#134E4A" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#134E4A" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                   />
                   <Area type="monotone" dataKey="total" stroke="#cbd5e1" fill="transparent" strokeWidth={2} name="Total Network" dot={{ r: 3, fill: '#cbd5e1' }} />
                   <Area type="monotone" dataKey="active" stroke="#134E4A" fill="url(#colorActive)" strokeWidth={2} name="Active Dealers" dot={{ r: 3, fill: '#134E4A' }} />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: SAP Billing</div>
        </div>
      </div>

      {/* --- Bottom Row: Exception Report --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
         <div className="bg-red-50 px-4 py-3 border-b border-red-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={18} />
              <h3 className="text-sm font-bold text-red-900 uppercase tracking-wide font-heading">Exception Report: Zero Enquiry Dealers (Action Required)</h3>
            </div>
            <button className="text-xs bg-white border border-red-200 text-red-700 px-3 py-1 rounded hover:bg-red-50 transition-colors">
              Export List
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 bg-gray-50">
                <tr>
                   <th className="px-6 py-3 font-medium">Dealer Name</th>
                   <th className="px-6 py-3 font-medium">State</th>
                   <th className="px-6 py-3 font-medium">TM Name</th>
                   <th className="px-6 py-3 font-medium">Last Billing Date</th>
                   <th className="px-6 py-3 font-medium">Days Inactive</th>
                   <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {atRiskDealers.map((dealer, idx) => (
                  <tr key={idx} className="hover:bg-red-50/10 transition-colors group">
                     <td className="px-6 py-3 font-medium text-gray-800">{dealer.name}</td>
                     <td className="px-6 py-3 text-gray-600">{dealer.state}</td>
                     <td className="px-6 py-3 text-gray-600">{dealer.tm}</td>
                     <td className="px-6 py-3 text-gray-600 font-mono text-xs">{dealer.lastBill}</td>
                     <td className="px-6 py-3">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${dealer.daysInactive > 60 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                         {dealer.daysInactive} Days
                       </span>
                     </td>
                     <td className="px-6 py-3">
                        <button className="text-teal-700 hover:text-teal-900 text-xs font-semibold underline decoration-teal-700/30">
                          View Profile
                        </button>
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};