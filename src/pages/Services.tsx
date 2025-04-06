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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
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
          return (b.provider.total_ratings || 0) - (a.provider.total_ratings || 0);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-amber-200 focus:border-amber-300 focus:ring-amber-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No services found matching your criteria.</p>
          </div>
        ) : (
          filteredServices.map(service => (
            <Card key={service.id} className="flex flex-col h-full border-amber-100 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.provider.business_name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="mt-auto space-y-3">
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
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link to={`/services/${service.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-amber-800">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg">How do I book a service?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simply browse through our services, select the one you need, choose your preferred time slot, and confirm your booking.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg">How are service providers vetted?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All our service providers undergo thorough background checks and must maintain high service ratings to remain on our platform.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg">What payment methods are accepted?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We accept all major credit/debit cards, UPI, and net banking. Payment is processed securely through our platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
