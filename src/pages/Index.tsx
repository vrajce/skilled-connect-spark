
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Shield, Zap, CheckCircle2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import helper utility for animations
import { cn } from '@/lib/utils';

// Service categories
const serviceCategories = [
  {
    id: 1,
    name: 'Plumbing',
    icon: '/assets/icons/plumbing.svg',
    color: 'bg-blue-500',
    description: 'Fix leaks, installations & repairs',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4d9aa3faeb?auto=format&fit=crop&q=80&w=500&h=350'
  },
  {
    id: 2,
    name: 'Electrical',
    icon: '/assets/icons/electrical.svg',
    color: 'bg-yellow-500',
    description: 'Wiring, fixtures & repairs',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=500&h=350'
  },
  {
    id: 3,
    name: 'Mehendi',
    icon: '/assets/icons/mehendi.svg',
    color: 'bg-red-500',
    description: 'Traditional & modern designs',
    image: 'https://images.unsplash.com/photo-1600101628594-b7ea1f023024?auto=format&fit=crop&q=80&w=500&h=350'
  },
  {
    id: 4,
    name: 'Carpentry',
    icon: '/assets/icons/carpentry.svg', 
    color: 'bg-amber-600',
    description: 'Furniture repair & custom builds',
    image: 'https://images.unsplash.com/photo-1550965002-5eb3f7440950?auto=format&fit=crop&q=80&w=500&h=350'
  },
  {
    id: 5,
    name: 'Home Cleaning',
    icon: '/assets/icons/cleaning.svg',
    color: 'bg-green-500',
    description: 'Deep cleaning & sanitization',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500&h=350'
  },
  {
    id: 6,
    name: 'Tailoring',
    icon: '/assets/icons/tailoring.svg',
    color: 'bg-purple-500',
    description: 'Custom designs & alterations',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500&h=350'
  },
];

