import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Shield, Zap, CheckCircle2, ThumbsUp, Search, Wrench, Flower2, Hammer, Sparkles, Scissors } from 'lucide-react';
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
import BeeBackground from '@/components/BeeBackground';

// Import helper utility for animations
import { cn } from '@/lib/utils';

// Service categories
const serviceCategories = [
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
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background relative flex items-center justify-center overflow-hidden">
        {/* Background animation */}
        <BeeBackground />
        
        <div className="container px-4 z-10 -mt-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Connecting Skills with Needs
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-6 text-foreground leading-tight"
              variants={fadeInUp}
            >
              Ready to Find the <span className="text-gradient-primary">Perfect Service Provider</span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Join thousands of satisfied customers who found quality service providers through SevaBee
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <Link to="/services" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 rounded-full">
                  Find Services Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/become-provider" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full rounded-full">
                  Become a Provider
                </Button>
              </Link>
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

      {/* Service Categories Section */}
      <section className="py-20 bg-background relative">
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/services/${category.name.toLowerCase()}`} className="block">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {iconMap[category.icon]}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <Button variant="ghost" className="mt-auto group-hover:text-primary">
                        Explore services
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
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
            <Link to="/services">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
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
              How <span className="text-gradient-primary">SevaBee</span> Works
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
                Join thousands of satisfied customers who found quality service providers through SevaBee
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 rounded-full">
                    Find Services Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/become-provider">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
