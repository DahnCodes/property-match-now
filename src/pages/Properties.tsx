
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import { mockProperties, searchProperties } from '../services/mockData';
import { Button } from '@/components/ui/button';
import { SearchFilters } from '../components/SearchFilter';

const Properties: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState(mockProperties);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Parse URL query parameters for initial search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location');
    
    if (locationParam) {
      const initialFilters: SearchFilters = {
        location: locationParam,
        propertyType: '',
        priceRange: [0, 2000000],
        bedrooms: '',
        bathrooms: '',
        sortBy: 'newest',
      };
      
      handleSearch(initialFilters);
    }
  }, [location.search]);

  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const results = searchProperties(filters);
      setProperties(results);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Properties</h1>
            <p className="text-gray-600 mt-2">Find your perfect property from our extensive listings</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and filters */}
          <div className="mb-8">
            <SearchFilter onSearch={handleSearch} />
          </div>
          
          {/* Results controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-estate-600 hover:bg-estate-700' : ''}
              >
                <Grid size={16} className="mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-estate-600 hover:bg-estate-700' : ''}
              >
                <List size={16} className="mr-1" />
                List
              </Button>
            </div>
          </div>
          
          {/* Properties grid/list */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-600"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
          
          {/* Pagination - just for UI demo, not functional in MVP */}
          {properties.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled className="text-gray-400">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-estate-600 text-white hover:bg-estate-700">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">
                  8
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
