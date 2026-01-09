import React from 'react';
import { KPICard } from '../components/KPICard';
import { 
  ResponsiveContainer, 
  FunnelChart, 
  Funnel, 
  LabelList, 
  Tooltip, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Legend, 
  Bar,
  Cell
} from 'recharts';

// --- Mock Data ---

// Funnel Data: Enquiry -> Delivered
const funnelData = [
  { value: 2500, name: 'Enquiries', fill: '#134E4A' }, // Darkest Green
  { value: 1200, name: 'Hot Leads', fill: '#0F766E' },
  { value: 850, name: 'Bookings', fill: '#0D9488' },
  { value: 600, name: 'Retail', fill: '#14B8A6' },
  { value: 420, name: 'Delivered', fill: '#2DD4BF' }, // Lightest Teal
];

// Weekly Demand Trend (Stacked by State)
const weeklyTrendData = [
  { week: 'Wk 1', MH: 120, GJ: 80, KA: 50, TN: 40, MP: 30 },
  { week: 'Wk 2', MH: 132, GJ: 85, KA: 55, TN: 45, MP: 35 },
  { week: 'Wk 3', MH: 101, GJ: 70, KA: 45, TN: 35, MP: 25 },
  { week: 'Wk 4', MH: 145, GJ: 95, KA: 60, TN: 50, MP: 40 },
];

// Network Expansion: LOI vs DC (Dealer Code)
const expansionData = [
  { state: 'Maharashtra', LOI: 25, DC: 12 },
  { state: 'Gujarat', LOI: 18, DC: 8 },
  { state: 'Karnataka', LOI: 15, DC: 5 },
  { state: 'Tamil Nadu', LOI: 12, DC: 4 },
  { state: 'Madhya Pradesh', LOI: 20, DC: 10 },
  { state: 'Rajasthan', LOI: 10, DC: 2 },
];

// Custom Tooltip for Funnel
const CustomFunnelTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
        <p className="font-bold text-brand-dark">{payload[0].payload.name}</p>
        <p className="text-gray-600">Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const PipelineGrowth: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* --- Top Row: KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Enquiry-to-Delivery %" 
          value="16.8%" 
          plan="15.0%" 
          actual="16.8%" 
          variance={12.0} 
          trend="up" 
          source="Vistaar" 
        />
        <KPICard 
          title="NDA - LOI Count" 
          value="100" 
          plan="110" 
          actual="100" 
          variance={-9.1} 
          trend="down" 
          source="SAP Network" 
        />
        <KPICard 
          title="NDA - DC Count" 
          value="41" 
          plan="45" 
          actual="41" 
          variance={-8.8} 
          trend="neutral" 
          source="SAP Network" 
        />
        <KPICard 
          title="Hot Leads (MTD)" 
          value="1,200" 
          plan="1,000" 
          actual="1,200" 
          variance={20.0} 
          trend="up" 
          source="Vistaar" 
        />
      </div>

      {/* --- Middle Row: Funnel & Weekly Trends --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
        
        {/* Left: Funnel Chart (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
           <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Conversion Funnel</h3>
              <div className="text-[10px] bg-teal-50 text-brand-dark px-2 py-1 rounded border border-teal-100">
                Conversion: <strong>16.8%</strong>
              </div>
           </div>
           <p className="text-xs text-gray-400 mb-4">Drop-off analysis from Enquiry to Delivery</p>
           
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <FunnelChart>
                 <Tooltip content={<CustomFunnelTooltip />} />
                 <Funnel
                   dataKey="value"
                   data={funnelData}
                   isAnimationActive
                   labelLine={false}
                 >
                   <LabelList position="right" fill="#666" stroke="none" dataKey="name" fontSize={11} fontWeight="bold" />
                   <LabelList position="center" fill="#fff" stroke="none" dataKey="value" fontSize={12} />
                 </Funnel>
               </FunnelChart>
             </ResponsiveContainer>
           </div>
           <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: Vistaar (Lead Mgmt)</div>
        </div>

        {/* Right: Weekly Demand Trend (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Weekly Demand Trend</h3>
              <span className="text-xs text-gray-500">State-wise Contribution</span>
           </div>
           
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={weeklyTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                 <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                 />
                 <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
                 
                 {/* Stacked Bars for Top 5 States */}
                 <Bar dataKey="MH" stackId="a" fill="#134E4A" name="MH" />
                 <Bar dataKey="GJ" stackId="a" fill="#0D9488" name="GJ" />
                 <Bar dataKey="KA" stackId="a" fill="#2DD4BF" name="KA" />
                 <Bar dataKey="TN" stackId="a" fill="#5EEAD4" name="TN" />
                 <Bar dataKey="MP" stackId="a" fill="#99F6E4" name="MP" />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: Vistaar</div>
        </div>
      </div>

      {/* --- Bottom Row: Growth Distribution --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-80 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide font-heading">Network Expansion: Pipeline vs Converted</h3>
            <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 bg-gray-300 mr-2 rounded-sm"></span> LOI (Pipeline)</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-brand-dark mr-2 rounded-sm"></span> DC (Generated)</div>
            </div>
          </div>

          <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={expansionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={30}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                 <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                 />
                 <Bar dataKey="LOI" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="LOI (Letter of Intent)" />
                 <Bar dataKey="DC" fill="#134E4A" radius={[4, 4, 0, 0]} name="DC (Dealer Code)" />
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="text-right mt-2 text-[10px] italic text-gray-400">Source: SAP (Network Module)</div>
      </div>

    </div>
  );
};