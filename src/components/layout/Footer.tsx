import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/30">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-14 w-14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Bee body */}
                <ellipse cx="12" cy="12" rx="5" ry="3" className="fill-amber-400" />
                {/* Stripes */}
                <rect x="9" y="10" width="1.5" height="4" className="fill-amber-900" />
                <rect x="13.5" y="10" width="1.5" height="4" className="fill-amber-900" />
                {/* Wings */}
                <ellipse cx="12" cy="9" rx="3" ry="1.5" className="fill-white/80" />
                {/* Antennae */}
                <line x1="9" y1="8" x2="7" y2="6" className="stroke-amber-900" />
                <line x1="15" y1="8" x2="17" y2="6" className="stroke-amber-900" />
              </svg>
              <span className="text-2xl font-bold text-gradient-primary">SevaBee</span>
            </Link>
            <p className="text-muted-foreground">
              Connecting you with skilled professionals for all your service needs. Quality service providers at your fingertips.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Services
                </Link>
              </li>
              <li>
                <Link to="/providers" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Providers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/become-provider" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SevaBee. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
