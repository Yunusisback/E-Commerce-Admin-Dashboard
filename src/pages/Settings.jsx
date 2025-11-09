import { useState, useEffect } from 'react'; 
import { useApp } from '../context/AppContext'; 
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import { User, Bell } from 'lucide-react';


const Settings = () => {
  const { setPageTitle } = useApp();

  useEffect(() => {
    setPageTitle('Ayarlar'); 
  }, [setPageTitle]);
  
  // Aktif sekme durumu
  const [activeTab, setActiveTab] = useState('profile');

  // Sekme tanımları
  const tabs = [
    { id: 'profile', label: 'Profil Ayarları', icon: User },
    { id: 'notifications', label: 'Bildirim Ayarları', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Sayfa başlığı */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ayarlar</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Profil ve bildirim tercihlerinizi yönetin
        </p>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-zinc-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 -mb-px font-medium transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:border-amber-500 dark:text-amber-400'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sekme içeriği */}
      <div className="mt-6">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>
    </div>
  );
};

export default Settings;