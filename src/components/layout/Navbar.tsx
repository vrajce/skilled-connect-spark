import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  BellRing, 
  LogIn,
  LogOut,
  Settings,
  Search,
  Shield,
  SwitchCamera,
  CalendarDays
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useView } from '@/contexts/ViewContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
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
import { NotificationDropdown } from '@/components/notifications';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isProviderView, toggleView, isProvider } = useView();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('is_super_admin')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
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
        <Link to="/" className="text-2xl font-bold">
          SkillConnect
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/services"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive('/services') && "text-primary"
            )}
          >
            Services
          </Link>
          <Link
            to="/providers"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive('/providers') && "text-primary"
            )}
          >
            Providers
          </Link>
          <Link
            to="/how-it-works"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive('/how-it-works') && "text-primary"
            )}
          >
            How It Works
          </Link>
        </div>

        {/* Right Side Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* View Switcher */}
          {isProvider && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleView}
              className="flex items-center"
            >
              <SwitchCamera className="mr-2 h-4 w-4" />
              Switch to {isProviderView ? 'User' : 'Provider'} View
            </Button>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <NotificationDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback>
                        {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.user_metadata?.full_name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  {isProvider && (
                    <DropdownMenuItem onClick={toggleView}>
                      <SwitchCamera className="mr-2 h-4 w-4" />
                      <span>Switch to {isProviderView ? 'User' : 'Provider'} View</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/bookings">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
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
            {user ? (
              <>
                {isProvider && (
                  <button
                    onClick={() => {
                      toggleView();
                      setIsOpen(false);
                    }}
                    className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 text-left flex items-center"
                  >
                    <SwitchCamera className="mr-2 h-4 w-4" />
                    Switch to {isProviderView ? 'User' : 'Provider'} View
                  </button>
                )}
                <Link
                  to="/bookings"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/bookings') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <CalendarDays className="mr-2 h-4 w-4 inline" />
                  My Bookings
                </Link>
                <Link
                  to="/settings"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/settings') ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 text-left flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive('/auth') ? "bg-primary/10 text-primary" : "text-foreground/80"
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
