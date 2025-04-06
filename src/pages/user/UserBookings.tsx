import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import RatingModal from '@/components/ratings/RatingModal';

interface Booking {
  id: number;
  created_at: string;
  booking_date: string;
  preferred_time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  total_amount: number;
  service: {
    title: string;
    price: number;
  };
  provider: {
    id: number;
    business_name: string;
    category: string;
  };
  is_rated?: boolean;
}

const UserBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    loadBookings();

    // Set up real-time subscription for booking updates
    const subscription = supabase
      .channel('bookings_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings',
          filter: `user_id=eq.${user?.id}`
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
    if (!user) return;

    try {
      setLoading(true);
      
      // First get the bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          service:provider_services!service_id(*),
          provider:providers!provider_id(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Bookings Error:', bookingsError);
        throw bookingsError;
      }

      // Transform the data to match the Booking interface
      const transformedBookings: Booking[] = bookingsData?.map(booking => ({
        id: booking.id,
        created_at: booking.created_at,
        booking_date: booking.booking_date,
        preferred_time: booking.preferred_time,
        status: booking.status,
        total_amount: booking.total_amount,
        is_rated: booking.is_rated,
        service: {
          title: booking.service.title,
          price: booking.service.price
        },
        provider: {
          id: booking.provider.id,
          business_name: booking.provider.business_name,
          category: booking.provider.category
        }
      })) || [];

      setBookings(transformedBookings);

      // Check for newly completed bookings that need rating
      const newlyCompleted = transformedBookings.find(booking => 
        booking.status === 'completed' && !booking.is_rated
      );

      if (newlyCompleted) {
        setSelectedBooking(newlyCompleted);
        setShowRatingModal(true);
      }

    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your bookings"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (rating: number, review: string) => {
    if (!selectedBooking || !user) return;

    try {
      // Add the review first - this will trigger the rating update
      const { error: reviewError } = await supabase
        .from('provider_reviews')
        .insert({
          provider_id: selectedBooking.provider.id,
          user_id: user.id,
          booking_id: selectedBooking.id,
          rating,
          review: review || null
        });

      if (reviewError) throw reviewError;

      // Mark the booking as rated
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ is_rated: true })
        .eq('id', selectedBooking.id);

      if (bookingError) throw bookingError;

      toast({
        title: "Thank you for your feedback!",
        description: "Your rating has been submitted successfully."
      });

      // Refresh bookings to update the UI
      loadBookings();

    } catch (error: any) {
      console.error('Error submitting rating:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit rating. Please try again."
      });
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-amber-100 text-amber-800';
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
    <>
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'accepted', 'completed', 'rejected'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid gap-4">
                {bookings
                  .filter(booking => tab === 'all' || booking.status === tab)
                  .map((booking) => (
                    <Card key={booking.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{booking.service.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Provider: {booking.provider.business_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Category: {booking.provider.category}
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
                        <div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadgeStyle(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                {bookings.filter(booking => tab === 'all' || booking.status === tab).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No {tab === 'all' ? '' : tab} bookings found
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedBooking && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedBooking(null);
          }}
          onSubmit={handleRatingSubmit}
          providerName={selectedBooking.provider.business_name}
          serviceName={selectedBooking.service.title}
        />
      )}
    </>
  );
};

export default UserBookings; 