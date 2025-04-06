import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { checkTimeSlotAvailability, createBooking, TimeSlot } from '@/lib/bookings';
import { format } from 'date-fns';

interface BookingFormProps {
  providerId: number;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
}

export function BookingForm({
  providerId,
  serviceId,
  serviceName,
  servicePrice,
  serviceDuration
}: BookingFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) {
      loadTimeSlots();
    }
  }, [date]);

  const loadTimeSlots = async () => {
    if (!date) return;
    
    try {
      setLoading(true);
      const slots = await checkTimeSlotAvailability(
        providerId,
        serviceId,
        format(date, 'yyyy-MM-dd')
      );
      setTimeSlots(slots);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load available time slots"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to book a service"
      });
      return;
    }

    if (!date || !selectedSlot) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date and time slot"
      });
      return;
    }

    try {
      setLoading(true);
      await createBooking(
        providerId,
        serviceId,
        format(date, 'yyyy-MM-dd'),
        selectedSlot.start_time,
        selectedSlot.end_time
      );

      toast({
        title: "Success",
        description: "Booking request sent successfully. The provider will review your request."
      });

      // Reset form
      setSelectedSlot(null);
      loadTimeSlots();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create booking"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Book {serviceName}</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Calendar */}
          <div>
            <h3 className="text-lg font-medium mb-4">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-medium mb-4">Select Time</h3>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className={`w-full ${
                      !slot.is_available ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => slot.is_available && setSelectedSlot(slot)}
                    disabled={!slot.is_available}
                  >
                    {slot.start_time} - {slot.end_time}
                    {!slot.is_available && " (Booked)"}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSlot && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <h3 className="text-lg font-medium mb-2">Booking Summary</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Service:</span> {serviceName}</p>
              <p><span className="font-medium">Date:</span> {format(date!, 'MMMM d, yyyy')}</p>
              <p><span className="font-medium">Time:</span> {selectedSlot.start_time} - {selectedSlot.end_time}</p>
              <p><span className="font-medium">Duration:</span> {serviceDuration}</p>
              <p><span className="font-medium">Price:</span> ${servicePrice}</p>
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Processing..." : "Request Booking"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 