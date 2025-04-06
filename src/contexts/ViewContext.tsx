import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface ViewContextType {
  isProviderView: boolean;
  toggleView: () => Promise<void>;
  isProvider: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [isProviderView, setIsProviderView] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if we're in provider view based on URL
  useEffect(() => {
    setIsProviderView(location.pathname.startsWith('/provider'));
  }, [location.pathname]);

  // Check provider status on mount and when user changes
  useEffect(() => {
    checkProviderStatus();
  }, [user]);

  const checkProviderStatus = async () => {
    if (!user) {
      setIsProvider(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('providers')
        .select('id, status')
        .eq('user_id', user.id)
        .single();

      setIsProvider(!!data && data.status === 'approved');
    } catch (error) {
      console.error('Error checking provider status:', error);
      setIsProvider(false);
    }
  };

  const toggleView = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!isProvider) {
      navigate('/become-provider');
      return;
    }

    try {
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('id, status')
        .eq('user_id', user.id)
        .single();

      if (providerError) throw providerError;
      
      if (providerData.status !== 'approved') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Your provider account is not approved yet.",
        });
        return;
      }

      // Navigate based on current view
      if (isProviderView) {
        navigate('/services');
      } else {
        navigate('/provider/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to switch view",
      });
    }
  };

  return (
    <ViewContext.Provider value={{ isProviderView, toggleView, isProvider }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
