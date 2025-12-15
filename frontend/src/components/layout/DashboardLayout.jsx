import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
      
    
      <div className="h-[10vh] sticky top-0 z-50">
        <Topbar />
      </div>

      
      <div className="flex h-[90vh]">
        
    
        <Sidebar />

        
        <main className="flex-1 p-6 ml-5 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
