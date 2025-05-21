
export const mockProperties = [
  {
    id: "prop1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, San Francisco, CA",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "Apartment",
    status: "available" as const,
    description: "Beautiful modern apartment in the heart of downtown with stunning city views. Features include hardwood floors, stainless steel appliances, and floor-to-ceiling windows.",
    features: ["Central Air", "In-unit Laundry", "Fitness Center", "Rooftop Deck", "Pet Friendly"],
    agentId: "agent1"
  },
  {
    id: "prop2",
    title: "Luxury Waterfront Villa",
    address: "456 Ocean Ave, Malibu, CA",
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3800,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "Villa",
    status: "available" as const,
    description: "Stunning waterfront villa with panoramic ocean views. This luxurious property features a private beach, infinity pool, and gourmet kitchen.",
    features: ["Ocean View", "Private Pool", "Home Theatre", "Wine Cellar", "Smart Home System"],
    agentId: "agent2"
  },
  {
    id: "prop3",
    title: "Cozy Suburban Home",
    address: "789 Maple Dr, Pasadena, CA",
    price: 950000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "House",
    status: "pending" as const,
    description: "Charming family home in a quiet suburban neighborhood with a spacious backyard and updated kitchen. Perfect for families looking for great schools and community.",
    features: ["Renovated Kitchen", "Backyard", "Garage", "Fireplace", "Finished Basement"],
    agentId: "agent3"
  },
  {
    id: "prop4",
    title: "Urban Loft Apartment",
    address: "101 Arts District, Los Angeles, CA",
    price: 650000,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 1050,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "Loft",
    status: "available" as const,
    description: "Industrial-style loft in the vibrant Arts District featuring exposed brick, high ceilings, and large windows. Perfect for creative professionals.",
    features: ["High Ceilings", "Exposed Brick", "Open Floor Plan", "Common Roof Deck", "Bike Storage"],
    agentId: "agent1"
  },
  {
    id: "prop5",
    title: "Mountain View Cabin",
    address: "555 Pine Trail, Lake Tahoe, CA",
    price: 875000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "Cabin",
    status: "available" as const,
    description: "Rustic log cabin with stunning mountain views. Features include a stone fireplace, wraparound deck, and easy access to hiking trails and ski resorts.",
    features: ["Mountain View", "Wraparound Deck", "Stone Fireplace", "Hot Tub", "Ski Storage"],
    agentId: "agent4"
  },
  {
    id: "prop6",
    title: "Historic Brownstone",
    address: "222 Heritage Row, Boston, MA",
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&q=80&w=600&h=400&fit=crop",
    propertyType: "Townhouse",
    status: "sold" as const,
    description: "Classic brownstone with original architectural details. Recently renovated to blend historic charm with modern amenities in a prime location.",
    features: ["Original Hardwood Floors", "Crown Molding", "Updated Kitchen", "Garden Patio", "Subway Access"],
    agentId: "agent2"
  }
];

export const mockAgents = [
  {
    id: "agent1",
    name: "Sarah Johnson",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    reviewCount: 124,
    yearsExperience: 8,
    location: "San Francisco, CA",
    specializations: ["Luxury", "Residential", "Condos"],
    phoneNumber: "(415) 555-1234",
    email: "sarah.johnson@propertymatch.com",
    bio: "Sarah specializes in luxury properties throughout San Francisco. With 8 years of experience, she has helped hundreds of clients find their perfect home. Her expertise in market trends and negotiation skills ensure her clients always get the best deal.",
    listings: 24,
    transactions: 150,
    languages: ["English", "Spanish"]
  },
  {
    id: "agent2",
    name: "Michael Chen",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.9,
    reviewCount: 98,
    yearsExperience: 12,
    location: "Los Angeles, CA",
    specializations: ["Waterfront", "Luxury", "International"],
    phoneNumber: "(310) 555-5678",
    email: "michael.chen@propertymatch.com",
    bio: "Michael is an award-winning agent with over 12 years of experience in luxury and international real estate. He provides personalized service to each client and has extensive knowledge of Los Angeles' most desirable neighborhoods.",
    listings: 18,
    transactions: 220,
    languages: ["English", "Mandarin", "Cantonese"]
  },
  {
    id: "agent3",
    name: "Jessica Rodriguez",
    profileImage: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 4.7,
    reviewCount: 87,
    yearsExperience: 5,
    location: "Pasadena, CA",
    specializations: ["Residential", "First-Time Buyers", "Family Homes"],
    phoneNumber: "(626) 555-9012",
    email: "jessica.rodriguez@propertymatch.com",
    bio: "Jessica is passionate about helping first-time homebuyers navigate the real estate market. She takes pride in finding perfect family homes and guiding clients through every step of the buying process with patience and expertise.",
    listings: 15,
    transactions: 85,
    languages: ["English", "Spanish"]
  },
  {
    id: "agent4",
    name: "David Wilson",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.6,
    reviewCount: 76,
    yearsExperience: 10,
    location: "Lake Tahoe, CA",
    specializations: ["Vacation Homes", "Investment Properties", "Cabins"],
    phoneNumber: "(530) 555-3456",
    email: "david.wilson@propertymatch.com",
    bio: "David specializes in vacation properties and investment opportunities in the Lake Tahoe region. His deep knowledge of the local market helps investors maximize returns while finding beautiful properties in scenic locations.",
    listings: 22,
    transactions: 130,
    languages: ["English"]
  }
];

export const getPropertyDetails = (id: string) => {
  return mockProperties.find(property => property.id === id);
};

export const getAgentDetails = (id: string) => {
  return mockAgents.find(agent => agent.id === id);
};

export const getAgentProperties = (agentId: string) => {
  return mockProperties.filter(property => property.agentId === agentId);
};

export const searchProperties = (filters: any) => {
  let filteredProperties = [...mockProperties];
  
  if (filters.location && filters.location.trim() !== '') {
    const location = filters.location.toLowerCase();
    filteredProperties = filteredProperties.filter(
      property => property.address.toLowerCase().includes(location)
    );
  }
  
  if (filters.propertyType && filters.propertyType !== 'any type') {
    filteredProperties = filteredProperties.filter(
      property => property.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
    );
  }
  
  if (filters.priceRange) {
    filteredProperties = filteredProperties.filter(
      property => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );
  }
  
  if (filters.bedrooms && filters.bedrooms !== 'any') {
    const minBedrooms = parseInt(filters.bedrooms);
    filteredProperties = filteredProperties.filter(
      property => property.bedrooms >= minBedrooms
    );
  }
  
  if (filters.bathrooms && filters.bathrooms !== 'any') {
    const minBathrooms = parseInt(filters.bathrooms);
    filteredProperties = filteredProperties.filter(
      property => property.bathrooms >= minBathrooms
    );
  }
  
  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProperties.sort((a, b) => b.price - a.price);
        break;
      // Add more sorting options as needed
      default:
        // By default, no sorting
        break;
    }
  }
  
  return filteredProperties;
};
