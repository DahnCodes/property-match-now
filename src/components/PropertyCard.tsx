
import React from 'react';
import { Link } from 'react-router-dom';
import { Bath, Bed, Square, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

export interface PropertyProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  propertyType: string;
  status: 'available' | 'pending' | 'sold' | 'rented';
}

const PropertyCard: React.FC<PropertyProps> = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrl,
  propertyType,
  status,
}) => {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800',
    rented: 'bg-blue-100 text-blue-800',
  };

  return (
    <Card className="property-card overflow-hidden border border-gray-200 rounded-lg shadow-sm h-full">
      <div className="relative">
        <Link to={`/property/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </Link>
        <Badge className={`absolute top-2 right-2 ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
              <Link to={`/property/${id}`}>{title}</Link>
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gray-100">
            {propertyType}
          </Badge>
        </div>
        <p className="text-estate-600 font-bold text-xl">${price.toLocaleString()}</p>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex items-center">
            <Bed size={16} className="mr-1.5 text-gray-500" />
            <span className="text-sm">{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1.5 text-gray-500" />
            <span className="text-sm">{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          <div className="flex items-center">
            <Square size={16} className="mr-1.5 text-gray-500" />
            <span className="text-sm">{squareFeet.toLocaleString()} ft²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Link
          to={`/property/${id}`}
          className="w-full text-center py-2 px-4 bg-estate-100 text-estate-800 font-medium rounded hover:bg-estate-200 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
