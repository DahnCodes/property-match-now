
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin,
  Calendar, 
  Award,
  MessageSquare,
  Building,
  Users,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { getAgentDetails, getAgentProperties } from '../services/mockData';

const AgentDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const agent = getAgentDetails(id || '');
  const agentProperties = agent ? getAgentProperties(agent.id) : [];
  
  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Agent not found</h2>
            <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist or has been removed.</p>
            <Link to="/agents">
              <Button className="bg-estate-600 hover:bg-estate-700">
                Browse All Agents
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Link to="/agents" className="hover:text-estate-600">Agents</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{agent.name}</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Agent header */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex justify-center">
                <img
                  src={agent.profileImage}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full object-cover border-2 border-estate-200"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{agent.name}</h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <span>{agent.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-2">
                    <a
                      href={`tel:${agent.phoneNumber}`}
                      className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Phone size={16} className="mr-2" />
                      Call
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex justify-center items-center py-2 px-4 bg-estate-600 text-white rounded-md hover:bg-estate-700 transition-colors"
                    >
                      <Mail size={16} className="mr-2" />
                      Email
                    </a>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="font-semibold">{agent.yearsExperience} years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Properties</span>
                    <span className="font-semibold">{agent.listings}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Rating</span>
                    <div className="flex items-center">
                      <Star size={16} fill="#FFC107" className="text-yellow-400 mr-1" />
                      <span className="font-semibold">{agent.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({agent.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Languages</span>
                    <span className="font-semibold">{agent.languages.join(", ")}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="bg-estate-100 text-estate-800 border border-estate-200">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="listings">Listings</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">About {agent.name}</h2>
                  <p className="text-gray-700 mb-6">{agent.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold flex items-center mb-3">
                        <Award size={20} className="text-estate-600 mr-2" />
                        Professional Experience
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 mt-1">•</span>
                          <span className="ml-2">{agent.yearsExperience} years of experience in real estate</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 mt-1">•</span>
                          <span className="ml-2">Successfully closed {agent.transactions} transactions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 mt-1">•</span>
                          <span className="ml-2">Specialist in {agent.specializations.join(", ")}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold flex items-center mb-3">
                        <Building size={20} className="text-estate-600 mr-2" />
                        Areas Served
                      </h3>
                      <p>{agent.location} and surrounding areas</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="listings" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Agent Listings</h2>
                    <span className="text-gray-600">{agentProperties.length} properties</span>
                  </div>
                  
                  {agentProperties.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <Building size={40} className="mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700">No listings available</h3>
                      <p className="text-gray-500">This agent doesn't have any active listings at the moment.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {agentProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reviews" className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Client Reviews</h2>
                    <div className="flex items-center">
                      <Star size={18} fill="#FFC107" className="text-yellow-400 mr-1" />
                      <span className="font-semibold">{agent.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Sample reviews */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start mb-2">
                        <img
                          src="https://randomuser.me/api/portraits/women/32.jpg"
                          alt="Amanda Thompson"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">Amanda Thompson</p>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-1">
                              {"★★★★★".split('').map((star, i) => (
                                <span key={i}>{star}</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">1 month ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        {agent.name} was incredibly helpful and knowledgeable throughout our entire home buying process. 
                        They were always available to answer our questions and made everything so much easier.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start mb-2">
                        <img
                          src="https://randomuser.me/api/portraits/men/54.jpg"
                          alt="Robert Jackson"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">Robert Jackson</p>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-1">
                              {"★★★★☆".split('').map((star, i) => (
                                <span key={i}>{star}</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">3 months ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Working with {agent.name} made selling our home much less stressful. 
                        They have excellent market knowledge and negotiation skills. Would recommend!
                      </p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All {agent.reviewCount} Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-semibold mb-4">Contact {agent.name.split(' ')[0]}</h3>
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
                        defaultValue={`Hi ${agent.name.split(' ')[0]}, I'm interested in your services as a real estate agent.`}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-estate-600 hover:bg-estate-700">
                      <MessageSquare size={16} className="mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Schedule a Consultation</h3>
                <p className="text-gray-600 mb-4">
                  Book a time to discuss your real estate needs with {agent.name}.
                </p>
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
                  Request Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgentDetail;
