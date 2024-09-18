'use client'

import React, { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from './../../utils/axios'

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
  const [oAuthStatus, setOAuthStatus] = useState(false);
  const [role, setRole] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string>('')


  // Handler to Log out
  const handleLogOut = async () => {
    console.log(token, "token from useAuth")
      try {
          const result = await axios.post(`/auth/logout`,{});
        console.log('Log out successfully:', result.data);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    };

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    handleLogOut()
    setIsAuthenticated(false);
    setOAuthStatus(false)
    setUser(undefined); // Optional: clear user on logout
    sessionStorage.clear()
  };

  const setUserData = (user: User) => {
    console.log(user,'in setUserdata  ')
    // localStorage.setItem('user', JSON.stringify(user));

    setUser({...user});
    // Optional: Set role or other states if needed
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, oAuthStatus, role, user, token, login, logout, setOAuthStatus, setRole, setUserData, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
