import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock, Share2, Heart, MessageCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Provider {
  id: number;
  business_name: string;
  category: string;
  description: string;
  experience: number;
  rating: number;
  total_bookings: number;
  profile_picture: string;
  location: string;
  availability: string;
  languages: string[];
  certifications: {
    title: string;
    institution: string;
    year: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  services: {
    id: number;
    title: string;
    price: number;
    duration: string;
    description: string;
  }[];
}

interface SimilarProvider {
  id: number;
  business_name: string;
  category: string;
  rating: number;
  profile_picture: string;
}

const ProviderDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [similarProviders, setSimilarProviders] = useState<SimilarProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviderDetails();
  }, [id]);

  const loadProviderDetails = async () => {
    try {
      // Load provider details
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*, provider_services(*)')
        .eq('id', id)
        .single();

      if (providerError) throw providerError;

      // Load similar providers
      const { data: similarData, error: similarError } = await supabase
        .from('providers')
        .select('id, business_name, category, rating, profile_picture')
        .eq('category', providerData.category)
        .neq('id', id)
        .limit(3);

      if (similarError) throw similarError;

      setProvider(providerData);
      setSimilarProviders(similarData || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load provider details"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container max-w-7xl py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Provider not found</h1>
        <p className="text-muted-foreground mb-8">The provider you're looking for doesn't exist or has been removed.</p>
        <Link to="/providers">
          <Button>Back to Providers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Provider Info */}
      <div className="w-full h-64 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
        <div className="container max-w-7xl h-full flex items-end">
          <div className="flex items-end gap-6 pb-6">
            <div className="relative">
              <img
                src={provider.profile_picture || '/assets/default-avatar.png'}
                alt={provider.business_name}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{provider.business_name}</h1>
                <Badge variant="outline" className="bg-green-500/10 text-green-600">
                  Verified
                </Badge>
              </div>
              <p className="text-muted-foreground">{provider.category}</p>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({provider.total_bookings} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {provider.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {provider.experience} years experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl py-8">
        <div className="flex gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="about" className="w-full">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-8">
                {/* About Section */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">About {provider.business_name}</h3>
                    <p className="text-muted-foreground">{provider.description}</p>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Certifications & Awards</h3>
                    <div className="space-y-4">
                      {provider.certifications?.map((cert, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cert.institution} • {cert.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Languages</h3>
                    <div className="flex gap-2">
                      {provider.languages?.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">FAQ</h3>
                    <div className="space-y-6">
                      {provider.faq?.map((item, index) => (
                        <div key={index}>
                          <h4 className="font-medium mb-2">{item.question}</h4>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <div className="grid gap-6">
                  {provider.services?.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <p className="text-muted-foreground mt-1">{service.description}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <Badge variant="outline">₹{service.price}/hr</Badge>
                              <Badge variant="outline">{service.duration}</Badge>
                            </div>
                          </div>
                          <Button>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact & Similar Providers */}
          <div className="w-80 space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact {provider.business_name}</h3>
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Providers */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Providers</h3>
                <div className="space-y-4">
                  {similarProviders.map((provider) => (
                    <Link key={provider.id} to={`/providers/${provider.id}`}>
                      <div className="flex items-center gap-3 group">
                        <img
                          src={provider.profile_picture || '/assets/default-avatar.png'}
                          alt={provider.business_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-primary">
                            {provider.business_name}
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="ml-1">{provider.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{provider.category}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
