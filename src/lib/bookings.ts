import { supabase } from './supabase';

export interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export async function checkTimeSlotAvailability(
  providerId: number,
  serviceId: number,
  date: string
): Promise<TimeSlot[]> {
  try {
    // Get service duration
    const { data: service, error: serviceError } = await supabase
      .from('provider_services')
      .select('duration')
      .eq('id', serviceId)
      .single();

    if (serviceError) throw serviceError;

    // Generate time slots based on service duration
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const durationMinutes = parseInt(service.duration);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += durationMinutes) {
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + durationMinutes);

        if (endTime.getHours() >= endHour) continue;

        const startTimeStr = startTime.toTimeString().slice(0, 5);
        const endTimeStr = endTime.toTimeString().slice(0, 5);
        const timeSlotStr = `${startTimeStr} - ${endTimeStr}`;

        // Check if slot is already booked
        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .select('id')
          .eq('provider_id', providerId)
          .eq('service_id', serviceId)
          .eq('booking_date', date)
          .eq('preferred_time', timeSlotStr)
          .eq('status', 'pending')
          .single();

        if (bookingError && bookingError.code !== 'PGRST116') {
          throw bookingError;
        }

        slots.push({
          start_time: startTimeStr,
          end_time: endTimeStr,
          is_available: !booking
        });
      }
    }

    return slots;
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    throw error;
  }
}

export async function createBooking(
  providerId: number,
  serviceId: number,
  date: string,
  startTime: string,
  endTime: string
) {
  try {
    const timeSlotStr = `${startTime} - ${endTime}`;
    
    // Check if slot is still available
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('id')
      .eq('provider_id', providerId)
      .eq('service_id', serviceId)
      .eq('booking_date', date)
      .eq('preferred_time', timeSlotStr)
      .eq('status', 'pending')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingBooking) {
      throw new Error('This time slot is no longer available');
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    // Create the booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: user.id,
          provider_id: providerId,
          service_id: serviceId,
          booking_date: date,
          preferred_time: timeSlotStr,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (bookingError) throw bookingError;

    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
} 