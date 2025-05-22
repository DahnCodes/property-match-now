
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from '@/context/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, role } = useUser();
  
  // We want to hide the navbar on the dashboard
  if (location.pathname.includes('/dashboard')) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-estate-600 font-bold text-2xl">PropertyMatch</span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/properties" className="text-gray-700 hover:text-estate-600 px-3 py-2 rounded-md text-sm font-medium">
              Properties
            </Link>
            <Link to="/agents" className="text-gray-700 hover:text-estate-600 px-3 py-2 rounded-md text-sm font-medium">
              Agents
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-estate-600 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-estate-600 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop buttons or user avatar */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-estate-200 text-estate-700">
                    {role === 'agent' ? 'AG' : 'HS'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Link to="/login" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="bg-estate-600 hover:bg-estate-700">
                  <Link to="/register" className="text-white">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-estate-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/properties"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/agents"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Agents
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-estate-200 text-estate-700">
                      {role === 'agent' ? 'AG' : 'HS'}
                    </AvatarFallback>
                  </Avatar>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-estate-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-estate-600 hover:bg-estate-700 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
