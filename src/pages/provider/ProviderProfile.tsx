
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Edit, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  Award, 
  Book, 
  Tool, 
  Bookmark,
  Upload,
  CreditCard,
  Clock,
  Calendar,
  CheckCircle2,
  Star,
  Lock
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
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

const ProviderProfile = () => {
  // This would be fetched from API in a real implementation
  const profileData = {
    name: 'Vikram Singh',
    profession: 'Electrical Contractor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200&h=400',
    email: 'vikram.singh@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Professional electrician with 10+ years of experience in residential and commercial electrical services. Specialized in wiring installations, repairs, and safety inspections.',
    experience: '10 years',
    rating: 4.7,
    reviews: 52,
    completedJobs: 156,
    profileCompletion: 85,
    memberSince: 'January 2020',
    languages: ['English', 'Hindi', 'Marathi'],
    certifications: [
      {
        title: 'Certified Electrical Contractor',
        issuer: 'Electrical Contractors Association of India',
        year: '2015'
      },
      {
        title: 'Advanced Electrical Safety',
        issuer: 'National Safety Council',
        year: '2018'
      }
    ],
    education: [
      {
        degree: 'Diploma in Electrical Engineering',
        institution: 'Mumbai Technical Institute',
        year: '2013'
      }
    ],
    workHistory: [
      {
        company: 'PowerTech Solutions',
        position: 'Senior Electrician',
        duration: '2015 - 2020'
      },
      {
        company: 'City Electrical Services',
        position: 'Electrician',
        duration: '2013 - 2015'
      }
    ]
  };

  return (
    <div className="pt-20 min-h-screen bg-background/50 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background">
      {/* Cover Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10"></div>
        <img 
          src={profileData.coverImage} 
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-20">
          <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>
      </div>

      <div className="container px-4">
        {/* Main Content */}
        <motion.div
          className="relative -mt-20 z-20 mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="border border-border/50 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar and basic info */}
                  <div className="flex flex-col items-center text-center md:w-1/3 lg:w-1/4">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32 border-4 border-background">
                        <AvatarImage src={profileData.image} alt={profileData.name} />
                        <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-muted-foreground mb-2">{profileData.profession}</p>
                    
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="ml-1 font-medium">{profileData.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({profileData.reviews} reviews)</span>
                    </div>

                    <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-200">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified Provider
                    </Badge>
                    
                    <div className="w-full space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Profile Completion</span>
                          <span>{profileData.profileCompletion}%</span>
                        </div>
                        <Progress value={profileData.profileCompletion} className="h-1.5" />
                      </div>
                      
                      <div className="text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          Member since {profileData.memberSince}
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {profileData.completedJobs} jobs completed
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast.success("Profile changes saved!")}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  {/* Profile tabs */}
                  <div className="md:w-2/3 lg:w-3/4">
                    <Tabs defaultValue="personal" className="w-full">
                      <TabsList className="mb-6">
                        <TabsTrigger value="personal">
                          <User className="h-4 w-4 mr-2" />
                          Personal Info
                        </TabsTrigger>
                        <TabsTrigger value="professional">
                          <Award className="h-4 w-4 mr-2" />
                          Professional
                        </TabsTrigger>
                        <TabsTrigger value="account">
                          <Lock className="h-4 w-4 mr-2" />
                          Account
                        </TabsTrigger>
                      </TabsList>

                      {/* Personal Info Tab */}
                      <TabsContent value="personal" className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" defaultValue={profileData.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="profession">Profession</Label>
                              <Input id="profession" defaultValue={profileData.profession} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" defaultValue={profileData.email} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" defaultValue={profileData.phone} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input id="location" defaultValue={profileData.location} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="languages">Languages</Label>
                              <Input id="languages" defaultValue={profileData.languages.join(', ')} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea 
                              id="bio" 
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue={profileData.bio}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* Professional Tab */}
                      <TabsContent value="professional" className="space-y-6">
                        {/* Education */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Education</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          
                          {profileData.education.map((edu, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                  <Book className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{edu.degree}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {edu.institution} • {edu.year}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Work Experience */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Work Experience</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          
                          {profileData.workHistory.map((work, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                  <Bookmark className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{work.position}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {work.company} • {work.duration}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Certifications */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Certifications</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          
                          {profileData.certifications.map((cert, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                  <Award className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{cert.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {cert.issuer} • {cert.year}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Services */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Services Offered</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <Tool className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Electrical Wiring Installation</h4>
                                <p className="text-sm text-muted-foreground">
                                  ₹5,000 - ₹15,000
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <Tool className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Electrical Repairs</h4>
                                <p className="text-sm text-muted-foreground">
                                  ₹800 - ₹2,500
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Account Tab */}
                      <TabsContent value="account" className="space-y-6">
                        {/* Availability */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Monday</span>
                              <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Tuesday</span>
                              <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Wednesday</span>
                              <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Thursday</span>
                              <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Friday</span>
                              <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border/30">
                              <span>Saturday</span>
                              <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Sunday</span>
                              <span className="text-sm text-muted-foreground">Not Available</span>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="mt-4" size="sm">
                            <Clock className="h-4 w-4 mr-2" />
                            Update Working Hours
                          </Button>
                        </div>

                        <Separator />

                        {/* Payment Info */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                          <div className="flex items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Bank Account</h4>
                              <p className="text-sm text-muted-foreground">
                                HDFC Bank •••• 2458
                              </p>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Update Payment Info
                          </Button>
                        </div>

                        <Separator />

                        {/* Document Verification */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Identity Verification</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">ID Proof</p>
                                  <p className="text-xs text-muted-foreground">Aadhar Card</p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                Verified
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Address Proof</p>
                                  <p className="text-xs text-muted-foreground">Electricity Bill</p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                Verified
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Business Registration</p>
                                  <p className="text-xs text-muted-foreground">Upload your business license</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Delete Account */}
                        <div className="pt-4">
                          <div className="rounded-md bg-destructive/10 p-4">
                            <div className="flex items-start">
                              <div className="shrink-0">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-destructive">
                                  <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 13C5.23969 13 3 10.7603 3 8C3 5.23969 5.23969 3 8 3C10.7603 3 13 5.23969 13 8C13 10.7603 10.7603 13 8 13Z" fill="currentColor"></path>
                                  <path d="M8.375 4.75H7.625V8.75H8.375V4.75Z" fill="currentColor"></path>
                                  <path d="M8.75 10.25C8.75 10.4489 8.67098 10.6397 8.53033 10.7803C8.38968 10.921 8.19891 11 8 11C7.80109 11 7.61032 10.921 7.46967 10.7803C7.32902 10.6397 7.25 10.4489 7.25 10.25C7.25 10.0511 7.32902 9.86032 7.46967 9.71967C7.61032 9.57902 7.80109 9.5 8 9.5C8.19891 9.5 8.38968 9.57902 8.53033 9.71967C8.67098 9.86032 8.75 10.0511 8.75 10.25Z" fill="currentColor"></path>
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-destructive">Delete Account</h3>
                                <div className="mt-2 text-sm text-destructive/80">
                                  <p>Once you delete your account, there is no going back. Please be certain.</p>
                                </div>
                                <div className="mt-4">
                                  <Button variant="destructive" size="sm">
                                    Delete Account
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderProfile;
