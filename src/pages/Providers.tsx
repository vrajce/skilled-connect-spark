import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star, MapPin, Clock, CheckCircle2, Search, Filter, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Provider {
  id: number;
  business_name: string;
  category: string;
  description: string;
  experience: number;
  profile_picture?: string;
  rating?: number;
  total_ratings?: number;
  status: string;
  location: string;
  created_at: string;
  languages?: string[];
  certifications?: any[];
  updated_at?: string;
  total_bookings?: number;
}

const categories = [
  { name: "All Categories", color: "bg-purple-500" },
  { name: "Plumbing", color: "bg-blue-500" },
  { name: "Electrical", color: "bg-yellow-500" },
  { name: "Mehendi", color: "bg-red-500" },
  { name: "Carpentry", color: "bg-orange-500" },
  { name: "Cleaning", color: "bg-green-500" },
  { name: "Tailoring", color: "bg-violet-500" },
  { name: "Photography", color: "bg-pink-500" },
  { name: "Catering", color: "bg-orange-600" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "bookings", label: "Most Booked" },
  { value: "newest", label: "Newest First" },
];

const Providers = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("recommended");

  const loadProviders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('providers')
        .select(`
          id,
          business_name,
          category,
          description,
          experience,
          location,
          languages,
          profile_picture,
          rating,
          total_ratings,
          certifications,
          created_at,
          status,
          updated_at,
          total_bookings
        `)
        .eq('status', 'approved');

      // Add sorting
      switch (sortBy) {
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'bookings':
          query = query.order('total_ratings', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          // For recommended, we'll use a combination of rating and bookings
          query = query.order('rating', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log('No approved providers found');
      } else {
        console.log('Loaded approved providers:', data.length);
      }

      setProviders(data || []);
    } catch (error: any) {
      console.error('Error loading providers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load providers"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
  }, [sortBy]);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = !searchQuery || 
      provider.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All Categories" || 
      provider.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search providers..."
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
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="bookings">Most Bookings</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProviders.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No providers found matching your criteria.</p>
          </div>
        ) : (
          filteredProviders.map(provider => (
            <Card key={provider.id} className="flex flex-col h-full border-amber-100 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{provider.business_name}</CardTitle>
                    <CardDescription>{provider.location}</CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-current mr-1" />
                    <span className="font-medium">{provider.rating?.toFixed(1) || '5.0'}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  {provider.description || 'No description available.'}
                </p>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{provider.total_bookings || 0} bookings</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link to={`/providers/${provider.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Providers;
