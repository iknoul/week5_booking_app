// src/components/Layout.tsx
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
     
        {children} {/* This will render the nested route components */}
        
     
    </>
  );
};

export default Layout;
