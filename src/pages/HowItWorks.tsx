import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Star, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  Shield, 
  ThumbsUp, 
  Users, 
  CreditCard,
  CheckCircle2,
  Award,
  User,
  Briefcase,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6
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

// FAQs
const faqs = [
  {
    question: 'How do I book a service on SkilledConnect?',
    answer: 'Booking a service is simple. Browse our categories or search for the service you need, select a provider based on reviews and ratings, choose your preferred date and time, and confirm your booking. You'll receive instant confirmation and can track your booking status in your account.'
  },
  {
    question: 'How are service providers verified?',
    answer: 'We verify all service providers through a rigorous process that includes identity verification, skill assessment, background checks, and customer reviews. Providers with a "Verified" badge have successfully completed our verification process.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept multiple payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and you'll only be charged after the service is completed to your satisfaction.'
  },
  {
    question: 'Can I reschedule or cancel my booking?',
    answer: 'Yes, you can reschedule or cancel your booking through your account. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee. Refer to our cancellation policy for more details.'
  },
  {
    question: 'How do I become a service provider?',
    answer: 'To become a service provider on SkilledConnect, click on "Become a Provider" in the navigation menu. Complete your profile with your skills, experience, and availability. Our team will review your application and guide you through the verification process.'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes, we offer a satisfaction guarantee. If you're not satisfied with the service provided, you can raise a dispute within 24 hours of service completion, and our customer support team will help resolve the issue.'
  },
  {
    question: 'How are service providers rated?',
    answer: 'After each completed service, customers can rate their experience on a scale of 1-5 stars and leave a review. These ratings and reviews help maintain quality standards and assist other customers in making informed decisions.'
  },
  {
    question: 'Are there any membership fees?',
    answer: 'No, there are no membership fees for customers to use SkilledConnect. Service providers pay a small commission on completed bookings, but there are no upfront or monthly fees.'
  }
];

const HowItWorks = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/10 rounded-full animate-float animation-delay-300 blur-3xl"></div>
        
        <div className="container px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-gradient-primary">SkilledConnect</span> Works
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connecting skilled professionals with customers in just a few simple steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">
              Connecting You with Skilled Professionals
            </h2>
            <p className="text-muted-foreground">
              Our streamlined process makes finding and booking services effortless
            </p>
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
              <div className="bg-background rounded-xl p-8 text-center relative z-10 h-full shadow-md border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-4 right-8 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold mb-4">Search & Browse</h3>
                <p className="text-muted-foreground">
                  Search for specific services or browse through various categories to find skilled professionals near you.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-background rounded-xl p-8 text-center relative z-10 h-full shadow-md border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-4 right-8 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold mb-4">Choose Provider</h3>
                <p className="text-muted-foreground">
                  Compare profiles, ratings, reviews, and prices to select the best service provider for your needs.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-background rounded-xl p-8 text-center relative z-10 h-full shadow-md border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-4 right-8 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</div>
                <h3 className="text-xl font-semibold mb-4">Book & Pay</h3>
                <p className="text-muted-foreground">
                  Schedule the service at your preferred time, make secure payment, and enjoy quality service.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">
              For <span className="text-gradient-primary">Customers</span>
            </h2>
            <p className="text-muted-foreground">
              Discover how SkilledConnect makes finding and booking services effortless
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy Search</CardTitle>
                  <CardDescription>
                    Find the right service provider with our powerful search and filter options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Search by service type, location, or availability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Filter by ratings, experience, and price range</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Browse verified service providers near you</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Verified Professionals</CardTitle>
                  <CardDescription>
                    Connect with skilled and vetted service providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>All providers undergo thorough verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>View detailed profiles with ratings and reviews</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>See samples of previous work and certifications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Flexible Booking</CardTitle>
                  <CardDescription>
                    Book services at your convenience with our easy scheduling system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Schedule services for immediate or future needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Easily reschedule or cancel if needed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Get reminders and real-time updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Payments</CardTitle>
                  <CardDescription>
                    Pay safely and conveniently through our secure payment system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Multiple payment options including cards, UPI, etc.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Payment is processed only after service completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Digital receipts and invoices for all transactions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Direct Communication</CardTitle>
                  <CardDescription>
                    Chat directly with service providers before and during service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Discuss requirements and ask questions before booking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Share location and additional details securely</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Stay in touch during service delivery</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Satisfaction Guarantee</CardTitle>
                  <CardDescription>
                    Your satisfaction is our priority with our service guarantee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Rate and review services after completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Dedicated customer support for any issues</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>Service guarantee with dispute resolution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Find Services Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Providers Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">
              For <span className="text-gradient-primary">Service Providers</span>
            </h2>
            <p className="text-muted-foreground">
              Join our platform to grow your business and connect with more customers
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <Card className="overflow-hidden border border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Join Our Network</h3>
                    <p className="text-muted-foreground mb-6">
                      SkilledConnect helps skilled professionals like you grow your business by connecting you with customers looking for your services.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Expand Your Customer Base</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect with new customers in your area looking for your specific skills
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Showcase Your Work</h4>
                          <p className="text-sm text-muted-foreground">
                            Create a professional profile highlighting your skills and past work
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Build Your Reputation</h4>
                          <p className="text-sm text-muted-foreground">
                            Earn ratings and reviews to build trust with potential customers
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link to="/become-provider">
                        <Button className="bg-gradient-primary hover:opacity-90">
                          Become a Provider
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-8 flex flex-col justify-center">
                    <h4 className="font-semibold mb-6 flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      Provider Benefits
                    </h4>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">Free profile creation and verification</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">Set your own prices and availability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">Manage bookings from a dedicated dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">Secure and timely payments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">No monthly fees - only pay when you earn</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">Dedicated support for service providers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Provider Sign-up Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative pl-8 pb-8 border-l border-primary/20 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <h4 className="font-medium mb-2">Create Your Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign up and create your detailed profile with your skills, experience, and portfolio
                    </p>
                  </div>
                  
                  <div className="relative pl-8 pb-8 border-l border-primary/20 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <h4 className="font-medium mb-2">Complete Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Submit required documents for identity and skills verification
                    </p>
                  </div>
                  
                  <div className="relative pl-8 pb-8 border-l border-primary/20 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <h4 className="font-medium mb-2">Set Up Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Add your services with descriptions, pricing, and availability
                    </p>
                  </div>
                  
                  <div className="relative pl-8 border-l border-primary/20 last:border-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <h4 className="font-medium mb-2">Start Receiving Bookings</h4>
                    <p className="text-sm text-muted-foreground">
                      Once approved, your profile goes live and you can start receiving booking requests
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Map className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>How Matching Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our intelligent matching system connects you with customers looking for your specific skills in your service area.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Location-Based Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll be matched with customers in your service area, minimizing travel time and maximizing your working hours.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Skill-Based Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        Our algorithm matches you with customers looking specifically for your skills and expertise level.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Availability Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        You only receive booking requests for times when you've set yourself as available.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about using SkilledConnect
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-secondary/5 to-background rounded-2xl p-12 border border-primary/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <motion.div 
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started with <span className="text-gradient-primary">SkilledConnect?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and service providers on our platform
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
                    Find Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/become-provider">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
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

export default HowItWorks;
