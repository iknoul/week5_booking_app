'use client'

import React, { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

// Define the User interface
interface Profile{
  value:string;
}

interface User {
  email: string;
  name: string;
  profile_pic: Profile
  // Add other properties if needed
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpDone, setIsOtpDone] = useState(false);
  const [role, setRole] = useState('admin');
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    setIsOtpDone(false);
    setIsAuthenticated(false);
    // setUser(undefined); // Optional: clear user on logout
  };

  const otpVerified = () => setIsOtpDone(true);

  const setUserData = (user: User) => {
    console.log(user,'in setUserdata  ')
    // localStorage.setItem('user', JSON.stringify(user));

    setUser({...user});
    // Optional: Set role or other states if needed
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isOtpDone, role, user, login, logout, otpVerified, setRole, setUserData, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
