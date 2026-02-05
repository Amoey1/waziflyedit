import { useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  const getPageTitle = () => {
    if (location.includes("/dashboard/approvals")) return "Approvals";
    if (location.includes("/dashboard/agents")) return "Agents";
    if (location.includes("/dashboard/logs")) return "Logs";
    if (location.includes("/dashboard/settings")) return "Settings";
    if (location.includes("/dashboard/profile")) return "Profile";
    return "Overview";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader 
          title={getPageTitle()} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
