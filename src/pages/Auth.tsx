import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

import { motion } from 'framer-motion';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone,
  User,
  ArrowRight,
  Check,
  X,
  Facebook,
  Mail as MailIcon,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
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

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || `Failed to sign in with ${provider}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);
    try {
      const { error, success } = await signIn(email, password);

      if (error) throw error;

      if (success) {
        const userEmail = email.split('@')[0];
        toast({
          title: `Welcome back, ${userEmail}!`,
          description: "You have successfully signed in",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !phone) {
      toast({
        title: "Invalid signup",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    // Password validation
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      toast({
        variant: "destructive",
        title: "Invalid password",
        description: "Password must meet all requirements",
      });
      return;
    }
    
    setLoading(true);
    try {
      const { error, success } = await signUp(email, password);

      if (error) throw error;

      if (success) {
        toast({
          title: `Welcome to SevaBee, ${name}!`,
          description: "Your account has been created successfully.",
        });
        // Store additional user data in Supabase profiles table
        // You'll need to create this table in your Supabase dashboard
        // and set up the appropriate RLS policies
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: (await supabase.auth.getUser()).data.user?.id,
              full_name: name,
              phone: phone,
            }
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Check your email for the password reset link",
      });
      setIsForgotPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset password email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-pattern opacity-30 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/10 rounded-full animate-float animation-delay-300 blur-3xl"></div>
      
      <div className="container px-4 z-10">
        <div className="flex justify-center mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-md mx-auto w-full"
        >
          <motion.div variants={fadeInUp} className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="relative w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">SC</span>
              </div>
              <span className="text-xl font-bold ml-2 text-gradient-primary">SevaBee</span>
            </Link>
            
            <h1 className="text-2xl font-bold mb-2">
              {isSignUp 
                ? "Join SevaBee to discover skilled professionals"
                : "Welcome back"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Join SevaBee to discover skilled professionals" 
                : "Sign in to access your account"}
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="border border-border/50 shadow-sm">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="data-[state=active]:bg-primary/10">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-primary/10">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button
                            type="button"
                            variant="link"
                            className="px-0 text-amber-600 hover:text-amber-700"
                            onClick={() => setIsForgotPassword(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm text-muted-foreground"
                        >
                          Remember me for 30 days
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
{/*                       
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-2 text-xs text-muted-foreground">
                            OR CONTINUE WITH
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button" className="w-full">
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                          <MailIcon className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                      </div> */}
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="p-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            className="pl-10"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {password && (
                        <div className="space-y-2">
                          <Label className="text-xs">Password Strength</Label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              {password.length >= 8 ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <X className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className={password.length >= 8 ? "text-green-500" : "text-muted-foreground"}>
                                At least 8 characters
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              {/[A-Z]/.test(password) ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <X className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className={/[A-Z]/.test(password) ? "text-green-500" : "text-muted-foreground"}>
                                Contains uppercase letter
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              {/[0-9]/.test(password) ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <X className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className={/[0-9]/.test(password) ? "text-green-500" : "text-muted-foreground"}>
                                Contains number
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms}
                          onCheckedChange={(checked) => {
                            if (typeof checked === 'boolean') {
                              setAgreeTerms(checked);
                            }
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accept terms and conditions
                          </label>
                          <p className="text-xs text-muted-foreground">
                            By creating an account, you agree to our{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                            .
                          </p>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create account'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      {/* <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-2 text-xs text-muted-foreground">
                            OR CONTINUE WITH
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button" className="w-full">
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                          <MailIcon className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                      </div> */}
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setActiveTab("login")}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isForgotPassword && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md border-amber-100">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-amber-100 focus:border-amber-200"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-amber-100 hover:border-amber-200"
                      onClick={() => setIsForgotPassword(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
