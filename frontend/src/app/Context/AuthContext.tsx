'use client'

import { createContext,} from 'react';
interface Profile{
  value:string;
}

interface User {
  email: string;
  name: string;
  profile_pic: Profile
  // Add other properties if needed
}

// Define the AuthContext type
interface AuthContextType 
{
  isAuthenticated: boolean;
  oAuthStatus: boolean;
  role: string;
  login: Function;
  logout: Function;
  setOAuthStatus: Function;
  setRole: Function;
  user: User | undefined;
  setUserData: Function;
  token?: string;
  setToken: Function;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);



