// src/components/layout/Header.jsx (DÜZELTİLDİ)

import { Moon, Sun, Bell, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect, useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useApp } from '../../context/AppContext'; 

const mockNotifications = [
  { id: 1, text: "Yeni sipariş alındı: #ORD-2408", time: "5 dakika önce" },
  { id: 2, text: "Ürün stoğu azaldı: PlayStation 5", time: "1 saat önce" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useApp();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const bellRef = useRef(null);

  // DÜZELTME: Boş olan 'useEffect'i "click outside" mantığıyla dolduruyoruz.
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklanan yer panelin (panelRef) dışında VE zil butonunun (bellRef) dışındaysa
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setIsPanelOpen(false); // Paneli kapat
      }
    };
    
    // 'mousedown' event'ini (tıklama başladığı an) dinle
    document.addEventListener('mousedown', handleClickOutside);
    
    // Bileşen kaldırıldığında (unmount) event'i temizle
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelRef, bellRef]); // Bu 'ref'lere bağlı çalışır

  const getInitials = (name) => {
    if (!name) return 'AU';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  const initials = getInitials(user.name);

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün, sipariş veya müşteri ara..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <div className="relative">
            <button 
              ref={bellRef} 
              onClick={() => setIsPanelOpen(!isPanelOpen)} 
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Transition
              as={Fragment} 
              show={isPanelOpen} 
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 -translate-y-2" 
              enterTo="transform opacity-100 translate-y-0" 
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 translate-y-0" 
              leaveTo="transform opacity-0 -translate-y-2"
            >
              <div 
                ref={panelRef} 
                className="absolute right-0 top-12 z-10 w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border dark:border-zinc-700"
              >
                <div className="p-4 border-b dark:border-zinc-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bildirimler</h3>
                </div>
                <div className="divide-y dark:divide-zinc-700 max-h-96 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-700">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-zinc-700/50 text-center rounded-b-lg">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-amber-400 hover:underline">
                    Tümünü gör
                  </a>
                </div>
              </div>
            </Transition>
          </div>
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-zinc-700">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-amber-500 dark:to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{initials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;