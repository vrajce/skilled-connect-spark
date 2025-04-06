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
import { Star, MapPin, Clock, CheckCircle2, Search, Filter } from 'lucide-react';
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
  total_bookings?: number;
  status: string;
  location: string;
  created_at: string;
  languages?: string[];
  certifications?: any[];
  updated_at?: string;
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
          total_bookings,
          certifications,
          created_at,
          status,
          updated_at
        `)
        .eq('status', 'approved');

      // Add sorting
      switch (sortBy) {
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'bookings':
          query = query.order('total_bookings', { ascending: false });
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
    <div className="container max-w-7xl py-10">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Find <span className="text-purple-500">Skilled Professionals</span>
        </h1>
        <p className="text-muted-foreground">
          Connect with verified service providers in your area
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for service providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className={`rounded-full whitespace-nowrap ${
              selectedCategory === category.name ? category.color : ""
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredProviders.length} {selectedCategory === "All Categories" ? "providers" : selectedCategory + " providers"}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No providers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Link key={provider.id} to={`/providers/${provider.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16">
                        <img
                          src={provider.profile_picture || '/default-avatar.png'}
                          alt={provider.business_name}
                          className="rounded-full object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default-avatar.png';
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{provider.business_name}</CardTitle>
                        <CardDescription>{provider.category}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{provider.rating?.toFixed(1) || '0.0'}</span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({provider.total_bookings || 0})
                      </span>
                    </div>
                    {provider.experience > 0 && (
                      <Badge variant="secondary">
                        {provider.experience} years exp.
                      </Badge>
                    )}
                  </div>
                  {provider.location && (
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.location}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Providers;
