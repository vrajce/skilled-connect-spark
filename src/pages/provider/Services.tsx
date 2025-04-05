import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';

const ProviderServices = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Basic Plumbing Service",
      category: "Plumbing",
      price: 500,
      duration: 60,
      description: "Basic plumbing repairs and maintenance",
      isAvailable: true,
    },
    // Add more services
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleAddService = () => {
    setIsEditing(true);
    setEditingService({
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      isAvailable: true,
    });
  };

  const handleEditService = (service: any) => {
    setIsEditing(true);
    setEditingService(service);
  };

  const handleDeleteService = async (serviceId: number) => {
    try {
      setLoading(true);
      // In a real app, you would delete from your Supabase table
      const updatedServices = services.filter(s => s.id !== serviceId);
      setServices(updatedServices);
      toast({
        title: "Service deleted",
        description: "The service has been removed successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete service",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // In a real app, you would save to your Supabase table
      if (editingService.id) {
        const updatedServices = services.map(s =>
          s.id === editingService.id ? editingService : s
        );
        setServices(updatedServices);
        toast({
          title: "Service updated",
          description: "Your service has been updated successfully",
        });
      } else {
        const newService = {
          ...editingService,
          id: services.length + 1,
        };
        setServices([...services, newService]);
        toast({
          title: "Service added",
          description: "Your new service has been added successfully",
        });
      }
      setIsEditing(false);
      setEditingService(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save service",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingService.id ? 'Edit Service' : 'Add New Service'}</CardTitle>
            <CardDescription>Fill in the service details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingService.category}
                    onValueChange={(value) => setEditingService({...editingService, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Carpentry">Carpentry</SelectItem>
                      <SelectItem value="Cleaning">Cleaning</SelectItem>
                      <SelectItem value="Painting">Painting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingService.isAvailable}
                  onCheckedChange={(checked) => setEditingService({...editingService, isAvailable: checked})}
                />
                <Label>Service is available</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Service"}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsEditing(false);
                  setEditingService(null);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.category}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="font-medium">₹{service.price}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.duration} mins
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <Switch
                      checked={service.isAvailable}
                      onCheckedChange={(checked) => {
                        const updatedServices = services.map(s =>
                          s.id === service.id ? {...s, isAvailable: checked} : s
                        );
                        setServices(updatedServices);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderServices;
