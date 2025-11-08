import { createContext, useContext, useState } from 'react';



const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@ecommerce.com',
  });

  return (
    <AppContext.Provider value={{ activePage, setActivePage, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};