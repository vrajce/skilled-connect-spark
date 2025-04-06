import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, DollarSign, Star, Users, TrendingUp, Settings, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProviderData {
  id: number;
  status: string;
  rating: number;
  total_ratings: number;
  total_bookings: number;
  total_earnings: number;
  business_name: string;
  category: string;
  experience: number;
  description: string;
  location: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface Booking {
  id: number;
  created_at: string;
  booking_date: string;
  preferred_time: string;
  status: string;
  total_amount: number;
  user_id: string;
  users?: {
    email: string;
    raw_user_meta_data?: {
      full_name?: string;
    };
  };
  user: {
    email: string;
    user_metadata: {
      full_name?: string;
    };
  };
  service: {
    name: string;
    price: number;
  };
}

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalEarnings: 0,
    totalClients: 0,
    averageRating: 0,
  });
  const [services, setServices] = useState<Service[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get provider data
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select(`
          id,
          status,
          rating,
          total_ratings,
          total_bookings,
          total_earnings,
          business_name,
          category,
          experience,
          description,
          location
        `)
        .eq('user_id', user.id)
        .single();

      if (providerError) {
        console.error('Provider error:', providerError);
        throw providerError;
      }
      
      if (!providerData) {
        console.log('No provider data found');
        navigate('/become-provider');
        return;
      }

      console.log('Provider data:', providerData);
      setProviderData(providerData);

      // Get services data
      const { data: servicesData, error: servicesError } = await supabase
        .from('provider_services')
        .select('*')
        .eq('provider_id', providerData.id)
        .order('created_at', { ascending: false });

      if (servicesError) {
        console.error('Services error:', servicesError);
        throw servicesError;
      }

      console.log('Services data:', servicesData);
      setServices(servicesData || []);

      // Get bookings with service information
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          booking_date,
          preferred_time,
          status,
          total_amount,
          user_id,
          service:provider_services!bookings_service_id_fkey (
            title,
            price
          )
        `)
        .eq('provider_id', providerData.id)
        .eq('status', 'accepted')
        .order('booking_date', { ascending: false })
        .limit(5);

      if (bookingsError) {
        console.error('Bookings error:', bookingsError);
        throw bookingsError;
      }

      // Transform bookings data
      const transformedBookings = (bookingsData || []).map(booking => ({
        ...booking,
        service: {
          name: booking.service?.title || 'Unknown Service',
          price: booking.service?.price || 0
        },
        user: {
          email: `User ${booking.user_id.slice(0, 8)}`,
          user_metadata: {
            full_name: null
          }
        }
      }));

      setRecentBookings(transformedBookings);

      // Calculate stats with actual bookings count
      const totalBookings = bookingsData?.length || 0;
      const totalEarnings = transformedBookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);
      const uniqueClients = new Set(transformedBookings.map(booking => booking.user_id)).size;
      const averageRating = providerData.rating || 0;

      setStats({
        totalBookings,
        totalEarnings,
        totalClients: uniqueClients,
        averageRating,
      });

    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Clock className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!providerData) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold mb-4">Provider Dashboard</h1>
        <p>You are not registered as a provider. Please complete your provider registration first.</p>
        <Button asChild className="mt-4">
          <Link to="/become-provider">Become a Provider</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{providerData.business_name}</h1>
          <p className="text-muted-foreground mt-1">
            {providerData.category} • {providerData.location}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Status: <span className={`capitalize font-medium ${providerData.status === 'approved' ? 'text-green-600' : 'text-amber-600'}`}>
              {providerData.status}
            </span>
          </p>
        </div>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link to="/provider/services">
              <Edit className="h-4 w-4 mr-2" />
              Manage Services
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              </div>
              <Calendar className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold">₹{stats.totalEarnings}</h3>
              </div>
              <DollarSign className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <h3 className="text-2xl font-bold">{stats.totalClients}</h3>
              </div>
              <Users className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <h3 className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</h3>
              </div>
              <Star className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest service bookings</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/provider/bookings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{booking.user?.user_metadata?.full_name || booking.user?.email}</p>
                      <p className="text-sm text-muted-foreground">{booking.service?.name}</p>
                      <p className="text-sm text-muted-foreground">₹{booking.total_amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(booking.booking_date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{booking.preferred_time}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        booking.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No bookings yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Your Services */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Services</CardTitle>
              <CardDescription>Services you offer</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/provider/services">Manage</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length > 0 ? (
                services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">₹{service.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{service.duration} mins</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">No services added yet</p>
                  <Button asChild>
                    <Link to="/provider/services">Add Service</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;
