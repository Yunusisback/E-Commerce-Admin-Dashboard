import { NavLink } from 'react-router-dom'; 
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { isSidebarOpen } = useApp();

  // Menü öğeleri 
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'orders', label: 'Siparişler', icon: ShoppingCart, path: '/orders' },
    { id: 'products', label: 'Ürünler', icon: Package, path: '/products' },
    { id: 'customers', label: 'Müşteriler', icon: Users, path: '/customers' },
    { id: 'analytics', label: 'Analizler', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Ayarlar', icon: Settings, path: '/settings' },
  ];

  // Metinleri gizlemek için kullanılacak classlar
  const textClasses = `
    whitespace-nowrap overflow-hidden transition-all duration-300
    ${isSidebarOpen ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}
  `;

  return (
    <aside className={`
      bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 
      flex flex-col h-screen transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'w-64' : 'w-20'}
    `}>
      
      {/* Logo bölümü */}
      <div className="p-5  border-gray-200 border-b dark:border-zinc-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-amber-500 dark:to-orange-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div className={textClasses}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">E-Commerce</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigasyon menüsü */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path} 
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 rounded-lg transition-colors 
                ${isSidebarOpen ? '' : 'justify-center'}
                ${
                  isActive
                    ? 'bg-blue-50 dark:bg-zinc-700 text-blue-600 dark:text-amber-400'
                    : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={`font-medium ${textClasses}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Çıkış butonu */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
        <button className={`
          w-full flex items-center px-4 py-3 rounded-lg text-red-600 dark:text-red-500 
          hover:bg-red-50 dark:hover:bg-zinc-700 transition-colors
          ${isSidebarOpen ? '' : 'justify-center'}
        `}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`font-medium ${textClasses}`}>
            Çıkış Yap 
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;