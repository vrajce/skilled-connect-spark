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
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import BecomeProvider from '@/pages/BecomeProvider';
import ProviderDashboard from '@/pages/provider/Dashboard';
import ProviderServices from '@/pages/provider/Services';
import ManageServices from '@/pages/provider/ManageServices';
import ManageBookings from '@/pages/provider/ManageBookings';
import AdminDashboard from '@/pages/admin/Dashboard';
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import { ProviderProvider } from "./contexts/ProviderContext";
import { ViewProvider } from "./contexts/ViewContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserBookings from '@/pages/user/UserBookings';
import ResetPassword from './pages/ResetPassword';

// Styles
import "@/index.css";
import "@/styles/home.css";

const queryClient = new QueryClient();

const App = () => {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProviderProvider>
            <ViewProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route element={<Layout />}>
                      <Route index element={<Index />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
                      <Route path="/providers" element={<ProtectedRoute><Providers /></ProtectedRoute>} />
                      <Route path="/providers/:id" element={<ProtectedRoute><ProviderDetail /></ProtectedRoute>} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/become-provider" element={<BecomeProvider />} />
                      <Route path="/bookings" element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
                      <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                      <Route path="/provider/services" element={<ProviderServices />} />
                      <Route path="/provider/manage-services" element={<ManageServices />} />
                      <Route path="/provider/bookings" element={<ManageBookings />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Route>
                    <Route path="auth" element={<Auth />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </TooltipProvider>
            </ViewProvider>
          </ProviderProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
