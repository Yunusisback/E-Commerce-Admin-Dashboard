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


const Sidebar = () => {

  const menuItems = [

    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'orders', label: 'Siparişler', icon: ShoppingCart, path: '/orders' },
    { id: 'products', label: 'Ürünler', icon: Package, path: '/products' },
    { id: 'customers', label: 'Müşteriler', icon: Users, path: '/customers' },
    { id: 'analytics', label: 'Analizler', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Ayarlar', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">

      {/* Logo Alanı*/}

      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              E-Commerce
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.path} 
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Çıkış Yap Alanı*/}
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;