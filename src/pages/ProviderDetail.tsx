import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock, Share2, Heart, MessageCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Provider {
  id: string;
  user_id: string;
  business_name: string;
  category: string;
  description: string;
  experience: number;
  rating: number;
  total_bookings: number;
  total_ratings: number;
  profile_picture: string;
  location: string;
  availability: string;
  languages: string[];
  p_number?: string;
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
    id: string;
    title: string;
    price: number;
    duration: string;
    description: string;
  }[];
  work_images: {
    id: string;
    url: string;
    caption: string;
  }[];
  provider_services?: {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    availability?: string;
  }[];
}

interface SimilarProvider {
  id: string;
  business_name: string;
  category: string;
  rating: number;
  profile_picture: string;
  location: string;
  total_bookings: number;
}

const ProviderDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [similarProviders, setSimilarProviders] = useState<SimilarProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newImageCaption, setNewImageCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadProviderDetails();
  }, [id]);

  const loadProviderDetails = async () => {
    try {
      // Load provider details
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*, provider_services(*), work_images(*)')
        .eq('id', id)
        .single();

      if (providerError) throw providerError;

      // Load similar providers from the same category
      const { data: similarData, error: similarError } = await supabase
        .from('providers')
        .select(`
          id,
          business_name,
          category,
          rating,
          profile_picture,
          location,
          total_bookings
        `)
        .eq('category', providerData.category)
        .eq('status', 'approved')  // Only show approved providers
        .neq('id', id)  // Exclude current provider
        .order('rating', { ascending: false })  // Show highest rated first
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile || !user) return;
    
    setUploading(true);
    
    try {
      // Upload image to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `work-images/${id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('provider-images')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('provider-images')
        .getPublicUrl(filePath);
        
      // Add image record to the database
      const { error: dbError } = await supabase
        .from('work_images')
        .insert([
          {
            provider_id: id,
            url: data.publicUrl,
            caption: newImageCaption || 'Work sample'
          }
        ]);
        
      if (dbError) throw dbError;
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
      
      // Reset form and reload data
      setSelectedFile(null);
      setNewImageCaption('');
      loadProviderDetails();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image: " + error.message
      });
    } finally {
      setUploading(false);
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

  const isOwner = user?.id === provider.user_id;

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
                    ({provider.total_ratings || 0} reviews)
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

              <TabsContent value="services" className="space-y-8">
                {/* Services Section */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Services Offered</h2>
                    {provider.provider_services && provider.provider_services.length > 0 ? (
                      <div className="grid gap-6">
                        {provider.provider_services.map((service) => (
                          <Link
                            key={service.id}
                            to={`/service/${service.id}`}
                            className="block"
                          >
                            <div
                              className="border rounded-lg p-6 hover:border-primary/50 transition-colors hover:shadow-md cursor-pointer"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold">{service.name}</h3>
                                  <p className="text-muted-foreground mt-2">{service.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-primary">
                                    ${service.price}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {service.duration}
                                  </div>
                                </div>
                              </div>
                              {service.availability && (
                                <div className="mt-4 text-sm text-muted-foreground">
                                  <span className="font-medium">Availability:</span> {service.availability}
                                </div>
                              )}
                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" className="text-primary hover:text-primary/80">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No services available at the moment.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="space-y-6">
                  {/* Upload section for provider */}
                  {isOwner && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Upload Work Image</h3>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div>
                              <label htmlFor="image-caption" className="block text-sm font-medium mb-1">
                                Image Caption
                              </label>
                              <input
                                id="image-caption"
                                type="text"
                                className="w-full px-3 py-2 border border-amber-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200"
                                placeholder="Describe your work"
                                value={newImageCaption}
                                onChange={(e) => setNewImageCaption(e.target.value)}
                              />
                            </div>
                            <div>
                              <label htmlFor="image-upload" className="block text-sm font-medium mb-1">
                                Select Image
                              </label>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-amber-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                          <Button 
                            onClick={handleUploadImage} 
                            disabled={!selectedFile || uploading}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            {uploading ? "Uploading..." : "Upload Image"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Gallery display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {provider.work_images && provider.work_images.length > 0 ? (
                      provider.work_images.map((image) => (
                        <Card key={image.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img 
                              src={image.url} 
                              alt={image.caption} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <p className="text-sm font-medium">{image.caption}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No work images available yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                    <p className="text-muted-foreground">Reviews will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-80 space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Phone Number:</p>
                    <p className="text-base font-medium">{provider.p_number || 'Not available'}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Location:</p>
                    <p className="text-base font-medium">{provider.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Providers */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Similar {provider.category} Providers</h3>
                <div className="space-y-4">
                  {similarProviders.length > 0 ? (
                    similarProviders.map((similarProvider) => (
                      <Link key={similarProvider.id} to={`/providers/${similarProvider.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-amber-50 transition-colors">
                          <img
                            src={similarProvider.profile_picture || '/assets/default-avatar.png'}
                            alt={similarProvider.business_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{similarProvider.business_name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                <span>{similarProvider.rating || 'New'}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{similarProvider.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-2">
                      No other {provider.category.toLowerCase()} providers available in your area.
                    </p>
                  )}
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
