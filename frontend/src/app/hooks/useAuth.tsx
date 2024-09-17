import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';


// Custom hook to use the AuthContext
export const useAuth = () => 
{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

