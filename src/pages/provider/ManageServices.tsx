import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  is_available: boolean;
}

const categories = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Cleaning',
  'Painting',
  'Gardening',
  'Moving',
  'Catering'
];

const ManageServices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState<number | null>(null);

  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    is_available: true
  });

  useEffect(() => {
    checkProviderStatus();
  }, []);

  const checkProviderStatus = async () => {
    try {
      const { data: provider, error } = await supabase
        .from('providers')
        .select('id, status')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (!provider || provider.status !== 'approved') {
        navigate('/become-provider');
        return;
      }

      setProviderId(provider.id);
      loadServices(provider.id);
    } catch (error: any) {
      console.error('Error checking provider status:', error);
      navigate('/');
    }
  };

  const loadServices = async (pid: number) => {
    try {
      const { data, error } = await supabase
        .from('provider_services')
        .select('*')
        .eq('provider_id', pid);

      if (error) throw error;

      setServices(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load services"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_available: checked }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      is_available: true
    });
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerId) return;

    try {
      setLoading(true);
      const serviceData = {
        provider_id: providerId,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        description: formData.description,
        is_available: formData.is_available
      };

      let error;
      if (editingService) {
        ({ error } = await supabase
          .from('provider_services')
          .update(serviceData)
          .eq('id', editingService.id));
      } else {
        ({ error } = await supabase
          .from('provider_services')
          .insert([serviceData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: editingService ? "Service updated successfully" : "Service added successfully"
      });

      loadServices(providerId);
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
      description: service.description,
      is_available: service.is_available
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('provider_services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service deleted successfully"
      });

      loadServices(providerId!);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <p className="text-muted-foreground">Add and manage your service offerings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                Fill in the details of your service offering.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Basic Plumbing Service"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="500"
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="60"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your service..."
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_available"
                  checked={formData.is_available}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_available">Available for booking</Label>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {editingService ? 'Update' : 'Add'} Service
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          services.map(service => (
            <Card key={service.id} className="relative group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.category}</CardDescription>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">{service.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>₹{service.price}</span>
                    <span>{service.duration} minutes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={service.is_available}
                    onCheckedChange={async (checked) => {
                      try {
                        const { error } = await supabase
                          .from('provider_services')
                          .update({ is_available: checked })
                          .eq('id', service.id);

                        if (error) throw error;

                        loadServices(providerId!);
                      } catch (error: any) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: error.message
                        });
                      }
                    }}
                  />
                  <span className="text-sm">
                    {service.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageServices;
