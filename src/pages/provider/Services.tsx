import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

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
}

interface NewService {
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

const categories = [
  'Plumbing',
  'Electrical',
  'Mehendi',
  'Carpentry',
  'Cleaning',
  'Tailoring',
  'Photography',
  'Catering'
];

const ProviderServices = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [providerId, setProviderId] = useState<number | null>(null);
  const [newService, setNewService] = useState<NewService>({
    title: '',
    description: '',
    price: 0,
    duration: '30',
    category: ''
  });

  useEffect(() => {
    if (user) {
      getProviderId();
    }
  }, [user]);

  const getProviderId = async () => {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('id, status')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (!data || data.status !== 'approved') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You need to be an approved provider to manage services."
        });
        navigate('/become-provider');
        return;
      }

      setProviderId(data.id);
      loadServices(data.id);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify provider status."
      });
    }
  };

  const loadServices = async (pid: number) => {
    try {
      const { data, error } = await supabase
        .from('provider_services')
        .select('*')
        .eq('provider_id', pid)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load services."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    field: keyof NewService
  ) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setNewService(prev => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) || 0 : 
               field === 'duration' ? value : 
               field === 'category' ? value : 
               value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerId) return;

    try {
      const serviceData = {
        ...newService,
        provider_id: providerId
      };

      console.log('Submitting service data:', serviceData);

      const { data, error } = await supabase
        .from('provider_services')
        .insert([serviceData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Service added successfully:', data);

      setServices(prev => [data, ...prev]);
      setNewService({
        title: '',
        description: '',
        price: 0,
        duration: '30',
        category: ''
      });

      toast({
        title: "Success",
        description: "Service added successfully!"
      });
    } catch (error: any) {
      console.error('Detailed error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add service."
      });
    }
  };

  const deleteService = async (serviceId: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('provider_services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast({
        title: "Success",
        description: "Service deleted successfully!"
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service."
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Services</h1>
        <p className="text-muted-foreground">Add and manage your professional services</p>
      </div>

      {/* Add New Service Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Fill in the details to add a new service</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                placeholder="e.g., Basic Plumbing Service"
                value={newService.title}
                onChange={e => handleInputChange(e, 'title')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newService.category}
                onValueChange={value => handleInputChange(value, 'category')}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={newService.price}
                onChange={e => handleInputChange(e, 'price')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={newService.duration}
                onValueChange={value => handleInputChange(value, 'duration')}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                  <SelectItem value="480">Full day (8 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your service..."
                value={newService.description}
                onChange={e => handleInputChange(e, 'description')}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Your Services</h2>
        {services.length === 0 ? (
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-muted-foreground">No services added yet.</p>
            </CardContent>
          </Card>
        ) : (
          services.map(service => (
            <Card key={service.id} className="relative">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {service.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">₹{service.price}</span>
                    <span className="text-muted-foreground">{service.duration} mins</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProviderServices;
