
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
  Clock,
  Briefcase,
  MessageCircle,
  ChevronRight
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
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

// Sample data for providers
const providers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    specialty: 'Electrician',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    reviewCount: 127,
    location: 'Mumbai',
    distance: '3.2 km',
    experience: '8 years',
    services: ['Wiring Installation', 'Electrical Repairs', 'Home Automation'],
    price: '₹500/hr',
    availability: 'Available today',
    verified: true,
    bio: 'Professional electrician with expertise in residential and commercial electrical work.'
  },
  {
    id: 2,
    name: 'Priya Patel',
    specialty: 'Mehendi Artist',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5.0,
    reviewCount: 89,
    location: 'Delhi',
    distance: '5.7 km',
    experience: '7 years',
    services: ['Bridal Mehendi', 'Arabic Designs', 'Traditional Patterns'],
    price: 'From ₹2,500',
    availability: 'Available tomorrow',
    verified: true,
    bio: 'Specialized in bridal mehendi with unique designs that blend traditional and contemporary styles.'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    specialty: 'Plumber',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.7,
    reviewCount: 65,
    location: 'Bangalore',
    distance: '1.8 km',
    experience: '10 years',
    services: ['Pipe Repairs', 'Drain Cleaning', 'Fixture Installation'],
    price: '₹600/hr',
    availability: 'Available today',
    verified: true,
    bio: 'Expert plumber with decade of experience in handling all types of plumbing issues.'
  },
  {
    id: 4,
    name: 'Ananya Mehta',
    specialty: 'Tailor',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    rating: 4.8,
    reviewCount: 103,
    location: 'Hyderabad',
    distance: '4.5 km',
    experience: '12 years',
    services: ['Custom Clothing', 'Alterations', 'Bridal Wear'],
    price: 'Varies',
    availability: 'Available in 2 days',
    verified: true,
    bio: 'Creative tailor specializing in customized clothing and alterations with attention to detail.'
  },
  {
    id: 5,
    name: 'Arjun Kumar',
    specialty: 'Carpenter',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 4.6,
    reviewCount: 78,
    location: 'Chennai',
    distance: '2.9 km',
    experience: '15 years',
    services: ['Furniture Making', 'Repairs', 'Custom Woodwork'],
    price: 'From ₹700/hr',
    availability: 'Available today',
    verified: false,
    bio: 'Skilled carpenter creating beautiful, functional furniture and offering quality repairs.'
  },
  {
    id: 6,
    name: 'Meena Gupta',
    specialty: 'House Cleaner',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    rating: 4.8,
    reviewCount: 91,
    location: 'Pune',
    distance: '3.7 km',
    experience: '5 years',
    services: ['Deep Cleaning', 'Regular Maintenance', 'Move-in/out Cleaning'],
    price: 'From ₹1,200',
    availability: 'Available tomorrow',
    verified: true,
    bio: 'Thorough and detail-oriented cleaner providing exceptional home cleaning services.'
  },
];

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0, 15]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  // Filter providers based on search query, category, etc.
  const filteredProviders = providers.filter((provider) => {
    // Filter by search query
    if (
      searchQuery &&
      !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.services.some(service => 
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== 'all' && provider.specialty !== selectedCategory) {
      return false;
    }

    // Filter by experience
    const experience = parseInt(provider.experience);
    if (experience < experienceRange[0] || experience > experienceRange[1]) {
      return false;
    }

    // Filter by verified providers
    if (filterVerified && !provider.verified) {
      return false;
    }

    // Filter by availability
    if (filterAvailability && !provider.availability.includes('today')) {
      return false;
    }

    return true;
  });

  // Sort filtered providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience-high':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'experience-low':
        return parseInt(a.experience) - parseInt(b.experience);
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
              Find <span className="text-gradient-primary">Skilled Professionals</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mb-8 md:text-lg"
              variants={fadeInUp}
            >
              Connect with verified service providers in your area
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-3"
              variants={fadeInUp}
            >
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for service providers..."
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
                      <SheetTitle>Filter Providers</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect service provider
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
                        <h3 className="text-sm font-medium mb-3">Experience (Years)</h3>
                        <div className="space-y-5">
                          <Slider
                            defaultValue={[0, 15]}
                            max={20}
                            step={1}
                            value={experienceRange}
                            onValueChange={setExperienceRange}
                            className="py-4"
                          />
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{experienceRange[0]} years</p>
                            <p className="text-sm">{experienceRange[1]} years</p>
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
                        <Button variant="outline" className="w-full" onClick={() => {
                          setSelectedCategory('all');
                          setExperienceRange([0, 15]);
                          setFilterVerified(false);
                          setFilterAvailability(false);
                        }}>
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
                    <SelectItem value="experience-high">Most Experienced</SelectItem>
                    <SelectItem value="experience-low">Newly Joined</SelectItem>
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

      {/* Providers Grid */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          {/* Showing results count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{sortedProviders.length}</span> providers
              {selectedCategory !== 'all' ? ` in "${selectedCategory}"` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          {sortedProviders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No providers found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any service providers matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setFilterVerified(false);
                  setFilterAvailability(false);
                  setExperienceRange([0, 15]);
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
              {sortedProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/providers/${provider.id}`}>
                    <Card className="h-full hover:shadow-md transition-all duration-300 border-border/40 hover:border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border-2 border-primary/10">
                            <AvatarImage src={provider.image} alt={provider.name} />
                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {provider.name}
                                </h3>
                                <p className="text-muted-foreground text-sm">{provider.specialty}</p>
                              </div>
                              
                              {provider.verified && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center mt-2 text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-foreground font-medium">{provider.rating}</span>
                              <span className="ml-1 text-xs text-muted-foreground">({provider.reviewCount})</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{provider.distance}</span>
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="h-3 w-3 mr-1" />
                                <span>{provider.experience}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span className={provider.availability.includes('today') ? 'text-green-600' : ''}>
                                  {provider.availability}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {provider.bio}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {provider.services.map((service, idx) => (
                              <Badge key={idx} variant="secondary" className="font-normal">
                                {service}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{provider.price}</span>
                            <span className="text-primary text-sm group-hover:translate-x-1 transition-transform flex items-center">
                              View Profile
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Are You a <span className="text-gradient-primary">Skilled Professional?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our network of skilled professionals and grow your business. Get connected with customers looking for your services.
            </p>
            
            <Link to="/become-provider">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Providers;
