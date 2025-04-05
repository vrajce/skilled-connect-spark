import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Provider = Database['public']['Tables']['providers']['Row'];
type ProviderService = Database['public']['Tables']['provider_services']['Row'];

interface ProviderContextType {
  isProvider: boolean;
  provider: Provider | null;
  services: ProviderService[];
  loading: boolean;
  error: string | null;
  refreshProvider: () => Promise<void>;
  refreshServices: () => Promise<void>;
  createService: (service: Omit<ProviderService, 'id' | 'created_at' | 'provider_id'>) => Promise<void>;
  updateService: (id: number, service: Partial<ProviderService>) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
  getStats: () => Promise<{
    totalBookings: number;
    totalEarnings: number;
    totalClients: number;
    averageRating: number;
  }>;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export function ProviderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isProvider, setIsProvider] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<ProviderService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProvider = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setProvider(data);
      setIsProvider(!!data && data.status === 'approved');
    } catch (error: any) {
      console.error('Error fetching provider:', error);
      setError(error.message);
    }
  };

  const refreshServices = async () => {
    try {
      if (!provider) return;

      const { data, error } = await supabase
        .from('provider_services')
        .select('*')
        .eq('provider_id', provider.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setServices(data || []);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      setError(error.message);
    }
  };

  const createService = async (service: Omit<ProviderService, 'id' | 'created_at' | 'provider_id'>) => {
    try {
      if (!provider) throw new Error('Provider not found');

      const { error } = await supabase
        .from('provider_services')
        .insert([{ ...service, provider_id: provider.id }]);

      if (error) throw error;

      await refreshServices();
    } catch (error: any) {
      console.error('Error creating service:', error);
      throw error;
    }
  };

  const updateService = async (id: number, service: Partial<ProviderService>) => {
    try {
      const { error } = await supabase
        .from('provider_services')
        .update(service)
        .eq('id', id);

      if (error) throw error;

      await refreshServices();
    } catch (error: any) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (id: number) => {
    try {
      const { error } = await supabase
        .from('provider_services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await refreshServices();
    } catch (error: any) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  const getStats = async () => {
    try {
      if (!provider) throw new Error('Provider not found');

      // Get total bookings and earnings from provider record
      const totalBookings = provider.total_bookings || 0;
      const totalEarnings = provider.total_earnings || 0;

      // Get unique clients count
      const { data: clientsData, error: clientsError } = await supabase
        .from('bookings')
        .select('user_id')
        .eq('provider_id', provider.id)
        .not('status', 'eq', 'cancelled');

      if (clientsError) throw clientsError;

      const uniqueClients = new Set(clientsData.map(booking => booking.user_id));
      const totalClients = uniqueClients.size;

      return {
        totalBookings,
        totalEarnings,
        totalClients,
        averageRating: provider.rating || 0,
      };
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      refreshProvider().finally(() => setLoading(false));
    } else {
      setIsProvider(false);
      setProvider(null);
      setServices([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (provider) {
      refreshServices();
    }
  }, [provider]);

  const value = {
    isProvider,
    provider,
    services,
    loading,
    error,
    refreshProvider,
    refreshServices,
    createService,
    updateService,
    deleteService,
    getStats,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error('useProvider must be used within a ProviderProvider');
  }
  return context;
}
