import { createContext, useContext, useState } from 'react';


const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// AppProvider bileşeni Sağlayıcı
export const AppProvider = ({ children }) => {

  // Sayfa başlığı durumu
  const [pageTitle, setPageTitle] = useState('Dashboard'); 
  
  // Kullanıcı bilgisi durumu
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@ecommerce.com',
  });

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      pageTitle, setPageTitle 
    }}>
      {children}
    </AppContext.Provider>
  );
};