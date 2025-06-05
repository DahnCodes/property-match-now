
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: 'agent' | 'seeker' | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'agent' | 'seeker', userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setRole: (role: 'agent' | 'seeker' | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  role: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setRole: (role) => set({ role }),

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile to get role
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        // Check if user exists in old users table for role mapping
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        set({ 
          user: data.user, 
          session: data.session,
          role: userData?.favorite_team ? 'seeker' : 'agent', // Simple role mapping
          isLoading: false 
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string, role: 'agent' | 'seeker', userData: any) => {
    set({ isLoading: true });
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: userData.name,
            role: role,
            ...userData
          }
        }
      });

      if (error) throw error;

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
      set({ user: null, session: null, role: null });
    } catch (error) {
      throw error;
    }
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, setSession, setRole } = useAuthStore.getState();
  
  setSession(session);
  setUser(session?.user ?? null);
  
  if (session?.user) {
    // Fetch role from profiles or users table
    setTimeout(() => {
      supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .single()
        .then(({ data }) => {
          setRole(data?.favorite_team ? 'seeker' : 'agent');
        });
    }, 0);
  } else {
    setRole(null);
  }
});

// Check for existing session
supabase.auth.getSession().then(({ data: { session } }) => {
  const { setUser, setSession } = useAuthStore.getState();
  setSession(session);
  setUser(session?.user ?? null);
});
