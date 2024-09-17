'use client'

import { createContext, useState, useContext, ReactNode } from 'react';
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
  isOtpDone: boolean;
  role: string;
  login: Function;
  logout: Function;
  otpVerified: Function;
  setRole: Function;
  user?: User | undefined;
  setUserData: Function;
  setIsAuthenticated: Function
  setUser: Function
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);



