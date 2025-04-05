
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Calendar,
  CheckCircle2, 
  MessageCircle, 
  Share2,
  Heart,
  Info,
  ThumbsUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from 'sonner';

// Sample service data (would normally come from an API)
const service = {
  id: 2,
  title: 'Bridal Mehendi Design',
  category: 'Mehendi',
  images: [
    'https://images.unsplash.com/photo-1600101628594-b7ea1f023024?auto=format&fit=crop&q=80&w=800&h=500',
    'https://images.unsplash.com/photo-1596178060810-72f89443ff7e?auto=format&fit=crop&q=80&w=800&h=500',
    'https://images.unsplash.com/photo-1630401104606-8a073d0362db?auto=format&fit=crop&q=80&w=800&h=500',
    'https://images.unsplash.com/photo-1631972908512-ded4d8012bce?auto=format&fit=crop&q=80&w=800&h=500'
  ],
  rating: 5.0,
  reviewCount: 89,
  price: 'Starts at ₹2,500',
  description: 'Beautiful and intricate bridal mehendi designs with traditional and modern patterns. Our designs are unique, elegant and long-lasting. Perfect for weddings, engagements, and other special occasions.',
  providerName: 'Priya Patel',
  providerImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  providerRating: 4.9,
  providerReviewCount: 127,
  providerLocation: 'Delhi',
  providerDistance: '5.7 km',
  availability: 'Available tomorrow',
  verified: true,
  experience: '7 years',
  completedJobs: 215,
  about: `I am a professionally trained mehendi artist with 7 years of experience specializing in bridal mehendi designs. My work combines traditional Indian patterns with modern elements to create unique designs for every client.

I use only natural henna paste that's safe for the skin and gives a rich color. My designs are known for their intricate details and long-lasting color.

I offer both in-home services and can also accommodate clients at my studio in Central Delhi.`,
  
  services: [
    {
      id: 1,
      name: 'Bridal Full Hands & Feet',
      description: 'Intricate designs covering full hands (front & back) and feet',
      price: '₹5,000',
      duration: '3-4 hours'
    },
    {
      id: 2,
      name: 'Bridal Hands Only',
      description: 'Detailed designs covering full hands (front & back)',
      price: '₹3,500',
      duration: '2-3 hours'
    },
    {
      id: 3,
      name: 'Guest/Family Mehendi',
      description: 'Beautiful designs for wedding guests and family members',
      price: '₹1,000 - ₹2,500',
      duration: '30-90 mins'
    },
    {
      id: 4,
      name: 'Arabic Design',
      description: 'Floral patterns in Arabic style for a modern look',
      price: '₹2,000',
      duration: '1-2 hours'
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
  ],
  
  faqs: [
    {
      question: 'How long does the mehendi last?',
      answer: 'With proper care, the mehendi typically lasts 1-3 weeks. The color is darkest in the first 48 hours and then gradually fades.'
    },
    {
      question: 'Do you use natural henna?',
      answer: 'Yes, I only use 100% natural henna paste that is safe for the skin. I do not use any chemicals or artificial colors.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'For bridal mehendi, I recommend booking at least 2-3 months in advance, especially during wedding season. For other occasions, 1-2 weeks notice is usually sufficient.'
    },
    {
      question: 'Do you travel to the venue?',
      answer: 'Yes, I offer in-home services within Delhi NCR. For locations outside this area, additional travel charges may apply.'
    }
  ]
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);

  const handleBooking = () => {
    if (!date || !timeSlot || !selectedService) {
      toast.error("Please select a service, date and time slot");
      return;
    }
    
    toast.success("Booking confirmed! You'll receive a confirmation shortly.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: `Check out this amazing service: ${service.title}`,
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
    <>
      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="container px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/services" className="flex items-center hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Services
            </Link>
            <span className="mx-2">/</span>
            <Link to={`/services/${service.category.toLowerCase()}`} className="hover:text-primary">
              {service.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground truncate">{service.title}</span>
          </div>
        </div>
        
        {/* Image Gallery */}
        <section className="container px-4 pt-2 pb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white border-none">
                  {service.category}
                </Badge>
              </div>
              {service.verified && (
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/80 text-green-600 border-green-200">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified Provider
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {service.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden aspect-video">
                  <img
                    src={image}
                    alt={`${service.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 2 && service.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium">+{service.images.length - 4} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Service Details */}
        <section className="container px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <h1 className="text-3xl font-bold">{service.title}</h1>
                  
                  <div className="flex items-center gap-3">
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
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-foreground font-medium">{service.rating}</span>
                    <span className="ml-1 text-muted-foreground">({service.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.providerLocation} • {service.providerDistance}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className={service.availability.includes('today') ? 'text-green-600' : ''}>
                      {service.availability}
                    </span>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-5 mb-8">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={service.providerImage} alt={service.providerName} />
                      <AvatarFallback>{service.providerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium">{service.providerName}</h3>
                        {service.verified && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 h-5">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="ml-1 text-foreground">{service.providerRating}</span>
                          <span className="ml-1 text-muted-foreground">({service.providerReviewCount})</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{service.experience} experience</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          <span>{service.completedJobs} jobs completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/providers/${service.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="pt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">About This Service</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {service.description}
                      </p>
                      
                      <Separator className="my-6" />
                      
                      <h3 className="text-lg font-medium">About The Provider</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {service.about}
                      </p>
                      
                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="sm:w-auto w-full">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact Provider
                        </Button>
                        
                        <Link to={`/providers/${service.id}`}>
                          <Button variant="secondary" className="sm:w-auto w-full">
                            View Full Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="services" className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Available Services</h3>
                    <div className="space-y-4">
                      {service.services.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-base mb-1">{item.name}</h4>
                                <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-foreground font-medium">{item.price}</span>
                                  <span className="flex items-center text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {item.duration}
                                  </span>
                                </div>
                              </div>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    onClick={() => setSelectedService(item.name)}
                                    className="shrink-0"
                                  >
                                    Book Now
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Book {item.name}</DialogTitle>
                                    <DialogDescription>
                                      Select your preferred date and time
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">
                                          Date
                                        </label>
                                        <span className="text-xs text-muted-foreground">
                                          {service.availability}
                                        </span>
                                      </div>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "w-full justify-start text-left font-normal",
                                              !date && "text-muted-foreground"
                                            )}
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : "Select date"}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <CalendarComponent
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                    
                                    <div className="grid gap-2">
                                      <label className="text-sm font-medium">
                                        Time Slot
                                      </label>
                                      <Select value={timeSlot} onValueChange={setTimeSlot}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                                          <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                                          <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div className="grid gap-2">
                                      <label className="text-sm font-medium">
                                        Service Details
                                      </label>
                                      <div className="bg-muted/50 p-3 rounded-md">
                                        <div className="flex justify-between mb-1">
                                          <span className="font-medium">{item.name}</span>
                                          <span>{item.price}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground flex justify-between">
                                          <span>{item.description}</span>
                                          <span>{item.duration}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button 
                                      type="button" 
                                      onClick={handleBooking}
                                      className="w-full sm:w-auto"
                                    >
                                      Confirm Booking
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium">Customer Reviews</h3>
                      <div className="flex items-center text-amber-500">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium text-foreground">{service.rating}</span>
                        <span className="text-muted-foreground ml-1">({service.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {service.reviews.map((review) => (
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
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        View All {service.reviewCount} Reviews
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faqs" className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                    
                    <div className="space-y-4">
                      {service.faqs.map((faq, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">{faq.question}</h4>
                            <p className="text-muted-foreground text-sm">{faq.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <h4 className="font-medium mb-3">Still have questions?</h4>
                      <Button>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Provider
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24"
              >
                <Card className="overflow-hidden border border-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Book This Service</h3>
                    <div className="flex items-center text-lg font-medium mb-4">
                      <span>{service.price}</span>
                      <Info className="ml-1.5 h-4 w-4 text-muted-foreground cursor-help" />
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Select Service
                        </label>
                        <Select value={selectedService} onValueChange={setSelectedService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {service.services.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name} - {item.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Date
                          </label>
                          <span className="text-xs text-muted-foreground">
                            {service.availability}
                          </span>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Time Slot
                        </label>
                        <RadioGroup value={timeSlot} onValueChange={setTimeSlot}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="morning" id="morning" />
                            <label htmlFor="morning" className="text-sm">
                              Morning (9 AM - 12 PM)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="afternoon" id="afternoon" />
                            <label htmlFor="afternoon" className="text-sm">
                              Afternoon (12 PM - 4 PM)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="evening" id="evening" />
                            <label htmlFor="evening" className="text-sm">
                              Evening (4 PM - 8 PM)
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mb-4" 
                      size="lg"
                      onClick={handleBooking}
                      disabled={!selectedService || !date || !timeSlot}
                    >
                      Book Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Provider
                    </Button>
                    
                    <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                      <div className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Free cancellation 24h before</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 text-primary mr-2" />
                        <span>Secure payment</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ThumbsUp className="h-4 w-4 text-primary mr-2" />
                        <span>Satisfaction guaranteed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Related Services</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-red-500/10 flex items-center justify-center shrink-0">
                        <div className="w-6 h-6 rounded-full bg-red-500"></div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Wedding Makeup</h5>
                        <p className="text-xs text-muted-foreground">
                          From ₹3,000
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-purple-500/10 flex items-center justify-center shrink-0">
                        <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Bridal Tailoring</h5>
                        <p className="text-xs text-muted-foreground">
                          From ₹8,000
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-pink-500/10 flex items-center justify-center shrink-0">
                        <div className="w-6 h-6 rounded-full bg-pink-500"></div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Wedding Photography</h5>
                        <p className="text-xs text-muted-foreground">
                          From ₹15,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Similar Services */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8">Similar Services You Might Like</h2>
            
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3, 4].map((item) => (
                  <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                        <div className="relative h-48">
                          <img
                            src={`https://images.unsplash.com/photo-160010162859${item}-b7ea1f02302${item}?auto=format&fit=crop&q=80&w=500&h=300`}
                            alt={`Similar service ${item}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white border-none">
                              Mehendi
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Traditional Mehendi Design</h3>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-foreground">4.{7+item}</span>
                              <span className="ml-1 text-xs text-muted-foreground">({30+item*10})</span>
                            </div>
                            <span className="font-medium">From ₹1,{5+item}00</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{2+item}.5 km away</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* Trust Badges */}
        <section className="py-12 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-center text-lg font-medium mb-8">Why Book With SkilledConnect</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Verified Professionals</h4>
                  <p className="text-sm text-muted-foreground">All service providers undergo thorough verification process</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Secure Payments</h4>
                  <p className="text-sm text-muted-foreground">Pay securely online with multiple payment options</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ThumbsUp className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Satisfaction Guaranteed</h4>
                  <p className="text-sm text-muted-foreground">Not happy with the service? We'll make it right</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
