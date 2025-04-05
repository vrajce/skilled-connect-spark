
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  CalendarDays
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Sample booking data
const bookings = [
  {
    id: 1,
    customer: {
      name: 'Rahul Kumar',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      phone: '+91 98765 43210',
      email: 'rahul.kumar@example.com',
      address: '123 Main Street, Mumbai, Maharashtra'
    },
    service: 'Electrical Wiring Installation',
    date: '2025-04-06',
    time: '14:00 - 16:00',
    status: 'Confirmed',
    payment: '₹2,500',
    notes: 'Need to bring extra wiring materials. Client has requested installation in 3 rooms.'
  },
  {
    id: 2,
    customer: {
      name: 'Priya Sharma',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      phone: '+91 98765 43211',
      email: 'priya.sharma@example.com',
      address: '456 Park Avenue, Delhi, Delhi'
    },
    service: 'Outlet Repair',
    date: '2025-04-07',
    time: '10:00 - 11:00',
    status: 'Pending',
    payment: '₹800',
    notes: 'Client mentioned issues with 2 outlets in the kitchen area.'
  },
  {
    id: 3,
    customer: {
      name: 'Anil Patel',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      phone: '+91 98765 43212',
      email: 'anil.patel@example.com',
      address: '789 Lake View, Bangalore, Karnataka'
    },
    service: 'Fan Installation',
    date: '2025-04-07',
    time: '15:30 - 17:00',
    status: 'Completed',
    payment: '₹1,200',
    notes: 'Installation of 2 ceiling fans. Client already has necessary mounting hardware.'
  },
  {
    id: 4,
    customer: {
      name: 'Meena Gupta',
      image: 'https://randomuser.me/api/portraits/women/26.jpg',
      phone: '+91 98765 43213',
      email: 'meena.gupta@example.com',
      address: '567 Green Street, Chennai, Tamil Nadu'
    },
    service: 'Electrical Safety Inspection',
    date: '2025-04-08',
    time: '11:00 - 13:00',
    status: 'Confirmed',
    payment: '₹1,800',
    notes: 'Complete electrical inspection for a 2BHK apartment.'
  },
  {
    id: 5,
    customer: {
      name: 'Vikram Malhotra',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      phone: '+91 98765 43214',
      email: 'vikram.malhotra@example.com',
      address: '890 Hill Road, Pune, Maharashtra'
    },
    service: 'Circuit Breaker Replacement',
    date: '2025-04-09',
    time: '09:00 - 10:30',
    status: 'Pending',
    payment: '₹1,500',
    notes: 'Replacement of main circuit breaker panel.'
  }
];

