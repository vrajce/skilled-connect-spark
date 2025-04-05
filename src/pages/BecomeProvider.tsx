import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Briefcase, Star, Shield, Award } from 'lucide-react';

const BecomeProvider = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    experience: '',
    description: '',
    phone: '',
    address: '',
    idProof: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create provider profile
      const { data: provider, error: providerError } = await supabase
        .from('providers')
        .insert([{
          user_id: user?.id,
          business_name: formData.businessName,
          category: formData.category,
          experience: formData.experience,
          description: formData.description,
          phone: formData.phone,
          address: formData.address,
          id_proof: formData.idProof,
          status: 'pending',
        }])
        .select()
        .single();

      if (providerError) throw providerError;

      toast({
        title: "Application submitted",
        description: "Your provider application has been submitted for review",
      });

      navigate('/provider/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit application",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Become a Service Provider</CardTitle>
              <CardDescription>Fill in your details to start offering services</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idProof">ID Proof Number</Label>
                  <Input
                    id="idProof"
                    value={formData.idProof}
                    onChange={(e) => setFormData({...formData, idProof: e.target.value})}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Please enter your Aadhar or PAN number</p>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Join Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Grow Your Business</h4>
                    <p className="text-sm text-muted-foreground">Access a large customer base and grow your service business</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Build Your Reputation</h4>
                    <p className="text-sm text-muted-foreground">Get reviews and ratings to build trust with customers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Payments</h4>
                    <p className="text-sm text-muted-foreground">Get paid securely and on time for your services</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Professional Network</h4>
                    <p className="text-sm text-muted-foreground">Join a community of skilled professionals</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you need assistance with your application or have any questions, please contact our support team.
              </p>
              <Button variant="outline" className="mt-4 w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;
