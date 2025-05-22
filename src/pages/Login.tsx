import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '@/context/UserContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole, setIsLoggedIn } = useUser();
  
  // Check for email from registration and pre-fill it
  useEffect(() => {
    if (location.state && location.state.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
      
      toast({
        title: "Registration Complete",
        description: "Please sign in with your new account credentials.",
      });
    }
  }, [location.state, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine user role - first check if there's a role from registration state
      const userRole = location.state?.userType || localStorage.getItem('registeredUserType') || 'seeker';
      
      // Clear the temporary storage after using it
      localStorage.removeItem('registeredUserType');
      
      // Set user role and login state
      setRole(userRole as 'seeker' | 'agent');
      setIsLoggedIn(true);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      // Navigate to dashboard
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">Sign In</CardTitle>
              <CardDescription className="text-gray-600 text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
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
                <div className="relative mt-1">
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="bg-estate-600 hover:bg-estate-700" onClick={handleLogin} disabled={isLoading}>
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
              <div className="text-sm text-gray-600 text-center">
                Don't have an account? <Link to="/register" className="text-estate-600 hover:text-estate-500">Sign up</Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
