
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Calendar, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Users,
  Briefcase,
  CheckCircle2,
  Bell,
  Plus
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Sample data
const recentBookings = [
  {
    id: 1,
    customer: 'Rahul Kumar',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    service: 'Electrical Wiring Installation',
    date: 'Today, 2:00 PM',
    status: 'Confirmed',
    payment: '₹2,500'
  },
  {
    id: 2,
    customer: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    service: 'Outlet Repair',
    date: 'Tomorrow, 10:00 AM',
    status: 'Pending',
    payment: '₹800'
  },
  {
    id: 3,
    customer: 'Anil Patel',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    service: 'Fan Installation',
    date: 'Jan 21, 3:30 PM',
    status: 'Completed',
    payment: '₹1,200'
  }
];

const ProviderDashboard = () => {
  // This would be fetched from API in a real implementation
  const providerData = {
    name: 'Vikram Singh',
    profession: 'Electrical Contractor',
    rating: 4.7,
    profileCompletion: 85,
    totalEarnings: '₹45,250',
    bookingsCompleted: 43,
    newRequests: 5,
    upcomingBookings: 3
  };

  return (
    <div className="pt-20 min-h-screen bg-background/50 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, <span className="text-gradient-primary">{providerData.name}</span></h1>
              <p className="text-muted-foreground">Here's what's happening with your services today</p>
            </div>
            <Button className="w-full md:w-auto rounded-full bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-white bg-opacity-70 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                    <h3 className="text-2xl font-bold mt-1">{providerData.totalEarnings}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+12%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-white bg-opacity-70 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Jobs</p>
                    <h3 className="text-2xl font-bold mt-1">{providerData.bookingsCompleted}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+8%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-white bg-opacity-70 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Requests</p>
                    <h3 className="text-2xl font-bold mt-1">{providerData.newRequests}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Button variant="link" className="h-auto p-0 text-xs text-blue-500">View all requests</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-white bg-opacity-70 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
                    <h3 className="text-2xl font-bold mt-1">{providerData.upcomingBookings}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Button variant="link" className="h-auto p-0 text-xs text-amber-500">View schedule</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Recent Bookings */}
            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
                  <CardDescription>Your latest bookings and their status</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">Customer</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">Service</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-muted/50 transition-colors border-b border-border/50 last:border-none">
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={booking.image} alt={booking.customer} />
                                  <AvatarFallback>{booking.customer[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{booking.customer}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-sm">{booking.service}</td>
                            <td className="py-3 px-6 text-sm">{booking.date}</td>
                            <td className="py-3 px-6">
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
                            </td>
                            <td className="py-3 px-6 text-sm font-medium">{booking.payment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/40 bg-muted/10 py-3">
                  <Link to="/provider/bookings">
                    <Button variant="ghost" size="sm">View All Bookings</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Performance Overview */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Performance Overview</CardTitle>
                  <CardDescription>Your service metrics and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="metrics">
                    <TabsList className="mb-4">
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="metrics">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Response Rate</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">On-time Arrival</span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Customer Satisfaction</span>
                            <span className="text-sm font-medium">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Rebooking Rate</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="border-b border-border/30 last:border-0 pb-4 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={`https://randomuser.me/api/portraits/${review % 2 ? 'women' : 'men'}/${20 + review}.jpg`} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">Customer {review}</span>
                              </div>
                              <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < 5-review+5 ? 'fill-current' : ''}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review === 1 ? 
                                "Very professional service. Arrived on time and did a great job fixing our electrical issues." :
                                review === 2 ?
                                "Good service, fixed our problem quickly. Would hire again." :
                                "Excellent work, very knowledgeable and friendly. Highly recommended!"
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Profile Summary */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white bg-opacity-80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 border-4 border-background mb-4">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                      <AvatarFallback>VS</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{providerData.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{providerData.profession}</p>
                    
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="ml-1 font-medium">{providerData.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">(52 reviews)</span>
                    </div>
                    
                    <div className="w-full mb-4">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Profile Completion</span>
                        <span>{providerData.profileCompletion}%</span>
                      </div>
                      <Progress value={providerData.profileCompletion} className="h-1.5" />
                    </div>
                    
                    <Link to="/provider/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-muted-foreground text-xs">Response Time</p>
                      <p className="font-medium">~2 hours</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Jobs Completed</p>
                      <p className="font-medium">43</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Today's Schedule */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="min-w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Electrical Wiring Installation</p>
                        <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                        <p className="text-xs mt-1">Rahul Kumar • <span className="text-blue-600">Confirmed</span></p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start">
                      <div className="min-w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Client Consultation</p>
                        <p className="text-xs text-muted-foreground">5:30 PM - 6:00 PM</p>
                        <p className="text-xs mt-1">Meena Gupta • <span className="text-green-600">Online</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/40 bg-muted/10 py-3">
                  <Link to="/provider/bookings">
                    <Button variant="ghost" size="sm">View Full Schedule</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 grid gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Clients
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Availability
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Client List
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
