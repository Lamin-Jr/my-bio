import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Portfolio App', 
  description = 'A personal portfolio application with task management and blogging capabilities'
}) => {
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <motion.main 
          className="flex-grow pt-16"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          {children}
        </motion.main>
        
        <Footer />
      </div>
    </>
  );
};