import { 
  Moon, 
  Sun, 
  Bell, 
  Menu, 
  Mail, 
  Settings, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useState, useEffect, useRef, Fragment } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

// Mock bildirim verileri
const mockNotifications = [
  { id: 1, text: "Yeni sipariş alındı: #ORD-2408", time: "5 dakika önce" },
  { id: 2, text: "Ürün stoğu azaldı: PlayStation 5", time: "1 saat önce" },
  { id: 3, text: "Müşteri yorumu geldi.", time: "2 saat önce" },
];

// Mock mesaj verileri
const mockMessages = [
  { id: 1, sender: "Ahmet Yılmaz", text: "Siparişim hakkında bilgi almak istiyorum...", time: "10 dakika önce" },
  { id: 2, sender: "Ayşe Demir", text: "Ürün iadesi talebi.", time: "1 saat önce" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  // 'user' objesi (name, email, avatar) hala tam olarak geliyor
  const { user, pageTitle, toggleSidebar } = useApp();

  // Panel stateleri
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const bellRef = useRef(null);
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const messagesPanelRef = useRef(null);
  const mailRef = useRef(null);

  // Dışarı tıklama (Bildirimler)
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef, bellRef]);

  // Dışarı tıklama (Mesajlar)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messagesPanelRef.current &&
        !messagesPanelRef.current.contains(event.target) &&
        mailRef.current &&
        !mailRef.current.contains(event.target)
      ) {
        setIsMessagesPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messagesPanelRef, mailRef]);

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-6 py-[18px]">
      <div className="flex items-center justify-between">
        
        {/* Sol Taraf */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        {/* Sağ Taraf*/}
        <div className="flex items-center gap-4">
          
          {/* Tema değiştirme butonu */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Mesaj butonu ve paneli */}
          <div className="relative">
            <button
              ref={mailRef}
              onClick={() => setIsMessagesPanelOpen(!isMessagesPanelOpen)}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <Transition
              as={Fragment}
              show={isMessagesPanelOpen}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 -translate-y-2"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 -translate-y-2"
            >
              <div
                ref={messagesPanelRef}
                className="absolute right-0 top-12 z-10 w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border dark:border-zinc-700"
              >
                <div className="p-4 border-b dark:border-zinc-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Mesajlar
                  </h3>
                </div>
                <div className="divide-y dark:divide-zinc-700 max-h-96 overflow-y-auto">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-700"
                    >
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {msg.sender}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {msg.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {msg.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-zinc-700/50 text-center rounded-b-lg">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-amber-400 hover:underline">
                    Tüm mesajları gör
                  </a>
                </div>
              </div>
            </Transition>
          </div>

          {/* Bildirim butonu ve paneli */}
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bildirimler
                  </h3>
                </div>
                <div className="divide-y dark:divide-zinc-700 max-h-96 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-700"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {notif.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notif.time}
                      </p>
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

          {/* Kullanıcı Dropdown Menüsü */}
          <div className="pl-3 border-l border-gray-200 dark:border-zinc-700">
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 p-1 pr-2 transition-colors">
                
                <img
                  src={user.avatar}
                  alt="Profil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-600"
                />
                
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </HeadlessMenu.Button>
              
              {/* Dropdown paneli */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border dark:border-zinc-700">
                  <div className="py-1">
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`
                            ${active ? 'bg-gray-100 dark:bg-zinc-700' : ''}
                            group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300
                          `}
                        >
                          <img src={user.avatar} alt="" className="w-5 h-5 mr-2 rounded-full object-cover" />
                          Profil
                        </Link>
                      )}
                    </HeadlessMenu.Item>
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`
                            ${active ? 'bg-gray-100 dark:bg-zinc-700' : ''}
                            group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300
                          `}
                        >
                          <Settings className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                          Ayarlar
                        </Link>
                      )}
                    </HeadlessMenu.Item>
                    <hr className="my-1 border-gray-200 dark:border-zinc-700" />
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          className={`
                            ${active ? 'bg-gray-100 dark:bg-zinc-700' : ''}
                            group flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-500
                          `}
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Çıkış Yap
                        </button>
                      )}
                    </HeadlessMenu.Item>
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          </div>
          
        </div>
      </div>
    </header>
  );
};
export default Header;