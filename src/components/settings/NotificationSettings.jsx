import { useState } from 'react';
import Card from '../common/Card';



// Switch/Toggle bileşeni
const SwitchToggle = ({ label, description, enabled, setEnabled }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
     
        className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 rounded-full cursor-pointer transition-colors duration-200 ${
          enabled ? 'bg-blue-600 dark:bg-amber-600' : 'bg-gray-200 dark:bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white dark:bg-gray-100 rounded-full transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};


const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrder: true,
    lowStock: true,
    weeklyReport: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    newOrder: true,
    statusUpdate: true,
  });

  const handleEmailChange = (key) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePushChange = (key) => {
    setPushNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Bildirim Ayarları</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">E-posta Bildirimleri</h4>
          <div className="space-y-4">
            <SwitchToggle
              label="Yeni Sipariş"
              description="Yeni bir sipariş geldiğinde e-posta al."
              enabled={emailNotifications.newOrder}
              setEnabled={() => handleEmailChange('newOrder')}
            />
            <SwitchToggle
              label="Düşük Stok"
              description="Ürün stoğu kritik seviyeye düştüğünde e-posta al."
              enabled={emailNotifications.lowStock}
              setEnabled={() => handleEmailChange('lowStock')}
            />
            <SwitchToggle
              label="Haftalık Rapor"
              description="Her hafta başında özet raporu al."
              enabled={emailNotifications.weeklyReport}
              setEnabled={() => handleEmailChange('weeklyReport')}
            />
          </div>
        </div>


        <hr className="my-6 border-gray-200 dark:border-zinc-700" />
        
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Push Bildirimleri</h4>
          <div className="space-y-4">
            <SwitchToggle
              label="Yeni Sipariş"
              description="Yeni bir sipariş geldiğinde anlık bildirim al."
              enabled={pushNotifications.newOrder}
              setEnabled={() => handlePushChange('newOrder')}
            />
            <SwitchToggle
              label="Sipariş Durum Güncellemesi"
              description="Sipariş durumu (Kargoda vb.) değiştiğinde bildirim al."
              enabled={pushNotifications.statusUpdate}
              setEnabled={() => handlePushChange('statusUpdate')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;