import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { initGA, isGAReady } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  
  return null;
}

// Pages
import Home from "@/pages/Home";
import Agents from "@/pages/Agents";
import DashboardInfo from "@/pages/DashboardInfo";
import DashboardPreview from "@/pages/DashboardPreview";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import SignUp from "@/pages/SignUp";
import BrandKit from "@/pages/BrandKit";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";

// Dashboard Pages
import DashboardOverview from "@/pages/dashboard/Overview";
import DashboardApprovals from "@/pages/dashboard/Approvals";

function Router() {
  return (
    <div className="animate-in slide-in-from-top-4 duration-700 ease-out">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/agents" component={Agents} />
        <Route path="/dashboard-info" component={DashboardInfo} />
        <Route path="/dashboard-preview" component={DashboardPreview} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/signup" component={SignUp} />
        <Route path="/brand" component={BrandKit} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" component={DashboardOverview} />
        <Route path="/dashboard/approvals" component={DashboardApprovals} />
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

// Wrapper to handle layout logic
function RouterWithLayout() {
  const [location] = useLocation();
  const isAuthPage = location === '/dashboard-preview' || location === '/signup';
  const isDashboard = location.startsWith('/dashboard') && location !== '/dashboard-info' && location !== '/dashboard-preview';
  const hideMainLayout = isAuthPage || isDashboard;
  
  useAnalytics();

  return (
    <>
      <ScrollToTop />
      {!hideMainLayout && <Navbar />}
      <Router />
      {!hideMainLayout && <Footer />}
    </>
  );
}

function App() {
  const [gaReady, setGaReady] = useState(false);
  
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA().then(() => setGaReady(true));
    } else {
      setGaReady(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
          <RouterWithLayout />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
