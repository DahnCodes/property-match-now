
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard'; 
import { Button } from '@/components/ui/button';
import { mockProperties, mockAgents } from '../services/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  // Take just a few items for the homepage showcase
  const featuredProperties = mockProperties.slice(0, 3);
  const featuredAgents = mockAgents.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Featured Properties section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 mt-1">Discover our handpicked premium listings</p>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="border-estate-600 text-estate-600 hover:bg-estate-50">
                View All Properties
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How PropertyMatch Works</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              We make it easy to find your perfect property through our simple three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-estate-100 text-estate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your preferences, budget, and property requirements to help us find the perfect match.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-estate-100 text-estate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Get Matched with Agents</h3>
              <p className="text-gray-600">
                We'll connect you with experienced agents who specialize in your desired location and property type.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-estate-100 text-estate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Find Your Dream Home</h3>
              <p className="text-gray-600">
                Work with your matched agent to explore properties, schedule viewings, and secure your ideal home.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register">
              <Button className="bg-estate-600 hover:bg-estate-700">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Agents section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top-Rated Agents</h2>
              <p className="text-gray-600 mt-1">Meet our experienced real estate professionals</p>
            </div>
            <Link to="/agents">
              <Button variant="outline" className="border-estate-600 text-estate-600 hover:bg-estate-50">
                View All Agents
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredAgents.map(agent => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-12 bg-estate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 mt-2">Hear from homeowners who found their perfect match</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {"★★★★★".split('').map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 italic mb-6">
                "Working with Sarah Johnson made finding our dream home an absolute breeze. Her knowledge of the San Francisco market was invaluable!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/17.jpg"
                  alt="Emily Torres"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">Emily Torres</p>
                  <p className="text-sm text-gray-500">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {"★★★★★".split('').map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 italic mb-6">
                "Michael helped us negotiate a great deal on our new condo. His attention to detail and responsiveness made all the difference."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/43.jpg"
                  alt="James Wilson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">James Wilson</p>
                  <p className="text-sm text-gray-500">Los Angeles, CA</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {"★★★★★".split('').map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 italic mb-6">
                "As first-time homebuyers, we were nervous about the process. Jessica guided us every step of the way and found us the perfect starter home!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt="Sophia Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">Sophia Chen</p>
                  <p className="text-sm text-gray-500">Pasadena, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-estate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Property Match?</h2>
          <p className="text-estate-100 text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their dream homes through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-estate-600 hover:bg-estate-50">
                Create Account
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-estate-700">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
