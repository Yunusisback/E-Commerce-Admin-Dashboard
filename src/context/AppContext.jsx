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
  
  // Kullanıcı bilgisi durumu (Avatar dahil)
  const [user, setUser] = useState({
    name: "Thomas",
    email: 'thomas@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=68' // Varsayılan avatar
  });

  // Sidebarın açık/kapalı durumunu yönetir
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sidebar durumunu tersine çeviren fonksiyon
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      pageTitle, setPageTitle,
      isSidebarOpen, 
      toggleSidebar 
    }}>
      {children}
    </AppContext.Provider>
  );
};