
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Building, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '@/stores/authStore';

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'seeker' | 'agent'>('seeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
  });
  
  const { signIn, signUp, isLoading, user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signIn(formData.email, formData.password);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const userData = {
        name: formData.name,
        ...(userType === 'agent' && { licenseNumber: formData.licenseNumber }),
      };

      await signUp(formData.email, formData.password, userType, userData);
      
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });

      setAuthMode('login');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (error: any) {
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
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-gray-600 text-center">
                {authMode === 'login' 
                  ? 'Enter your credentials to access your account'
                  : 'Join PropertyMatch today'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login" className="flex items-center justify-center">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center justify-center">
                    <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-estate-600 hover:bg-estate-700" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <LogIn size={18} className="mr-2" />
                          Sign In
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seeker' | 'agent')} className="mb-4">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="seeker" className="flex items-center justify-center">
                        <User size={16} className="mr-2" />
                        Home Seeker
                      </TabsTrigger>
                      <TabsTrigger value="agent" className="flex items-center justify-center">
                        <Building size={16} className="mr-2" />
                        Agent
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
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

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
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

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
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
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">License Number</Label>
                        <Input
                          id="licenseNumber"
                          name="licenseNumber"
                          type="text"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          placeholder="Your real estate license number"
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-estate-600 hover:bg-estate-700" disabled={isLoading}>
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
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
