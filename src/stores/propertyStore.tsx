
import { create } from 'zustand';
import { mockProperties } from '../services/mockData';
import { PropertyProps } from '../components/PropertyCard';

interface PropertyState {
  properties: PropertyProps[];
  addProperty: (property: PropertyProps) => void;
  getProperties: () => PropertyProps[];
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [...mockProperties], // Initialize with mock data
  
  addProperty: (property: PropertyProps) => {
    set((state) => ({
      properties: [property, ...state.properties] // Add new property at the beginning
    }));
  },
  
  getProperties: () => get().properties,
}));
