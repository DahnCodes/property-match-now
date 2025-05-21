
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Home, User, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your property search and connections</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Tabs defaultValue="saved" className="w-full">
              <div className="border-b border-gray-200">
                <TabsList className="flex w-full bg-transparent border-b">
                  <TabsTrigger value="saved" className="flex items-center px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-estate-600 data-[state=active]:text-estate-600 rounded-none">
                    <Home className="w-4 h-4 mr-2" />
                    Saved Properties
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-estate-600 data-[state=active]:text-estate-600 rounded-none">
                    <User className="w-4 h-4 mr-2" />
                    Agent Messages
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-estate-600 data-[state=active]:text-estate-600 rounded-none">
                    <Settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="saved" className="p-6">
                <div className="space-y-4">
                  {/* Placeholder content for saved properties */}
                  <div className="text-center py-12">
                    <LayoutDashboard className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No saved properties yet</h3>
                    <p className="mt-2 text-gray-500">Browse properties and save your favorites to see them here.</p>
                    <Button 
                      className="mt-4 bg-estate-600 hover:bg-estate-700"
                      onClick={() => navigate('/properties')}
                    >
                      Browse Properties
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="messages" className="p-6">
                <div className="space-y-4">
                  {/* Placeholder content for messages */}
                  <div className="text-center py-12">
                    <User className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No messages yet</h3>
                    <p className="mt-2 text-gray-500">Connect with agents to start receiving messages.</p>
                    <Button 
                      className="mt-4 bg-estate-600 hover:bg-estate-700"
                      onClick={() => navigate('/agents')}
                    >
                      Find Agents
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="p-6">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <p className="text-sm text-gray-500">This is a placeholder for profile settings. In a real application, users would be able to update their information here.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-estate-500 focus:border-estate-500"
                        placeholder="John Doe"
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-estate-500 focus:border-estate-500"
                        placeholder="johndoe@example.com"
                        disabled
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
