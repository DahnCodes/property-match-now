
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Home, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PropertyUploadForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    propertyType: 'house',
    status: 'available',
    images: null as FileList | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, images: e.target.files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to your backend
      // For demo purposes, we'll just simulate an upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Property uploaded successfully!",
        description: "Your property listing has been created.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        address: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        squareFeet: '',
        propertyType: 'house',
        status: 'available',
        images: null
      });
    } catch (error) {
      toast({
        title: "Error uploading property",
        description: "There was a problem uploading your property listing.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Home className="h-6 w-6 text-estate-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Upload New Property</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Spacious 3BR House with Garden" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Describe the property" 
                className="min-h-[120px]" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="1234 Market St, San Francisco, CA" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleInputChange} 
                placeholder="550000" 
                min="0" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input 
                  id="bedrooms" 
                  name="bedrooms" 
                  type="number" 
                  value={formData.bedrooms} 
                  onChange={handleInputChange} 
                  placeholder="3" 
                  min="0" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input 
                  id="bathrooms" 
                  name="bathrooms" 
                  type="number" 
                  value={formData.bathrooms} 
                  onChange={handleInputChange} 
                  placeholder="2" 
                  min="0" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="squareFeet">Square Feet</Label>
                <Input 
                  id="squareFeet" 
                  name="squareFeet" 
                  type="number" 
                  value={formData.squareFeet} 
                  onChange={handleInputChange} 
                  placeholder="1800" 
                  min="0" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select 
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="images">Property Images</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6">
                <div className="flex justify-center">
                  <label className="flex flex-col items-center gap-1 cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Click to upload images
                    </span>
                    <Input 
                      id="images" 
                      name="images" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*" 
                    />
                  </label>
                </div>
                {formData.images && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {formData.images.length} {formData.images.length === 1 ? 'file' : 'files'} selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Button 
            type="submit" 
            className="w-full bg-estate-600 hover:bg-estate-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Property'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyUploadForm;