const ProviderBookings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  const getBookingById = (id: number) => {
    return bookings.find(booking => booking.id === id);
  };

  const handleStatusChange = (status: string, bookingId: number) => {
    toast.success(`Booking status updated to ${status}`);
    // In a real app, you would update the booking status in your state/database here
  };

  const handleSendMessage = (bookingId: number) => {
    toast.success(`Message sent to ${getBookingById(bookingId)?.customer.name}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-background/50 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="container px-4 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My <span className="text-gradient-primary">Bookings</span></h1>
              <p className="text-muted-foreground">Manage all your upcoming and past service bookings</p>
            </div>
            
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal md:w-auto",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="default" className="bg-gradient-primary">
                Today's Bookings
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-8 flex flex-col sm:flex-row gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="w-full pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </motion.div>

        {/* Bookings Tabs and List */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 gap-4">
                {bookings
                  .filter(booking => ['Confirmed', 'Pending'].includes(booking.status))
                  .map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-1.5 ${
                              booking.status === 'Confirmed' ? 'bg-blue-500' :
                              booking.status === 'Pending' ? 'bg-amber-500' :
                              booking.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            
                            <div className="p-6 w-full flex flex-col md:flex-row gap-4">
                              {/* Booking Info */}
                              <div className="md:w-2/3">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={booking.customer.image} alt={booking.customer.name} />
                                    <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <h3 className="font-semibold">{booking.customer.name}</h3>
                                      <Badge variant={
                                        booking.status === 'Confirmed' ? 'outline' :
                                        booking.status === 'Pending' ? 'secondary' : 'default'
                                      } className={
                                        booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                        'bg-green-500/10 text-green-600 border-green-200'
                                      }>
                                        {booking.status}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-sm font-medium mt-1">{booking.service}</p>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.date}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.time}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.customer.address.split(',')[0]}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                      <p className="text-xs text-muted-foreground">{booking.notes}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="md:w-1/3 flex flex-col justify-between border-t pt-4 md:border-t-0 md:border-l md:pl-4 md:pt-0">
                                <div>
                                  <p className="text-sm font-medium">Payment</p>
                                  <p className="text-lg font-semibold">{booking.payment}</p>
                                </div>
                                
                                <div className="flex flex-col gap-2 mt-4">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full justify-start"
                                        onClick={() => setSelectedBooking(booking.id)}
                                      >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Contact Client
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Contact Client</DialogTitle>
                                        <DialogDescription>
                                          Reach out to your client for this booking
                                        </DialogDescription>
                                      </DialogHeader>
                                      
                                      {selectedBooking && (
                                        <div className="py-4">
                                          <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-12 w-12">
                                              <AvatarImage src={getBookingById(selectedBooking)?.customer.image} />
                                              <AvatarFallback>{getBookingById(selectedBooking)?.customer.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <h3 className="font-semibold">{getBookingById(selectedBooking)?.customer.name}</h3>
                                              <p className="text-sm text-muted-foreground">{getBookingById(selectedBooking)?.service}</p>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-3 bg-muted/30 p-4 rounded-md mb-4">
                                            <div className="flex items-start">
                                              <Phone className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                                              <div>
                                                <p className="font-medium">{getBookingById(selectedBooking)?.customer.phone}</p>
                                                <p className="text-xs text-muted-foreground">Tap to call</p>
                                              </div>
                                            </div>
                                            <div className="flex items-start">
                                              <Mail className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                                              <div>
                                                <p className="font-medium">{getBookingById(selectedBooking)?.customer.email}</p>
                                                <p className="text-xs text-muted-foreground">Send email</p>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-3">
                                            <label htmlFor="message" className="text-sm font-medium">
                                              Quick Message
                                            </label>
                                            <textarea 
                                              id="message" 
                                              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                              placeholder="Type your message here..."
                                            />
                                          </div>
                                        </div>
                                      )}
                                      
                                      <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button onClick={() => handleSendMessage(selectedBooking || 0)}>Send Message</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  {booking.status === 'Pending' && (
                                    <Button 
                                      variant="default" 
                                      size="sm" 
                                      className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                                      onClick={() => handleStatusChange('Confirmed', booking.id)}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Confirm Booking
                                    </Button>
                                  )}
                                  
                                  {booking.status === 'Confirmed' && (
                                    <Button 
                                      variant="default" 
                                      size="sm" 
                                      className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() => handleStatusChange('Completed', booking.id)}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Mark as Completed
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleStatusChange('Cancelled', booking.id)}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Booking
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 gap-4">
                {bookings
                  .filter(booking => booking.status === 'Completed')
                  .map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        {/* Similar card content as above, but for completed bookings */}
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1.5 bg-green-500"></div>
                            
                            <div className="p-6 w-full flex flex-col md:flex-row gap-4">
                              {/* Booking Info */}
                              <div className="md:w-2/3">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={booking.customer.image} alt={booking.customer.name} />
                                    <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <h3 className="font-semibold">{booking.customer.name}</h3>
                                      <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                        {booking.status}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-sm font-medium mt-1">{booking.service}</p>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.date}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="md:w-1/3 flex flex-col justify-between border-t pt-4 md:border-t-0 md:border-l md:pl-4 md:pt-0">
                                <div>
                                  <p className="text-sm font-medium">Payment</p>
                                  <p className="text-lg font-semibold">{booking.payment}</p>
                                </div>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full justify-start mt-4"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      {/* Similar card content as above, but for all bookings */}
                      <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-1.5 ${
                              booking.status === 'Confirmed' ? 'bg-blue-500' :
                              booking.status === 'Pending' ? 'bg-amber-500' :
                              booking.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            
                            <div className="p-6 w-full flex flex-col md:flex-row gap-4">
                              {/* Booking Info */}
                              <div className="md:w-2/3">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={booking.customer.image} alt={booking.customer.name} />
                                    <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <h3 className="font-semibold">{booking.customer.name}</h3>
                                      <Badge variant={
                                        booking.status === 'Confirmed' ? 'outline' :
                                        booking.status === 'Pending' ? 'secondary' : 'default'
                                      } className={
                                        booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                        'bg-green-500/10 text-green-600 border-green-200'
                                      }>
                                        {booking.status}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-sm font-medium mt-1">{booking.service}</p>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.date}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-3.5 w-3.5 mr-1" />
                                        <span>{booking.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="md:w-1/3 flex flex-col justify-between border-t pt-4 md:border-t-0 md:border-l md:pl-4 md:pt-0">
                                <div>
                                  <p className="text-sm font-medium">Payment</p>
                                  <p className="text-lg font-semibold">{booking.payment}</p>
                                </div>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full justify-start mt-4"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderBookings;
