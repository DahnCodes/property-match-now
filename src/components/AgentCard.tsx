
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

export interface AgentProps {
  id: string;
  name: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  location: string;
  specializations: string[];
  phoneNumber: string;
  email: string;
}

const AgentCard: React.FC<AgentProps> = ({
  id,
  name,
  profileImage,
  rating,
  reviewCount,
  yearsExperience,
  location,
  specializations,
  phoneNumber,
  email,
}) => {
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-estate-200"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              <Link to={`/agent/${id}`}>{name}</Link>
            </h3>
            <div className="flex items-center justify-center sm:justify-start mb-2">
              <div className="flex items-center mr-2">
                <Star size={16} fill="#FFC107" className="text-yellow-400" />
                <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500 mb-2">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
            <p className="text-sm mb-2">{yearsExperience} years of experience</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-1 mb-3">
              {specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 p-4 bg-gray-50 border-t border-gray-100">
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 flex justify-center items-center py-2 px-3 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Phone size={16} className="mr-2" />
          Call
        </a>
        <a
          href={`mailto:${email}`}
          className="flex-1 flex justify-center items-center py-2 px-3 text-sm bg-estate-100 text-estate-800 border border-estate-200 rounded-md hover:bg-estate-200 transition-colors"
        >
          <Mail size={16} className="mr-2" />
          Email
        </a>
        <Link
          to={`/agent/${id}`}
          className="flex-1 flex justify-center items-center py-2 px-3 text-sm bg-estate-600 text-white rounded-md hover:bg-estate-700 transition-colors"
        >
          View Profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
