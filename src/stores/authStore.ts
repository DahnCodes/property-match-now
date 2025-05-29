import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  role: 'agent' | 'seeker' | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'agent' | 'seeker', data: any) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setRole: (role: 'agent' | 'seeker' | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user role from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      set({ 
        user, 
        role: profile?.role || null,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string, role: 'agent' | 'seeker', data: any) => {
    set({ isLoading: true });
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create profile with additional data
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              role,
              ...data,
            },
          ]);

        if (profileError) throw profileError;
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, role: null });
    } catch (error) {
      throw error;
    }
  },
}));

// Initialize auth state from session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    useAuthStore.getState().setUser(session.user);
    
    // Fetch user role
    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        useAuthStore.getState().setRole(data?.role || null);
      });
  }
});

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    useAuthStore.getState().setUser(session.user);
    
    // Fetch user role
    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        useAuthStore.getState().setRole(data?.role || null);
      });
  } else {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setRole(null);
  }
});