import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: number;
  created_at: string;
  user_id: string;
  provider_id: number;
  service_id: number;
  booking_date: string;
  preferred_time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  user_rating?: number;
  user_review?: string;
  user: {
    email: string;
  };
  service: {
    title: string;
    price: number;
  };
  total_amount: number;
}

const ManageBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    loadBookings();
    // Set up real-time subscription
    const subscription = supabase
      .channel('bookings_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings' 
        }, 
        () => {
          loadBookings();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      
      // Get provider ID first
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (providerError) throw providerError;
      if (!providerData) throw new Error('Provider not found');

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
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Transform bookings data
      const transformedBookings = bookingsData.map(booking => ({
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

      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load bookings"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: number, action: 'accepted' | 'rejected' | 'completed') => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ status: action })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${action === 'completed' ? 'marked as completed' : action}`,
      });

      loadBookings();
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update booking status",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['pending', 'accepted', 'completed', 'rejected'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid gap-4">
              {bookings
                .filter(booking => booking.status === tab)
                .map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{booking.service.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          User ID: {booking.user_id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {format(new Date(booking.booking_date), 'PPP')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Time: {booking.preferred_time}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          Amount: ₹{booking.total_amount}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          tab === 'pending' ? 'bg-amber-100 text-amber-800' :
                          tab === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          tab === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </span>
                        {tab === 'pending' && (
                          <div className="flex flex-col gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => handleBookingAction(booking.id, 'accepted')}
                              disabled={loading}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBookingAction(booking.id, 'rejected')}
                              disabled={loading}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {tab === 'accepted' && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => handleBookingAction(booking.id, 'completed')}
                            disabled={loading}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              {bookings.filter(booking => booking.status === tab).length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No {tab} bookings found
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageBookings; 