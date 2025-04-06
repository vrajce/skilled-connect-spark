import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from "@/components/ui/sonner";
import BeeBackground from '../BeeBackground';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BeeBackground />
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
