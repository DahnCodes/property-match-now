
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Home, User, Settings, LogOut, Menu, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span onClick={() => navigate('/')} className="cursor-pointer text-estate-600 font-bold text-2xl">PropertyMatch</span>
            </div>

            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-estate-500"
                  placeholder="Search properties..."
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-estate-200 text-estate-700">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
          <nav className="flex flex-col h-full px-4 py-6">
            <div className="space-y-1">
              <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-estate-600 hover:bg-estate-50"
                onClick={() => {}}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-estate-600 hover:bg-estate-50"
                onClick={() => navigate('/properties')}
              >
                <Home className="w-5 h-5 mr-3" />
                Properties
              </Button>
            </div>
            
            <div className="mt-8 space-y-1">
              <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</p>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-estate-600 hover:bg-estate-50"
                onClick={() => {}}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-estate-600 hover:bg-estate-50"
                onClick={() => {}}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
            </div>
            
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
                onClick={() => navigate('/login')}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="md:hidden mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 hidden md:block">Your Dashboard</h1>
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
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-estate-500 focus:border-estate-500"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="default" className="w-full bg-estate-600 hover:bg-estate-700">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
