import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Bell,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  CalendarCheck,
  CalendarX,
  CalendarClock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { useView } from '@/contexts/ViewContext';

interface Notification {
  id: number;
  created_at: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  booking_id: number;
}

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isProviderView } = useView();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      console.log('[NotificationDropdown] User authenticated:', user.id);
      loadNotifications();

      // Set up real-time subscription
      const channel = supabase.channel('notifications_channel');
      
      console.log('[NotificationDropdown] Setting up real-time subscription');
      const subscription = channel
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('[NotificationDropdown] Real-time update received:', payload);
            loadNotifications();
          }
        )
        .subscribe((status) => {
          console.log('[NotificationDropdown] Subscription status:', status);
        });

      return () => {
        console.log('[NotificationDropdown] Cleaning up subscription');
        subscription.unsubscribe();
      };
    } else {
      console.log('[NotificationDropdown] No user found');
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      if (!user) {
        console.log('[NotificationDropdown] Cannot load notifications - no user');
        return;
      }

      setLoading(true);
      setError(null);

      console.log('[NotificationDropdown] Loading notifications for user:', user.id);
      
      // Load notifications directly without the count check
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('[NotificationDropdown] Load error:', error);
        setError('Failed to load notifications');
        throw error;
      }

      console.log('[NotificationDropdown] Loaded notifications:', data);
      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read).length || 0);
    } catch (error) {
      console.error('[NotificationDropdown] Unexpected error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_booking':
        return <CalendarClock className="h-4 w-4 text-blue-500" />;
      case 'booking_accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'booking_rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'booking_completed':
        return <CalendarCheck className="h-4 w-4 text-amber-500" />;
      case 'status_update':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    // Navigate based on user type and notification type
    if (isProviderView) {
      navigate(`/provider/bookings`);
    } else {
      navigate(`/bookings`);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon">
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {error ? (
          <div className="text-center py-4 text-red-500">
            {error}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex items-start gap-2 p-3 cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="mt-1">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(notification.created_at), 'PPp')}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown; 