import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Shield, Zap, CheckCircle2, ThumbsUp, Search, Wrench, Flower2, Hammer, Sparkles, Scissors, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import BeeBackground from '@/components/BeeBackground';

// Import helper utility for animations
import { cn } from '@/lib/utils';

interface ServiceCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

// Service categories
const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: 'Plumbing',
    icon: 'Wrench',
    color: 'bg-blue-500',
    description: 'Fix leaks, installations & repairs'
  },
  {
    id: 2,
    name: 'Electrical',
    icon: 'Zap',
    color: 'bg-yellow-500',
    description: 'Wiring, fixtures & repairs'
  },
  {
    id: 3,
    name: 'Mehendi',
    icon: 'Flower2',
    color: 'bg-red-500',
    description: 'Traditional & modern designs'
  },
  {
    id: 4,
    name: 'Carpentry',
    icon: 'Hammer',
    color: 'bg-amber-600',
    description: 'Furniture repair & custom builds'
  },
  {
    id: 5,
    name: 'Home Cleaning',
    icon: 'Sparkles',
    color: 'bg-green-500',
    description: 'Deep cleaning & sanitization'
  },
  {
    id: 6,
    name: 'Tailoring',
    icon: 'Scissors',
    color: 'bg-purple-500',
    description: 'Custom designs & alterations'
  }
];

const iconMap: { [key: string]: React.ReactNode } = {
  Wrench: <Wrench className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Flower2: <Flower2 className="h-6 w-6" />,
  Hammer: <Hammer className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Scissors: <Scissors className="h-6 w-6" />
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
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

const images: ImageData[] = [
  { src: '/imgs/electrician.jpg', alt: 'Professional Electrician', caption: 'Expert Electrical Services' },
  { src: '/imgs/plumber.jpg', alt: 'Professional Plumber', caption: 'Quality Plumbing Solutions' },
  { src: '/imgs/mehendi.jpg', alt: 'Professional Mehendi Artist', caption: 'Beautiful Mehendi Designs' },
  { src: '/imgs/photographer.jpg', alt: 'Professional Photographer', caption: 'Capture Your Moments' },
];

const Index: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      if (heroElement) {
        heroElement.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroElement.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-4rem)] bg-background relative flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-hidden">
        {/* Background animation */}
        {/* <BeeBackground /> */}
        
        <div className="container px-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 text-sm mb-8">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                Available in your area
              </div>
            
              <h1 className="text-4xl md:text-6xl font-bold mb-5 text-foreground leading-tight">
                Find Local Service<br />Providers You Can Trust
              </h1>
            
              <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                Connect with verified local professionals for your home services, repairs, and more. Quick, reliable, and trusted by your community.
              </p>
            
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link to="/services">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Browse Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/become-provider">
                  <Button variant="outline" size="lg">
                    Join as Provider
                  </Button>
                </Link>
              </div>

              <div className="mt-10 space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary/80" />
                  <span>Background-checked professionals</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-primary/80" />
                  <span>100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-primary/80" />
                  <span>Secure & hassle-free payments</span>
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="hidden md:block relative rounded-xl overflow-hidden bg-background border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <Carousel 
                className="w-full group relative" 
                opts={{
                  loop: true,
                  align: "start",
                }}
                setApi={setApi}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                          <p className="text-white text-sm font-medium tracking-wide">{image.caption}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2 h-12 w-12 bg-background/90 border-2 border-border/50 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background hover:border-border" />
                <CarouselNext className="-right-2 h-12 w-12 bg-background/90 border-2 border-border/50 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background hover:border-border" />
              </Carousel>
            </div>
          </div>
        </div>

        {/* Simple bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent opacity-75"></div>
      </div>

      {/* Service Categories Section */}
      <div className="py-16 md:py-20 bg-gray-50/50">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Services We Offer
            </h2>
            <p className="text-muted-foreground text-center">
              Find trusted professionals for all your home service needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCategories.map((category, index) => (
              <div key={category.id} className="group">
                <Link to={`/services/`} className="block">
                  <Card className="h-full hover:shadow-md transition-shadow duration-200 border border-gray-100">
                    <CardContent className="p-5">
                      <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white`}>
                        {iconMap[category.icon]}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                      <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:text-primary">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 md:py-20 bg-white border-y border-gray-100">
        <div className="container px-4 relative z-10">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
              How It Works
            </h2>
            <p className="text-muted-foreground text-center text-sm md:text-base">
              Get your service needs met in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (visible on md screens and up) */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/20 hidden md:block"></div>
            
            {/* Step 1 */}
            <div className="relative z-10">
              <div className="bg-white p-5 relative border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary mb-3 block">STEP 1</span>
                <h3 className="text-base font-medium mb-2">Search Services</h3>
                <p className="text-muted-foreground text-sm">
                  Browse categories or search for the service you need
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10">
              <div className="bg-white p-5 relative border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary mb-3 block">STEP 2</span>
                <h3 className="text-base font-medium mb-2">Book a Time Slot</h3>
                <p className="text-muted-foreground text-sm">
                  Select a convenient time slot for your service
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10">
              <div className="bg-white p-5 relative border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary mb-3 block">STEP 3</span>
                <h3 className="text-base font-medium mb-2">Pay Securely</h3>
                <p className="text-muted-foreground text-sm">
                  Make a secure payment and get service confirmation
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
              Learn more about our process
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gray-50/50">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 border border-gray-100 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Join our growing community of service providers and customers
            </p>
            
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Find a Service
                </Button>
              </Link>
              <Link to="/become-provider">
                <Button variant="outline" className="w-full sm:w-auto">
                  Offer Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
