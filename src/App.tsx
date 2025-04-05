
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Providers from "./pages/Providers";
import ProviderDetail from "./pages/ProviderDetail";
import HowItWorks from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderServices from "./pages/provider/ProviderServices";
import ProviderBookings from "./pages/provider/ProviderBookings";
import ProviderProfile from "./pages/provider/ProviderProfile";
import ProviderSettings from "./pages/provider/ProviderSettings";

// Import Framer Motion (need to add this dependency)
import "@/index.css";

const queryClient = new QueryClient();

const App = () => {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Authentication Routes (outside main layout) */}
              <Route path="/login" element={<Auth />} />
              
              {/* Main Layout Routes */}
              <Route element={<Layout />}>
                {/* Client Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:category/:id" element={<ServiceDetail />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="/providers/:id" element={<ProviderDetail />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                
                {/* Provider Routes */}
                <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                <Route path="/provider/services" element={<ProviderServices />} />
                <Route path="/provider/bookings" element={<ProviderBookings />} />
                <Route path="/provider/profile" element={<ProviderProfile />} />
                <Route path="/provider/settings" element={<ProviderSettings />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
