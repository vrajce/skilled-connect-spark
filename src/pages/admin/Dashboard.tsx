import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, AlertCircle, User, Calendar } from 'lucide-react';

interface Provider {
  id: number;
  created_at: string;
  user_id: string;
  business_name: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  phone: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    checkAdminStatus();
    loadProviders();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('is_super_admin')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (!data) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const loadProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProviders(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load providers",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (providerId: number, status: 'pending' | 'approved' | 'rejected') => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('providers')
        .update({ status })
        .eq('id', providerId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Provider ${status} successfully`,
      });

      loadProviders();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update status",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-100">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100">Rejected</Badge>;
      default:
        return null;
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage provider applications and services</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved Providers</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Applications</CardTitle>
                <CardDescription>
                  {status === 'pending' ? 'Review new provider applications' :
                   status === 'approved' ? 'View approved service providers' :
                   'View rejected applications'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers
                      .filter(provider => provider.status === status)
                      .map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell className="font-medium">{provider.business_name}</TableCell>
                          <TableCell>{provider.category}</TableCell>
                          <TableCell>{provider.phone}</TableCell>
                          <TableCell>{new Date(provider.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(provider.status)}</TableCell>
                          <TableCell>
                            {status === 'pending' ? (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(provider.id, 'approved')}
                                  disabled={loading}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusUpdate(provider.id, 'rejected')}
                                  disabled={loading}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(provider.id, 'pending')}
                                disabled={loading}
                              >
                                Reset Status
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
