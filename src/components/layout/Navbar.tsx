
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  BellRing, 
  LogIn,
  Search,
  Briefcase,
  SwitchCamera,
  ArrowRightLeft
} from "lucide-react";
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
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProviderMode, setIsProviderMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // Check if on provider path and set mode accordingly
  useEffect(() => {
    const isOnProviderPath = location.pathname.startsWith('/provider');
    if (isOnProviderPath !== isProviderMode) {
      setIsProviderMode(isOnProviderPath);
    }
  }, [location.pathname, isProviderMode]);

  const isActive = (path: string) => location.pathname === path;

  const handleModeToggle = () => {
    // Navigate to the equivalent path in the other view
    const newMode = !isProviderMode;
    setIsProviderMode(newMode);
    
    if (newMode) {
      // Switch to provider mode
      if (location.pathname === '/') {
        navigate('/provider/dashboard');
      } else if (location.pathname === '/services') {
        navigate('/provider/services');
      } else {
        navigate('/provider/dashboard');
      }
      toast.success("Switched to Provider mode");
    } else {
      // Switch to client mode
      if (location.pathname.includes('/provider/dashboard')) {
        navigate('/');
      } else if (location.pathname.includes('/provider/services')) {
        navigate('/services');
      } else {
        navigate('/');
      }
      toast.success("Switched to Client mode");
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to={isProviderMode ? "/provider/dashboard" : "/"} 
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-subtle"></span>
            <span className="text-white font-bold text-xl">SC</span>
          </div>
          <span className="text-xl font-bold text-gradient-primary">SkilledConnect</span>
          {isProviderMode && (
            <span className="ml-1 text-xs font-medium py-0.5 px-2 bg-primary/10 text-primary rounded-full">
              Provider
            </span>
          )}
        </Link>

        {/* Search on large screens */}
        <div className="hidden md:flex relative max-w-md w-full mx-4">
          <Input
            type="search"
            placeholder={isProviderMode ? "Search for client requests..." : "Search for services..."}
            className="w-full pr-10 rounded-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {isProviderMode ? (
            // Provider mode navigation links
            <>
              <Link to="/provider/dashboard" className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/provider/dashboard') 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-primary"
              )}>
                Dashboard
              </Link>
              <Link to="/provider/services" className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/provider/services') 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-primary"
              )}>
                My Services
              </Link>
              <Link to="/provider/bookings" className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/provider/bookings') 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-primary"
              )}>
                Bookings
              </Link>
            </>
          ) : (
            // Client mode navigation links
            <>
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
            </>
          )}

          {/* Mode toggle button */}
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-full transition-all duration-300 ml-2 border-primary/30 bg-primary/5",
              isProviderMode ? "text-primary hover:bg-primary/10" : "text-foreground hover:bg-muted"
            )}
            onClick={handleModeToggle}
          >
            <ArrowRightLeft className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">{isProviderMode ? "Client Mode" : "Provider Mode"}</span>
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellRing className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {isProviderMode ? "5" : "3"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {isProviderMode ? (
                  // Provider notifications
                  [1, 2, 3, 4, 5].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer flex flex-col items-start py-2">
                      <p className="text-sm font-medium">New Service Request</p>
                      <p className="text-xs text-muted-foreground">You have a new request for electrical services</p>
                      <p className="text-xs text-muted-foreground mt-1">{i * 5} min ago</p>
                    </DropdownMenuItem>
                  ))
                ) : (
                  // Client notifications
                  [1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer flex flex-col items-start py-2">
                      <p className="text-sm font-medium">Booking Confirmed</p>
                      <p className="text-xs text-muted-foreground">Your booking with Electrician Pro has been confirmed</p>
                      <p className="text-xs text-muted-foreground mt-1">{i * 10} min ago</p>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isProviderMode ? (
                // Provider menu items
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/provider/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/provider/settings">
                      <User className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                // Client menu items
                <>
                  <Link to="/login">
                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login / Sign Up</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link to="/become-provider">
                    <DropdownMenuItem>
                      <Briefcase className="mr-2 h-4 w-4" />
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
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-full transition-all duration-300 border-primary/30 bg-primary/5 h-9 px-2",
              isProviderMode ? "text-primary" : "text-foreground"
            )}
            onClick={handleModeToggle}
          >
            <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">{isProviderMode ? "Client" : "Provider"}</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <BellRing className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {isProviderMode ? "5" : "3"}
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
              placeholder={isProviderMode ? "Search for client requests..." : "Search for services..."}
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex flex-col space-y-2 pb-3">
            {isProviderMode ? (
              // Provider mobile links
              <>
                <Link
                  to="/provider/dashboard"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/provider/dashboard') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/provider/services"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/provider/services') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  My Services
                </Link>
                <Link
                  to="/provider/bookings"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/provider/bookings') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Bookings
                </Link>
                <Link
                  to="/provider/profile"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/provider/profile') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/provider/settings"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/provider/settings') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/login') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              // Client mobile links
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