// Featured providers
const featuredProviders = [
  {
    id: 1,
    name: 'Rahul Sharma',
    specialty: 'Electrician',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    reviewCount: 127,
    location: 'Mumbai',
    verified: true
  },
  {
    id: 2,
    name: 'Priya Patel',
    specialty: 'Mehendi Artist',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5.0,
    reviewCount: 89,
    location: 'Delhi',
    verified: true
  },
  {
    id: 3,
    name: 'Vikram Singh',
    specialty: 'Plumber',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.7,
    reviewCount: 65,
    location: 'Bangalore',
    verified: true
  },
  {
    id: 4,
    name: 'Ananya Mehta',
    specialty: 'Tailor',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    rating: 4.8,
    reviewCount: 103,
    location: 'Hyderabad',
    verified: true
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    role: 'Homeowner',
    content: 'SkilledConnect made finding a reliable plumber so easy! The service was prompt and professional. Will definitely use again.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Meera Desai',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    role: 'Event Planner',
    content: 'I found an amazing mehendi artist for my client's wedding through this platform. The booking process was seamless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Arjun Reddy',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    role: 'Restaurant Owner',
    content: 'When our AC broke down during peak summer, SkilledConnect connected us with an HVAC technician within hours. Saved our business!',
    rating: 4,
  },
];

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

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
      {/* Hero Section with 3D Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern with parallax effect */}
        <div className="absolute inset-0 hero-pattern opacity-30 z-0"></div>
        
        {/* Floating elements */}
        <div ref={heroRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-secondary/20 rounded-full animate-float animation-delay-300 blur-xl"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/20 rounded-full animate-float animation-delay-500 blur-xl"></div>
        </div>
        
        <div className="container px-4 z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span 
              className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              Connecting Skills with Needs
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              variants={fadeInUp}
            >
              Find <span className="text-gradient-primary">Skilled Professionals</span> For All Your Service Needs
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Connect with verified service providers near you for plumbing, electrical work, 
              mehendi art, carpentry, and more. Quality service at your fingertips.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="relative w-full sm:w-3/4">
                <Input 
                  type="text" 
                  placeholder="What service do you need?" 
                  className="pr-12 h-12 rounded-full text-base"
                />
                <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
              <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 rounded-full">
                Find Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
              variants={fadeInUp}
            >
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="mr-2 h-4 w-4 text-primary" />
                <span>Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-primary" />
                <span>Secure Payments</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Service Categories Section with 3D Cards */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Find Services For Your <span className="text-gradient-primary">Every Need</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={fadeInUp}
            >
              Browse through our categories of skilled professionals ready to help with your requirements
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/services/${category.name.toLowerCase()}`} className="block">
                  <div className="service-card rounded-xl overflow-hidden h-64 transition-all duration-500 group-hover:shadow-xl">
                    {/* Service Image */}
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg`}>
                        <img src={category.icon} alt="" className="w-6 h-6 text-white" onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/24/ffffff/ffffff?text=${category.name[0]}`;
                        }} />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-1">{category.name}</h3>
                      <p className="text-white/90 text-sm">{category.description}</p>
                      
                      <div className="mt-3 flex items-center text-white text-sm opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <span>Explore services</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/services">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Animated Steps */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-primary/5 rounded-full"></div>
          <div className="absolute -left-20 top-20 w-40 h-40 bg-secondary/5 rounded-full"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              How <span className="text-gradient-primary">SkilledConnect</span> Works
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={fadeInUp}
            >
              Get the service you need in just a few simple steps
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Connecting line (visible on md screens and up) */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/20 hidden md:block"></div>
            
            {/* Step 1 */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-background rounded-xl p-6 text-center relative z-10 h-full glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold mb-4">Search Services</h3>
                <p className="text-muted-foreground">
                  Browse through various service categories or search for specific services you need.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-background rounded-xl p-6 text-center relative z-10 h-full glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold mb-4">Choose Provider</h3>
                <p className="text-muted-foreground">
                  Select from verified service providers based on ratings, reviews, and availability.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-background rounded-xl p-6 text-center relative z-10 h-full glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</div>
                <h3 className="text-xl font-semibold mb-4">Book & Enjoy</h3>
                <p className="text-muted-foreground">
                  Schedule the service, make secure payment, and get quality service at your convenience.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/how-it-works">
              <Button className="rounded-full bg-gradient-primary hover:opacity-90">
                Learn More About the Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Our Top <span className="text-gradient-primary">Service Providers</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={fadeInUp}
            >
              Highly rated professionals ready to deliver quality service
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {featuredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                className="group"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/providers/${provider.id}`}>
                  <Card className="overflow-hidden hover-scale bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-4 ring-2 ring-primary/20">
                          <AvatarImage src={provider.image} alt={provider.name} />
                          <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                        
                        <div className="flex items-center justify-center mb-3">
                          <Badge variant="secondary" className="font-normal">
                            {provider.specialty}
                          </Badge>
                          {provider.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-200">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center mb-2 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-foreground font-medium">{provider.rating}</span>
                          <span className="ml-1 text-muted-foreground text-sm">({provider.reviewCount})</span>
                        </div>
                        
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{provider.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/providers">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Providers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with Carousel */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              What Our <span className="text-gradient-primary">Customers Say</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={fadeInUp}
            >
              Read testimonials from satisfied customers who found the perfect service provider
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 h-full">
                    <div className="p-1 h-full">
                      <Card className="h-full bg-background/80 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={testimonial.image} alt={testimonial.name} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex mb-4 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn(
                                "h-4 w-4",
                                i < testimonial.rating ? "fill-current" : "text-muted"
                              )} />
                            ))}
                          </div>
                          
                          <p className="text-muted-foreground flex-grow mb-4">"{testimonial.content}"</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6 gap-2">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.03] pointer-events-none"></div>
        
        <div className="container px-4 relative">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-secondary/5 to-background rounded-2xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <motion.div 
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Ready to Find the <span className="text-gradient-primary">Perfect Service Provider?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found quality service providers through SkilledConnect
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 rounded-full">
                  Find Services Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full">
                  Become a Provider
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
