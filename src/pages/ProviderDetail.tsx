import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Star,
  MapPin,
  Calendar, 
  MessageCircle,
  Share2,
  Heart,
  Clock,
  CheckCircle2,
  Shield,
  ThumbsUp,
  Briefcase,
  Award,
  User,
  Image as ImageIcon,
  AlignLeft,
  Users,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Sample provider data
const provider = {
  id: 2,
  name: 'Priya Patel',
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
  coverImage: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?auto=format&fit=crop&q=80&w=1200&h=400',
  specialty: 'Mehendi Artist',
  bio: `Professional mehendi artist with 7 years of experience specializing in bridal designs, Arabic patterns, and contemporary styles. Based in Delhi NCR.

I use only organic henna that's safe for all skin types and gives a rich, dark color that lasts for 1-2 weeks. I've worked with over 200 brides and participated in various cultural events and fashion shows.

My services include bridal mehendi, engagement designs, party mehendi, and customized patterns for special occasions. I also provide group discounts for wedding parties.`,
  location: 'Delhi, India',
  distance: '5.7 km away',
  rating: 4.9,
  reviewCount: 127,
  experience: '7 years',
  completedJobs: 215,
  verified: true,
  available: 'Available tomorrow',
  languages: ['English', 'Hindi', 'Gujarati'],
  gallery: [
    'https://images.unsplash.com/photo-1600101628594-b7ea1f023024?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1596178060810-72f89443ff7e?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1630401104606-8a073d0362db?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1631972908512-ded4d8012bce?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1631972908512-ded4d8012bce?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1631972908512-ded4d8012bce?auto=format&fit=crop&q=80&w=600&h=400',
  ],
  services: [
    {
      id: 1,
      title: 'Bridal Full Hands & Feet',
      description: 'Intricate designs covering full hands (front & back) and feet',
      price: '₹5,000',
      duration: '3-4 hours',
      image: 'https://images.unsplash.com/photo-1600101628594-b7ea1f023024?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: 2,
      title: 'Bridal Hands Only',
      description: 'Detailed designs covering full hands (front & back)',
      price: '₹3,500',
      duration: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1596178060810-72f89443ff7e?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: 3,
      title: 'Guest/Family Mehendi',
      description: 'Beautiful designs for wedding guests and family members',
      price: '₹1,000 - ₹2,500',
      duration: '30-90 mins',
      image: 'https://images.unsplash.com/photo-1630401104606-8a073d0362db?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: 4,
      title: 'Arabic Design',
      description: 'Floral patterns in Arabic style for a modern look',
      price: '₹2,000',
      duration: '1-2 hours',
      image: 'https://images.unsplash.com/photo-1631972908512-ded4d8012bce?auto=format&fit=crop&q=80&w=300&h=200'
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'Ananya Singh',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Priya did an amazing job with my bridal mehendi! The designs were intricate and beautiful, and the color turned out so dark and rich. She was punctual, professional and made me feel comfortable throughout the session. Highly recommend!'
    },
    {
      id: 2,
      name: 'Meera Kapoor',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      date: '1 month ago',
      comment: 'I booked Priya for my engagement ceremony and couldn\'t be happier with her work. She has a steady hand and incredible attention to detail. My mehendi lasted for almost 3 weeks with good color. Will definitely book her again for my wedding!'
    },
    {
      id: 3,
      name: 'Riya Sharma',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 5,
      date: '2 months ago',
      comment: 'Priya is truly talented! She did mehendi for me and my sister for a family wedding. She was patient, creative and the designs were unique. Her henna paste smells nice and gives a dark color. Highly recommended!'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      image: 'https://randomuser.me/api/portraits/women/26.jpg',
      rating: 4,
      date: '3 months ago',
      comment: 'Great service and beautiful designs! Priya was on time and very professional. The only reason I\'m not giving 5 stars is because the color didn\'t last as long as expected, but the designs were beautiful.'
    },
  ],
  faqs: [
    {
      question: 'Do you travel to the client\'s location?',
      answer: 'Yes, I provide at-home services within Delhi NCR. For locations outside this area, additional travel charges may apply.'
    },
    {
      question: 'How long in advance should I book for a wedding?',
      answer: 'For bridal mehendi, I recommend booking at least 2-3 months in advance, especially during wedding season (Oct-Dec and Apr-Jun).'
    },
    {
      question: 'What type of henna do you use?',
      answer: 'I use 100% natural organic henna paste without any chemicals or additives. It\'s safe for all skin types and gives a dark rich color.'
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes, I offer special packages for bridal parties and groups of 5 or more people. Please contact me for custom quotes.'
    }
  ],
  certifications: [
    {
      title: 'Certified Mehendi Artist',
      issuer: 'Indian Institute of Art & Design',
      year: '2017'
    },
    {
      title: 'Advanced Bridal Mehendi Training',
      issuer: 'Mehendi Academy Delhi',
      year: '2018'
    },
    {
      title: 'Best Mehendi Artist Award',
      issuer: 'Delhi Wedding Expo',
      year: '2021'
    }
  ]
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ProviderDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${provider.name} - ${provider.specialty}`,
        text: `Check out ${provider.name}, a professional ${provider.specialty} on SkilledConnect`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/providers" className="flex items-center hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Providers
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground truncate">{provider.name}</span>
        </div>
      </div>
      
      {/* Cover Image and Profile Section */}
      <section className="relative">
        <div className="h-48 md:h-64 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/5 z-10"></div>
          <img 
            src={provider.coverImage} 
            alt={`${provider.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container px-4">
          <motion.div 
            className="relative -mt-16 z-20 bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <Avatar className="h-24 w-24 ring-4 ring-background">
                  <AvatarImage src={provider.image} alt={provider.name} />
                  <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-bold">{provider.name}</h1>
                        {provider.verified && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{provider.specialty}</p>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={cn(
                          "rounded-full transition-colors",
                          isLiked ? "text-red-500 border-red-200 bg-red-50" : ""
                        )}
                        onClick={() => {
                          setIsLiked(!isLiked);
                          toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
                        }}
                      >
                        <Heart className={cn(
                          "h-5 w-5",
                          isLiked ? "fill-current" : ""
                        )} />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full"
                        onClick={handleShare}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                      
                      <Button>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-foreground font-medium">{provider.rating}</span>
                      <span className="ml-1 text-muted-foreground">({provider.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.location} • {provider.distance}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{provider.experience} experience</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span>{provider.completedJobs} jobs completed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="flex items-center gap-2 mt-4 md:hidden">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={cn(
                    "rounded-full transition-colors",
                    isLiked ? "text-red-500 border-red-200 bg-red-50" : ""
                  )}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
                  }}
                >
                  <Heart className={cn(
                    "h-5 w-5",
                    isLiked ? "fill-current" : ""
                  )} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                
                <Button className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
            
            {/* Provider Info Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border/50">
              <div className="p-4 text-center border-r border-border/50">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium mb-1">{provider.rating}/5</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
              
              <div className="p-4 text-center border-r border-border/50 md:border-r">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium mb-1">{provider.completedJobs}</p>
                  <p className="text-xs text-muted-foreground">Jobs</p>
                </div>
              </div>
              
              <div className="p-4 text-center border-t md:border-t-0 border-r border-border/50">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium mb-1">{provider.experience}</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>
              
              <div className="p-4 text-center border-t md:border-t-0 border-border/50">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium mb-1">{provider.available}</p>
                  <p className="text-xs text-muted-foreground">Availability</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="about" className="text-sm">
                  <User className="h-4 w-4 mr-1.5 md:mr-2" />
                  <span className="hidden md:inline">About</span>
                  <span className="md:hidden">About</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="text-sm">
                  <Briefcase className="h-4 w-4 mr-1.5 md:mr-2" />
                  <span className="hidden md:inline">Services</span>
                  <span className="md:hidden">Services</span>
                </TabsTrigger>
                <TabsTrigger value="gallery" className="text-sm">
                  <ImageIcon className="h-4 w-4 mr-1.5 md:mr-2" />
                  <span className="hidden md:inline">Gallery</span>
                  <span className="md:hidden">Gallery</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm">
                  <Star className="h-4 w-4 mr-1.5 md:mr-2" />
                  <span className="hidden md:inline">Reviews</span>
                  <span className="md:hidden">Reviews</span>
                </TabsTrigger>
              </TabsList>
              
              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlignLeft className="mr-2 h-5 w-5 text-primary" />
                      About {provider.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {provider.bio}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Certifications & Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {provider.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cert.issuer} • {cert.year}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      FAQ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {provider.faqs.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
                          <h4 className="font-medium mb-1">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Services Tab */}
              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                    <CardDescription>Book any of these services directly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {provider.services.map((service) => (
                      <div 
                        key={service.id} 
                        className="flex flex-col md:flex-row gap-4 pb-6 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <div className="w-full md:w-36 h-24 rounded-md overflow-hidden shrink-0">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <div className="font-medium">{service.price}</div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-2 md:justify-between md:items-end">
                          <Button className="flex-1 md:w-auto">Book Now</Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1 md:w-auto">Details</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{service.title}</DialogTitle>
                                <DialogDescription>
                                  Service details and booking options
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-4 py-4">
                                <div className="rounded-md overflow-hidden h-48">
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Description</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {service.description}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-muted/30 p-3 rounded-md">
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="font-medium">{service.price}</p>
                                  </div>
                                  <div className="bg-muted/30 p-3 rounded-md">
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="font-medium">{service.duration}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button onClick={() => {
                                  toast.success("Redirecting to booking page...");
                                }}>
                                  Proceed to Book
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-border/50 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          onClick={() => setShowContactInfo(true)}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Contact for Custom Requests
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact {provider.name}</DialogTitle>
                          <DialogDescription>
                            You can reach out directly for custom requests and inquiries
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={provider.image} alt={provider.name} />
                              <AvatarFallback>{provider.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{provider.name}</h4>
                              <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 bg-muted/30 p-4 rounded-md">
                            <div className="flex items-start">
                              <Phone className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">+91 98765 43210</p>
                                <p className="text-xs text-muted-foreground">Available: 9 AM - 8 PM</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Mail className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">priya.mehendi@example.com</p>
                                <p className="text-xs text-muted-foreground">Typically replies within 24 hours</p>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            When contacting, please mention you found {provider.name} on SkilledConnect.
                          </p>
                        </div>
                        
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              toast.success("Contact details saved to clipboard!");
                            }}
                          >
                            Save Contact
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Portfolio</CardTitle>
                    <CardDescription>Browse through {provider.name}'s previous work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {provider.gallery.map((image, index) => (
                        <Dialog key={index}>
                          <DialogTrigger asChild>
                            <div className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                              <img 
                                src={image} 
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <div className="aspect-video w-full overflow-hidden rounded-md">
                              <img 
                                src={image} 
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle>Customer Reviews</CardTitle>
                      <CardDescription>See what clients are saying</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                        ))}
                      </div>
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-muted-foreground ml-1">({provider.reviewCount})</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {provider.reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border/50 last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.image} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-medium">{review.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                              
                              <div className="flex mb-3 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "h-3.5 w-3.5",
                                      i < review.rating ? "fill-current" : ""
                                    )} 
                                  />
                                ))}
                              </div>
                              
                              <p className="text-muted-foreground text-sm">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {provider.reviewCount > provider.reviews.length && (
                      <div className="mt-6 text-center">
                        <Button variant="outline">
                          Load More Reviews
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Contact and Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-primary/10">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-center">Contact {provider.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        View Contact Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {provider.name}</DialogTitle>
                        <DialogDescription>
                          You can reach out directly for inquiries
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={provider.image} alt={provider.name} />
                            <AvatarFallback>{provider.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{provider.name}</h4>
                            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 bg-muted/30 p-4 rounded-md">
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">+91 98765 43210</p>
                              <p className="text-xs text-muted-foreground">Available: 9 AM - 8 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">priya.mehendi@example.com</p>
                              <p className="text-xs text-muted-foreground">Typically replies within 24 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            toast.success("Contact details saved to clipboard!");
                          }}
                        >
                          Save Contact
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">Location</h4>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">{provider.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">{provider.distance}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">Availability</h4>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">{provider.available}</p>
                        <p className="text-xs text-muted-foreground mt-1">Typically responds within 1 hour</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Why Choose {provider.name.split(' ')[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Verified Professional</h4>
                    <p className="text-xs text-muted-foreground">Identity and skills verified</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Highly Rated</h4>
                    <p className="text-xs text-muted-foreground">{provider.rating}/5 from {provider.reviewCount} reviews</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Experienced Professional</h4>
                    <p className="text-xs text-muted-foreground">{provider.experience} of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Satisfaction Guaranteed</h4>
                    <p className="text-xs text-muted-foreground">Top-rated service provider</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Similar Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link to={`/providers/${i}`} key={i}>
                    <div className="flex items-center gap-3 group">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${20 + i}.jpg`} />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                          {['Anjali Mehta', 'Rajiv Kumar', 'Priyanka Shah'][i-1]}
                        </h4>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-amber-500 fill-current" />
                          <span className="text-xs ml-1">{4.7 + (i * 0.1).toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground ml-2">{provider.specialty}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderDetail;
