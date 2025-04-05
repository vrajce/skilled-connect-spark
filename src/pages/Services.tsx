
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Sliders, 
  Filter,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
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

// Sample data for service categories
const categories = [
  { id: 1, name: 'Plumbing', icon: '/assets/icons/plumbing.svg', color: 'bg-blue-500' },
  { id: 2, name: 'Electrical', icon: '/assets/icons/electrical.svg', color: 'bg-yellow-500' },
  { id: 3, name: 'Mehendi', icon: '/assets/icons/mehendi.svg', color: 'bg-red-500' },
  { id: 4, name: 'Carpentry', icon: '/assets/icons/carpentry.svg', color: 'bg-amber-600' },
  { id: 5, name: 'Cleaning', icon: '/assets/icons/cleaning.svg', color: 'bg-green-500' },
  { id: 6, name: 'Tailoring', icon: '/assets/icons/tailoring.svg', color: 'bg-purple-500' },
  { id: 7, name: 'Photography', icon: '/assets/icons/photography.svg', color: 'bg-pink-500' },
  { id: 8, name: 'Catering', icon: '/assets/icons/catering.svg', color: 'bg-orange-500' },
];

// Sample data for services
const services = [
  {
    id: 1,
    title: 'Pipe Repair & Installation',
    category: 'Plumbing',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4d9aa3faeb?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 4.8,
    reviewCount: 127,
    price: '₹500/hr',
    description: 'Professional pipe repair, replacement and installation services for residential and commercial properties.',
    providerName: 'Rahul Sharma',
    providerImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Mumbai',
    distance: '3.2 km',
    availability: 'Available today',
    verified: true
  },
  {
    id: 2,
    title: 'Bridal Mehendi Design',
    category: 'Mehendi',
    image: 'https://images.unsplash.com/photo-1600101628594-b7ea1f023024?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 5.0,
    reviewCount: 89,
    price: '₹2,500+',
    description: 'Beautiful and intricate bridal mehendi designs with traditional and modern patterns.',
    providerName: 'Priya Patel',
    providerImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Delhi',
    distance: '5.7 km',
    availability: 'Available tomorrow',
    verified: true
  },
  {
    id: 3,
    title: 'Electrical Wiring & Repair',
    category: 'Electrical',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 4.7,
    reviewCount: 65,
    price: '₹600/hr',
    description: 'Complete electrical services including wiring, repairs, installations and troubleshooting.',
    providerName: 'Amit Kumar',
    providerImage: 'https://randomuser.me/api/portraits/men/42.jpg',
    location: 'Bangalore',
    distance: '1.8 km',
    availability: 'Available today',
    verified: true
  },
  {
    id: 4,
    title: 'Custom Furniture Making',
    category: 'Carpentry',
    image: 'https://images.unsplash.com/photo-1550965002-5eb3f7440950?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 4.9,
    reviewCount: 52,
    price: 'From ₹5,000',
    description: 'Customized furniture design and creation with quality wood and craftsmanship.',
    providerName: 'Vikram Singh',
    providerImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    location: 'Hyderabad',
    distance: '4.5 km',
    availability: 'Available in 2 days',
    verified: true
  },
  {
    id: 5,
    title: 'Deep Home Cleaning',
    category: 'Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 4.6,
    reviewCount: 78,
    price: 'From ₹1,200',
    description: 'Thorough home cleaning services including dusting, mopping, bathroom and kitchen cleaning.',
    providerName: 'Meena Gupta',
    providerImage: 'https://randomuser.me/api/portraits/women/26.jpg',
    location: 'Chennai',
    distance: '2.9 km',
    availability: 'Available today',
    verified: false
  },
  {
    id: 6,
    title: 'Custom Tailoring & Alterations',
    category: 'Tailoring',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500&h=350',
    rating: 4.8,
    reviewCount: 103,
    price: 'Varies',
    description: 'Professional tailoring services including custom garment creation, alterations and repairs.',
    providerName: 'Ananya Mehta',
    providerImage: 'https://randomuser.me/api/portraits/women/29.jpg',
    location: 'Pune',
    distance: '3.7 km',
    availability: 'Available tomorrow',
    verified: true
  },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  // Filter services based on search query, category, etc.
  const filteredServices = services.filter((service) => {
    // Filter by search query
    if (
      searchQuery &&
      !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }

    // Filter by verified providers
    if (filterVerified && !service.verified) {
      return false;
    }

    // Filter by availability
    if (filterAvailability && !service.availability.includes('today')) {
      return false;
    }

    return true;
  });

  // Sort filtered services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0; // recommended
    }
  });

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 pt-20 pb-10">
        <div className="container px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              variants={fadeInUp}
            >
              Find <span className="text-gradient-primary">Professional Services</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mb-8 md:text-lg"
              variants={fadeInUp}
            >
              Browse and book skilled professionals for all your service needs
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-3"
              variants={fadeInUp}
            >
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for services..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[180px] h-12">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
                      <Filter className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filter Services</SheetTitle>
                      <SheetDescription>
                        Refine your search with these filters
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="py-6 space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.id}`} 
                                checked={selectedCategory === category.name}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCategory(category.name);
                                  } else if (selectedCategory === category.name) {
                                    setSelectedCategory('all');
                                  }
                                }}
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Price Range</h3>
                        <div className="space-y-5">
                          <Slider
                            defaultValue={[500, 5000]}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="py-4"
                          />
                          <div className="flex items-center justify-between">
                            <p className="text-sm">₹{priceRange[0]}</p>
                            <p className="text-sm">₹{priceRange[1]}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="verified" 
                            checked={filterVerified}
                            onCheckedChange={(checked) => {
                              if (typeof checked === 'boolean') setFilterVerified(checked);
                            }}
                          />
                          <label
                            htmlFor="verified"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Verified Providers Only
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="available-today" 
                            checked={filterAvailability}
                            onCheckedChange={(checked) => {
                              if (typeof checked === 'boolean') setFilterAvailability(checked);
                            }}
                          />
                          <label
                            htmlFor="available-today"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Available Today
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <SheetFooter className="flex flex-row gap-3 sm:justify-between">
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                          Reset
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-12 h-12 md:w-[180px] md:px-3">
                    <SelectValue placeholder="Sort" />
                    <ArrowUpDown className="h-4 w-4 md:hidden" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Nearest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 bg-background border-y border-border/40">
        <div className="container px-4">
          <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="rounded-full shrink-0"
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                className={cn(
                  "rounded-full shrink-0 flex items-center gap-2",
                )}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full",
                  category.color
                )}></div>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          {/* Showing results count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{sortedServices.length}</span> results
              {selectedCategory !== 'all' ? ` for "${selectedCategory}"` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
            
            {(selectedCategory !== 'all' || searchQuery || filterVerified || filterAvailability) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setFilterVerified(false);
                  setFilterAvailability(false);
                  setPriceRange([500, 5000]);
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Clear filters
              </Button>
            )}
          </div>

          {sortedServices.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any services matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setFilterVerified(false);
                  setFilterAvailability(false);
                  setPriceRange([500, 5000]);
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {sortedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={`/services/${service.category.toLowerCase()}/${service.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-all duration-300 border-border/40">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className={`rounded-full ${service.category === 'Plumbing' ? 'bg-blue-500' : 
                                                          service.category === 'Electrical' ? 'bg-yellow-500' : 
                                                          service.category === 'Mehendi' ? 'bg-red-500' : 
                                                          service.category === 'Carpentry' ? 'bg-amber-600' :
                                                          service.category === 'Cleaning' ? 'bg-green-500' :
                                                          'bg-purple-500'} text-white border-none`}>
                            {service.category}
                          </Badge>
                        </div>
                        {service.verified && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge variant="outline" className="bg-white/80 text-green-600 border-green-200">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 z-10">
                          <Badge variant="secondary" className="font-medium text-foreground">
                            {service.price}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>
                          <div className="flex items-center text-amber-500 ml-2 shrink-0">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-foreground font-medium">{service.rating}</span>
                            <span className="ml-1 text-xs text-muted-foreground">({service.reviewCount})</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{service.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className={service.availability.includes('today') ? 'text-green-600' : ''}>
                              {service.availability}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0 border-t border-border/40 mt-2 flex items-center">
                        <div className="flex items-center">
                          <img
                            src={service.providerImage}
                            alt={service.providerName}
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <span className="text-sm font-medium">{service.providerName}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I book a service?</AccordionTrigger>
                <AccordionContent>
                  Booking a service is simple. Browse our categories or search for the service you need, select a provider based on reviews and ratings, choose your preferred date and time, and confirm your booking. You'll receive instant confirmation and can track your booking status in your account.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How are service providers verified?</AccordionTrigger>
                <AccordionContent>
                  We verify all service providers through a rigorous process that includes identity verification, skill assessment, background checks, and customer reviews. Providers with a "Verified" badge have successfully completed our verification process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  We accept multiple payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and you'll only be charged after the service is completed to your satisfaction.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I reschedule or cancel my booking?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can reschedule or cancel your booking through your account. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee. Refer to our cancellation policy for more details.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I become a service provider?</AccordionTrigger>
                <AccordionContent>
                  To become a service provider on SkilledConnect, click on "Become a Provider" in the navigation menu. Complete your profile with your skills, experience, and availability. Our team will review your application and guide you through the verification process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Couldn't Find What You Were Looking For?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact our support team or post a specific service request
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
                Post a Service Request
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
