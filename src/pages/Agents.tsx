
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AgentCard from '../components/AgentCard';
import { mockAgents } from '../services/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  
  // Filter agents based on search criteria
  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = searchTerm === '' || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = specialization === '' || 
      agent.specializations.some(spec => spec.toLowerCase() === specialization.toLowerCase());
    
    const matchesLocation = location === '' || 
      agent.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Agent</h1>
            <p className="text-gray-600 mt-2">Connect with experienced real estate professionals</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by agent name"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={specialization} onValueChange={setSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specializations</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="san francisco">San Francisco, CA</SelectItem>
                    <SelectItem value="los angeles">Los Angeles, CA</SelectItem>
                    <SelectItem value="pasadena">Pasadena, CA</SelectItem>
                    <SelectItem value="lake tahoe">Lake Tahoe, CA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
            </p>
          </div>
          
          {filteredAgents.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No agents found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} {...agent} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agents;
