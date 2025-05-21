
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-estate-50 to-estate-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-estate-600">Property Match</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced real estate agents who understand your needs and help you find your dream home.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto p-6 relative z-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="City or Zip Code" className="pl-10" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500">
                  <option value="">Any Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <Link to="/properties" className="w-full">
                <Button className="w-full bg-estate-600 hover:bg-estate-700 h-10">
                  <Search className="mr-2 h-4 w-4" />
                  Search Properties
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="inline-block text-sm text-estate-800 bg-estate-100 rounded-full px-3 py-1">Popular: </span>
            <Link to="/properties?location=san-francisco" className="inline-block text-sm text-gray-600 hover:text-estate-600 bg-white rounded-full px-3 py-1 border border-gray-200 hover:border-estate-200 transition">
              San Francisco
            </Link>
            <Link to="/properties?location=new-york" className="inline-block text-sm text-gray-600 hover:text-estate-600 bg-white rounded-full px-3 py-1 border border-gray-200 hover:border-estate-200 transition">
              New York
            </Link>
            <Link to="/properties?location=los-angeles" className="inline-block text-sm text-gray-600 hover:text-estate-600 bg-white rounded-full px-3 py-1 border border-gray-200 hover:border-estate-200 transition">
              Los Angeles
            </Link>
            <Link to="/properties?location=chicago" className="inline-block text-sm text-gray-600 hover:text-estate-600 bg-white rounded-full px-3 py-1 border border-gray-200 hover:border-estate-200 transition">
              Chicago
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <div className="text-center py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-4xl font-bold text-estate-600">5,000+</p>
            <p className="text-gray-600">Available Properties</p>
          </div>
          <div className="text-center py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-4xl font-bold text-estate-600">1,200+</p>
            <p className="text-gray-600">Trusted Agents</p>
          </div>
          <div className="text-center py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-4xl font-bold text-estate-600">15K+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
