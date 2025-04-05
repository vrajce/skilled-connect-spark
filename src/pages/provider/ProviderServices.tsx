
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  EyeOff, 
  Check, 
  Star, 
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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

// Sample data for services
const services = [
  {
    id: 1,
    title: 'Electrical Wiring Installation',
    description: 'Complete wiring installation for homes and offices with safety compliance and quality materials.',
    price: '₹5,000 - ₹15,000',
    status: 'Active',
    bookings: 23,
    rating: 4.8,
    reviewCount: 17,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=300&h=200',
    category: 'Electrical'
  },
  {
    id: 2,
    title: 'Electrical Repairs',
    description: 'Quick and effective repairs for all electrical issues. Available for emergency services.',
    price: '₹800 - ₹2,500',
    status: 'Active',
    bookings: 45,
    rating: 4.9,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=300&h=200',
    category: 'Electrical'
  },
  {
    id: 3,
    title: 'Light Fixture Installation',
    description: 'Installation of various light fixtures including ceiling fans, chandeliers, and outdoor lighting.',
    price: '₹500 - ₹1,500 per fixture',
    status: 'Paused',
    bookings: 18,
    rating: 4.7,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dcdaa1?auto=format&fit=crop&q=80&w=300&h=200',
    category: 'Electrical'
  },
  {
    id: 4,
    title: 'Outlet & Switch Installation',
    description: 'Installation or replacement of electrical outlets, switches, and circuit breakers.',
    price: '₹300 - ₹800 per unit',
    status: 'Active',
    bookings: 37,
    rating: 4.6,
    reviewCount: 25,
    image: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80&w=300&h=200',
    category: 'Electrical'
  }
];

const ProviderServices = () => {
  return (
    <div className="pt-20 min-h-screen bg-background/50 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background">
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
              <h1 className="text-3xl font-bold">My <span className="text-gradient-primary">Services</span></h1>
              <p className="text-muted-foreground">Manage your service offerings and check performance</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto rounded-full bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>Create a new service offering for your clients</DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Service Title</label>
                    <Input id="title" placeholder="e.g. Electrical Wiring Installation" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea 
                      id="description" 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe your service in detail..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">Price Range</label>
                      <Input id="price" placeholder="e.g. ₹500 - ₹1,500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <Input id="category" placeholder="e.g. Electrical" />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => toast.error("Operation cancelled")}>Cancel</Button>
                  <Button onClick={() => toast.success("New service added successfully!")}>Add Service</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              placeholder="Search services..."
              className="w-full pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Paused</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full border-border/50 hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      service.status === 'Active' ? 'bg-green-500/10 text-green-600 border-green-200' :
                      'bg-amber-500/10 text-amber-600 border-amber-200'
                    }`}
                  >
                    {service.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Service
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <EyeOff className="h-4 w-4 mr-2" />
                          Pause Service
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Service
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{service.price}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Bookings</p>
                      <p className="font-medium">{service.bookings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                        <span className="ml-1 font-medium">{service.rating}</span>
                        <span className="ml-1 text-muted-foreground text-xs">({service.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderServices;
