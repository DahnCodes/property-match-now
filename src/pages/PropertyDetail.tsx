
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  MapPin, 
  Home, 
  Tag, 
  Mail, 
  Phone,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPropertyDetails, getAgentDetails } from '../services/mockData';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const property = getPropertyDetails(id || '');
  const agent = property ? getAgentDetails(property.agentId) : null;
  
  if (!property || !agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Property not found</h2>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/properties">
              <Button className="bg-estate-600 hover:bg-estate-700">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800',
    rented: 'bg-blue-100 text-blue-800',
  };

  const images = [
    property.imageUrl,
    "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&q=80&w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&q=80&w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&q=80&w=600&h=400&fit=crop",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-estate-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/properties" className="hover:text-estate-600">Properties</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{property.title}</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Property Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{property.address}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-estate-600 mb-2">${property.price.toLocaleString()}</div>
              <Badge className={`${statusColors[property.status]}`}>
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <img 
                  src={images[0]} 
                  alt={property.title} 
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                {images.slice(1).map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`${property.title} ${index + 2}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Property details and agent info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Main details */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bed size={24} className="text-estate-600 mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bath size={24} className="text-estate-600 mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="font-semibold">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Square size={24} className="text-estate-600 mb-2" />
                    <span className="text-sm text-gray-500">Area</span>
                    <span className="font-semibold">{property.squareFeet} ft²</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Home size={24} className="text-estate-600 mb-2" />
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="font-semibold">{property.propertyType}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{property.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tabs for additional content */}
              <Tabs defaultValue="location">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                  <TabsTrigger value="overview">Property Overview</TabsTrigger>
                </TabsList>
                <TabsContent value="location" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Location</h3>
                  <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-500">Map View (Will be implemented in future version)</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin size={20} className="text-estate-600 mr-2 mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">{property.address}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="floorplan" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Floor Plan</h3>
                  <div className="bg-gray-100 w-full h-64 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Floor Plan (Will be implemented in future version)</span>
                  </div>
                </TabsContent>
                <TabsContent value="overview" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Property Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Property ID</p>
                      <p className="font-medium">{property.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Property Type</p>
                      <p className="font-medium">{property.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="font-medium capitalize">{property.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Area</p>
                      <p className="font-medium">{property.squareFeet} ft²</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Agent info and contact form */}
            <div className="lg:col-span-1">
              <Card className="mb-6 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold mb-4">Listed By</h3>
                    <div className="flex items-center">
                      <img
                        src={agent.profileImage}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <Link to={`/agent/${agent.id}`} className="font-medium text-lg hover:text-estate-600">
                          {agent.name}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{agent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${agent.phoneNumber}`}
                        className="flex justify-center items-center py-2 px-3 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Phone size={16} className="mr-2" />
                        Call
                      </a>
                      <Link
                        to={`/agent/${agent.id}`}
                        className="flex justify-center items-center py-2 px-3 text-sm text-estate-600 border border-estate-200 bg-estate-50 rounded-md hover:bg-estate-100 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Contact Agent</h3>
                    <form>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500"
                            defaultValue={`Hello, I am interested in ${property.title}.`}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-estate-600 hover:bg-estate-700">
                          <Mail size={16} className="mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Schedule a Viewing</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-estate-500 focus:border-estate-500"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-estate-600 hover:bg-estate-700">
                    Request Viewing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
