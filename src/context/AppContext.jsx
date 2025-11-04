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

  return (
    <AppContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
};