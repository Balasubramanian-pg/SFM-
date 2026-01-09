import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StrategicPulse } from './pages/StrategicPulse';
import { PipelineGrowth } from './pages/PipelineGrowth';
import { NetworkHealth } from './pages/NetworkHealth';
import { FieldExecution } from './pages/FieldExecution';
import { Page } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.STRATEGIC_PULSE);

  const renderContent = () => {
    switch (currentPage) {
      case Page.STRATEGIC_PULSE:
        return <StrategicPulse />;
      case Page.PIPELINE_GROWTH:
        return <PipelineGrowth />;
      case Page.NETWORK_HEALTH:
        return <NetworkHealth />;
      case Page.FIELD_EXECUTION:
        return <FieldExecution />;
      default:
        return <StrategicPulse />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-end">
             <div>
                <h1 className="text-2xl font-bold text-gray-800 font-heading">{currentPage}</h1>
                <p className="text-sm text-gray-500 mt-1">Overview of key performance metrics and strategic insights.</p>
             </div>
             <div className="text-xs text-gray-400 italic">
               Last Updated: 15 mins ago
             </div>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;