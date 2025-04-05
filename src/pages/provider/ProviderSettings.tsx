
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Globe, 
  Lock, 
  CreditCard, 
  User, 
  ToggleLeft,
  AlertCircle,
  CheckCircle,
  Shield,
  Mail
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProviderSettings = () => {
  return (
    <div className="pt-20 min-h-screen bg-background/50 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="container px-4 py-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold">Account <span className="text-gradient-primary">Settings</span></h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border border-border/50">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    <div className="px-4 py-3 font-medium hover:bg-muted/40 rounded-t-md transition-colors cursor-pointer bg-primary/5 text-primary">
                      <User className="h-4 w-4 inline-block mr-2" />
                      General
                    </div>
                    <div className="px-4 py-3 font-medium hover:bg-muted/40 transition-colors cursor-pointer">
                      <Bell className="h-4 w-4 inline-block mr-2" />
                      Notifications
                    </div>
                    <div className="px-4 py-3 font-medium hover:bg-muted/40 transition-colors cursor-pointer">
                      <Lock className="h-4 w-4 inline-block mr-2" />
                      Security
                    </div>
                    <div className="px-4 py-3 font-medium hover:bg-muted/40 transition-colors cursor-pointer">
                      <CreditCard className="h-4 w-4 inline-block mr-2" />
                      Billing
                    </div>
                    <div className="px-4 py-3 font-medium hover:bg-muted/40 rounded-b-md transition-colors cursor-pointer">
                      <Globe className="h-4 w-4 inline-block mr-2" />
                      Preferences
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Content Area */}
            <motion.div variants={fadeInUp} className="lg:col-span-3 space-y-6">
              {/* General Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Account Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Vikram Singh" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue="vikram.singh@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Mumbai, Maharashtra" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Appearance</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select defaultValue="system">
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="mr">Marathi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t border-border/40 pt-6">
                  <Button variant="outline" onClick={() => toast.error("Changes discarded")}>Cancel</Button>
                  <Button onClick={() => toast.success("Settings saved successfully")}>Save Changes</Button>
                </CardFooter>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="email">
                    <TabsList className="mb-6">
                      <TabsTrigger value="email">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </TabsTrigger>
                      <TabsTrigger value="push">
                        <Bell className="h-4 w-4 mr-2" />
                        Push
                      </TabsTrigger>
                      <TabsTrigger value="sms">
                        <Mail className="h-4 w-4 mr-2" />
                        SMS
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="email" className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">New Bookings</h4>
                          <p className="text-sm text-muted-foreground">Get notified when you receive a new booking request</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Booking Updates</h4>
                          <p className="text-sm text-muted-foreground">Get notified when a booking is modified or cancelled</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Payment Notifications</h4>
                          <p className="text-sm text-muted-foreground">Get notified about payment updates and transactions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Marketing & Promotions</h4>
                          <p className="text-sm text-muted-foreground">Updates about new features and promotional offers</p>
                        </div>
                        <Switch />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="push" className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Enable Push Notifications</h4>
                          <p className="text-sm text-muted-foreground">Allow browser notifications for important updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">New Bookings</h4>
                          <p className="text-sm text-muted-foreground">Get notified when you receive a new booking request</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Messages</h4>
                          <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sms" className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Enable SMS Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">New Bookings</h4>
                          <p className="text-sm text-muted-foreground">Get SMS alerts for new booking requests</p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Booking Reminders</h4>
                          <p className="text-sm text-muted-foreground">Get reminders about upcoming bookings</p>
                        </div>
                        <Switch />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="justify-end border-t border-border/40 pt-6">
                  <Button onClick={() => toast.success("Notification settings saved")}>Save Preferences</Button>
                </CardFooter>
              </Card>

              {/* Security Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and login settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Password updated successfully")}>Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Enable 2FA</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Login Sessions</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Current Session</h4>
                            <p className="text-xs text-muted-foreground">Mumbai, India • Chrome on Windows</p>
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      
                      <Button variant="outline" size="sm" className="text-destructive">
                        Sign Out All Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderSettings;
