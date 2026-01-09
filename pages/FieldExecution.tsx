import React from 'react';
import { KPICard } from '../components/KPICard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Activity } from 'lucide-react';

// --- Mock Data ---

// Activity Variance by State
const activityVarianceData = [
  { state: 'MH', plan: 500, actual: 450 },
  { state: 'GJ', plan: 400, actual: 420 }, // Overachieved
  { state: 'KA', plan: 350, actual: 300 },
  { state: 'TN', plan: 300, actual: 280 },
  { state: 'MP', plan: 250, actual: 260 },
  { state: 'RJ', plan: 200, actual: 180 },
];

// Field Force Manpower Trends
const manpowerTrendData = [
  { month: 'Jan', dsp: 120, cse: 45 },
  { month: 'Feb', dsp: 125, cse: 45 },
  { month: 'Mar', dsp: 122, cse: 44 },
  { month: 'Apr', dsp: 130, cse: 46 },
  { month: 'May', dsp: 135, cse: 48 },
  { month: 'Jun', dsp: 138, cse: 50 },
];

// Resource Efficiency Matrix (TM Level)
const efficiencyMatrix = [
  { tm: 'R. Sharma', state: 'MH', villages: 45, demos: 12, leads: 25, conversion: 'High' },
  { tm: 'A. Patel', state: 'GJ', villages: 52, demos: 15, leads: 30, conversion: 'High' },
  { tm: 'K. Singh', state: 'KA', villages: 38, demos: 8, leads: 18, conversion: 'Med' },
  { tm: 'M. Shah', state: 'MP', villages: 60, demos: 20, leads: 40, conversion: 'High' },
  { tm: 'S. Kumar', state: 'TN', villages: 42, demos: 10, leads: 22, conversion: 'Med' },
  { tm: 'V. Verma', state: 'RJ', villages: 35, demos: 7, leads: 15, conversion: 'Low' },
];

// Helper for status color
const getStatusColor = (status: string) => {
  switch(status) {
    case 'High': return 'bg-green-100 text-green-800';
    case 'Med': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const FieldExecution: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* --- Top Row: KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Activities/Demos"
          value="2,450"
          plan="2,200"
          actual="2,450"
          variance={11.3}
          trend="up"
          source="DMS"
        />
        <KPICard
          title="Field Presence Today"
          value="88%"
          plan="90%"
          actual="88%"
          variance={-2.2}
          trend="neutral"
          source="DMS Attendance"
        />
        <KPICard
          title="DSP Strength"
          value="138"
          plan="140"
          actual="138"
          variance={-1.4}
          trend="neutral"
          source="HRMS"
        />
        <KPICard
          title="CSE Strength"
          value="50"
          plan="48"
          actual="50"
          variance={4.1}
          trend="up"
          source="HRMS"
        />
      </div>

      {/* --- Middle Row: Charts --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        
        {/* Left: Activity Variance */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">State-wise Activity Variance</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-gray-200"></span> Plan
                <span className="w-2 h-2 rounded-full bg-brand-dark"></span> Actual
              </div>
           </div>
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={activityVarianceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
           <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: DMS (Activity Module)</div>
        </div>

        {/* Right: Manpower Trend */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Field Force Growth (DSP vs CSE)</h3>
           </div>
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={manpowerTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                 <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                 />
                 <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                 <Line type="monotone" dataKey="dsp" stroke="#134E4A" strokeWidth={3} name="DSP (Dealer Sales)" dot={{r:4}} />
                 <Line type="monotone" dataKey="cse" stroke="#2DD4BF" strokeWidth={3} name="CSE (Company Sales)" dot={{r:4}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: HRMS/Payroll</div>
        </div>
      </div>

      {/* --- Bottom Row: Resource Efficiency Matrix --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Resource Efficiency Matrix</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <Activity size={14} />
               <span>Metric: Performance per TM</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 font-medium">Territory Manager</th>
                <th className="px-6 py-3 font-medium">State</th>
                <th className="px-6 py-3 font-medium text-center">Villages Covered</th>
                <th className="px-6 py-3 font-medium text-center">Demos Conducted</th>
                <th className="px-6 py-3 font-medium text-center">Leads Generated</th>
                <th className="px-6 py-3 font-medium text-center">Productivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {efficiencyMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-800">{row.tm}</td>
                  <td className="px-6 py-3 text-gray-600">{row.state}</td>
                  <td className="px-6 py-3 text-center text-gray-600">{row.villages}</td>
                  <td className="px-6 py-3 text-center text-gray-600">{row.demos}</td>
                  <td className="px-6 py-3 text-center text-gray-600 font-medium text-teal-700">{row.leads}</td>
                  <td className="px-6 py-3 text-center">
                     <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(row.conversion)}`}>
                        {row.conversion}
                     </span>
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