import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '@/stores/authStore';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'seeker' | 'agent'>('seeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '', // For agents only
  });
  
  const { signUp, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (userType === 'agent' && !formData.licenseNumber) {
      toast({
        title: "Error",
        description: "License number is required for agent accounts.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Additional user data for profile
      const profileData = {
        name: formData.name,
        ...(userType === 'agent' && { licenseNumber: formData.licenseNumber }),
      };

      await signUp(formData.email, formData.password, userType, profileData);
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created! Please sign in with your credentials.",
      });

      // Redirect to login page with email pre-filled
      navigate('/login', { state: { email: formData.email, userType } });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
              <p className="text-gray-600 mt-2">Join PropertyMatch today</p>
            </div>
            
            <Tabs defaultValue="seeker" className="mb-6" onValueChange={(value) => setUserType(value as 'seeker' | 'agent')}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="seeker" className="flex items-center justify-center">
                  <User size={16} className="mr-2" />
                  Home Seeker
                </TabsTrigger>
                <TabsTrigger value="agent" className="flex items-center justify-center">
                  <Building size={16} className="mr-2" />
                  Real Estate Agent
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="seeker">
                <p className="text-sm text-gray-600 mb-4">Create an account as a home seeker to find your dream property.</p>
              </TabsContent>
              
              <TabsContent value="agent">
                <p className="text-sm text-gray-600 mb-4">Create an agent account to list properties and connect with potential clients.</p>
              </TabsContent>
            </Tabs>
            
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long.
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {userType === 'agent' && (
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      type="text"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Your real estate license number"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-estate-600 focus:ring-estate-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-estate-600 hover:text-estate-500">Terms of Service</Link> and <Link to="/privacy" className=\"text-estate-600 hover:text-estate-500">Privacy Policy</Link>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-estate-600 hover:bg-estate-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <UserPlus size={18} className="mr-2" />
                      Create Account
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "Google signup will be available in the next update.",
                    })}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    Google
                  </Button>
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "Facebook signup will be available in the next update.",
                    })}
                  >
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link to="/login" className="ml-1 text-sm text-estate-600 hover:text-estate-500">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;