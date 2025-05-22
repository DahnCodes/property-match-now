
import React from 'react';
import PropertyCard from '../PropertyCard';
import { usePropertyStore } from '@/stores/propertyStore';
import { useUser } from '@/context/UserContext';

const PropertyListings: React.FC = () => {
  const { properties } = usePropertyStore();
  const { role } = useUser();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {role === 'agent' ? 'Your Properties' : 'Latest Properties'}
        </h2>
      </div>
      
      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <Home className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No properties available</h3>
          <p className="mt-2 text-gray-500">
            {role === 'agent' 
              ? 'Upload properties using the form above to see them here.' 
              : 'Check back later for new property listings.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings;
