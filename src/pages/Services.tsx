import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Star,
  Calendar,
  MapPin,
  IndianRupee,
  Clock,
  Filter,
  Wrench,
  Zap,
  Flower2,
  Hammer,
  Sparkles,
  Scissors,
  Camera,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const categories = [
  { id: 1, name: 'Plumbing', icon: 'Wrench', color: '#2563eb' },
  { id: 2, name: 'Electrical', icon: 'Zap', color: '#dc2626' },
  { id: 3, name: 'Mehendi', icon: 'Flower2', color: '#16a34a' },
  { id: 4, name: 'Carpentry', icon: 'Hammer', color: '#ca8a04' },
  { id: 5, name: 'Cleaning', icon: 'Sparkles', color: '#0891b2' },
  { id: 6, name: 'Tailoring', icon: 'Scissors', color: '#9333ea' },
  { id: 7, name: 'Photography', icon: 'Camera', color: '#be185d' },
  { id: 8, name: 'Catering', icon: 'UtensilsCrossed', color: '#ea580c' }
];

interface Service {
  id: number;
  created_at: string;
  updated_at: string;
  provider_id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  provider: {
    id: number;
    business_name: string;
    location: string;
    status: string;
    rating: number;
    total_bookings: number;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  Wrench: <Wrench />,
  Zap: <Zap />,
  Flower2: <Flower2 />,
  Hammer: <Hammer />,
  Sparkles: <Sparkles />,
  Scissors: <Scissors />,
  Camera: <Camera />,
  UtensilsCrossed: <UtensilsCrossed />,
};

const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [currentProviderId, setCurrentProviderId] = useState<number | null>(null);

  // Define loadServices first since it's used by checkProviderStatus
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Loading services, currentProviderId:', currentProviderId);
      let query = supabase
        .from('provider_services')
        .select(`
          *,
          provider:providers(
            id,
            business_name,
            location,
            status,
            rating,
            total_bookings
          )
        `)
        .eq('providers.status', 'approved');

      // If user is a provider, exclude their own services
      if (currentProviderId) {
        console.log('Excluding provider ID from services:', currentProviderId);
        query = query.neq('provider_id', currentProviderId);
      }

      const { data, error } = await query;

      if (error) throw error;
      console.log('Loaded services:', data?.length || 0);
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  }, [currentProviderId]);

  // Define checkProviderStatus after loadServices
  const checkProviderStatus = useCallback(async () => {
    try {
      console.log('Checking provider status for user:', user?.id);
      const { data, error } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        console.log('User is a provider with ID:', data.id);
        setCurrentProviderId(data.id);
      } else {
        console.log('User is not a provider');
      }
      
      // Load services after checking provider status
      loadServices();
    } catch (error) {
      console.error('Error checking provider status:', error);
      // Still load services even if provider check fails
      loadServices();
    }
  }, [user, loadServices]);

  // Initial load effect
  useEffect(() => {
    if (user) {
      checkProviderStatus();
    } else {
      loadServices();
    }
  }, [user, checkProviderStatus, loadServices]);

  // Reload services when currentProviderId changes
  useEffect(() => {
    if (currentProviderId !== null) {
      loadServices();
    }
  }, [currentProviderId, loadServices]);

  const filteredServices = services
    .filter(service => 
      // Search filter
      (service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.provider.business_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Category filter
      (selectedCategory === 'all' || service.category === selectedCategory) &&
      // Price filter
      service.price >= priceRange[0] && service.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return (b.provider.rating || 0) - (a.provider.rating || 0);
        default:
          return (b.provider.total_bookings || 0) - (a.provider.total_bookings || 0);
      }
    });

  // Group services by category
  const groupedServices = filteredServices.reduce((acc, service) => {
    const category = service.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as { [key: string]: Service[] });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Search Bar - Top */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search services or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-4">
            {/* Type of Work */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Type of Work</h3>
              <div className="space-y-1.5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="text-primary"
                  />
                  <span>Any type of work</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="text-primary"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  min={0}
                  max={100000}
                  step={100}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full border-amber-200 focus:border-amber-300 focus:ring-amber-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content - Services Grid */}
        <div className="flex-1">
          {Object.entries(groupedServices).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No services found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedServices).map(([category, services]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white`} 
                         style={{ backgroundColor: categories.find(c => c.name === category)?.color || '#6b7280' }}>
                      {iconMap[categories.find(c => c.name === category)?.icon || 'Wrench']}
                    </div>
                    <h2 className="text-lg font-semibold">{category}</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.map(service => (
                      <Card key={service.id} className="flex flex-col h-full border-amber-100 hover:border-amber-200 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{service.title}</CardTitle>
                              <CardDescription>{service.provider.business_name}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pt-0">
                          <p className="text-sm text-muted-foreground mb-3">
                            {service.description}
                          </p>
                          <div className="mt-auto space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current mr-1" />
                                <span>{service.provider.rating?.toFixed(1) || '5.0'}</span>
                                <span className="text-muted-foreground ml-1">
                                  ({service.provider.total_bookings || 0} bookings)
                                </span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{service.provider.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <IndianRupee className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="font-medium">₹{service.price}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{service.duration} mins</span>
                              </div>
                            </div>
                            <Button className="w-full mt-3 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                              <Link to={`/services/${service.id}`}>
                                Book Now
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
