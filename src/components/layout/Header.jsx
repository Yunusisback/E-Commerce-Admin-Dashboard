import { Moon, Sun, Bell, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect, useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';



// Sahte bildirim verisi
const mockNotifications = [
  { id: 1, text: "Yeni sipariş alındı: #ORD-2408", time: "5 dakika önce" },
  { id: 2, text: "Ürün stoğu azaldı: PlayStation 5", time: "1 saat önce" },
  { id: 3, text: "Ayşe Demir bir yorum yaptı.", time: "3 saat önce" },
  { id: 4, text: "Haftalık satış raporu hazırlandı.", time: "Dün" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  // State ve 'refler 
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const bellRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setIsPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelRef, bellRef]); 

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Arama Çubuğu  */}
        <div className="flex items-center gap-4 flex-1">
          {/* ... (input kodu) ... */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün, sipariş veya müşteri ara..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          
          {/*  Bildirim Düğmesi ve Animasyonlu Panel */}
          <div className="relative">
            <button 
              ref={bellRef} 
              onClick={() => setIsPanelOpen(!isPanelOpen)} 
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Transition
              as={Fragment} // React'in ekstra DOM düğümü eklemesini engeller
              show={isPanelOpen} // Panelin görünüp görünmeyeceğini 'state'e bağlar
              

              
              // Giriş Animasyonu (Açılma)
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 -translate-y-2" 
              enterTo="transform opacity-100 translate-y-0" 
              
              // Çıkış Animasyonu (Kapanma)
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 translate-y-0" 
              leaveTo="transform opacity-0 -translate-y-2"
            >
              <div 
                ref={panelRef} // 'refi panele ekle
                className="absolute right-0 top-12 z-10 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700"
              >
                {/* Panel Başlığı */}
                <div className="p-4 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bildirimler</h3>
                </div>
                
                {/* Panel İçeriği (Kaydırılabilir) */}
                <div className="divide-y dark:divide-gray-700 max-h-96 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                
                {/* Panel Alt Bilgisi (Footer) */}
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 text-center rounded-b-lg">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    Tümünü gör
                  </a>
                </div>
              </div>
            </Transition>
          </div>
          
          {/* Profil Alanı (Aynı) */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@ecommerce.com</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AU</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;