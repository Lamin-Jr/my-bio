import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Computer, User, LogOut } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/Button';
import {useAuth} from "@hooks/useAuth.ts";
import {useTheme} from "@hooks/useTheme.ts";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/info' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <Computer className="h-4 w-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value as any)}
                  className={`p-1.5 rounded-full ${
                    theme === option.value
                      ? 'bg-white dark:bg-gray-700 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  title={option.label}
                >
                  {option.icon}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" leftIcon={<User className="h-4 w-4" />}>
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Theme
              </p>
              <div className="flex space-x-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value as any)}
                    className={`p-2 rounded-md flex items-center space-x-2 ${
                      theme === option.value
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              {currentUser ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/profile" onClick={closeMenu}>
                    <Button
                      variant="ghost"
                      fullWidth
                      className="justify-start"
                      leftIcon={<User className="h-4 w-4" />}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                    leftIcon={<LogOut className="h-4 w-4" />}
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="default" fullWidth>
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};