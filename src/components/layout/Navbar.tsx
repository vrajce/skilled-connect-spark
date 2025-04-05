
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  BellRing, 
  LogIn,
  LogOut,
  Settings,
  Search
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    if (user) {
      checkProviderStatus();
    }
  }, [user]);

  const checkProviderStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      setIsProvider(!!data);
    } catch (error) {
      console.error('Error checking provider status:', error);
    }
  };

  const handleProviderSwitch = async () => {
    if (!isProvider) {
      navigate('/become-provider');
      return;
    }

    try {
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (providerError) throw providerError;

      navigate('/provider/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to switch to provider view",
      });
    }
  };
  
  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-subtle"></span>
            <span className="text-white font-bold text-xl">SC</span>
          </div>
          <span className="text-xl font-bold text-gradient-primary">SkilledConnect</span>
        </Link>

        {/* Search on large screens */}
        <div className="hidden md:flex relative max-w-md w-full mx-4">
          <Input
            type="search"
            placeholder="Search for services..."
            className="w-full pr-10 rounded-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/services" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive('/services') 
              ? "text-primary font-semibold" 
              : "text-foreground/80 hover:text-primary"
          )}>
            Services
          </Link>
          <Link to="/providers" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive('/providers') 
              ? "text-primary font-semibold" 
              : "text-foreground/80 hover:text-primary"
          )}>
            Providers
          </Link>
          <Link to="/how-it-works" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive('/how-it-works') 
              ? "text-primary font-semibold" 
              : "text-foreground/80 hover:text-primary"
          )}>
            How It Works
          </Link>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellRing className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer flex flex-col items-start py-2">
                    <p className="text-sm font-medium">Booking Confirmed</p>
                    <p className="text-xs text-muted-foreground">Your booking with Electrician Pro has been confirmed</p>
                    <p className="text-xs text-muted-foreground mt-1">10 min ago</p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ''} />
                    <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProviderSwitch}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{isProvider ? 'Switch to Provider View' : 'Become a Provider'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    try {
                      await signOut();
                      toast({
                        title: "Logged out successfully",
                        description: "See you again!"
                      });
                      navigate('/');
                    } catch (error: any) {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: error.message || "Failed to log out"
                      });
                    }
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login / Sign Up</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link to="/become-provider">
                    <DropdownMenuItem>
                      Become a Provider
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <BellRing className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-background`}
      >
        <div className="container mx-auto px-4 py-2 space-y-3">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for services..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex flex-col space-y-2 pb-3">
            <Link
              to="/services"
              className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                isActive('/services') ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/providers"
              className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                isActive('/providers') ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Providers
            </Link>
            <Link
              to="/how-it-works"
              className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                isActive('/how-it-works') ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/login"
              className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                isActive('/login') ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Login / Sign Up
            </Link>
            <Link
              to="/become-provider"
              className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                isActive('/become-provider') ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
