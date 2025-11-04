import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import Card from '../common/Card';
import { formatNumber } from '../../utils/helpers'; 


const CustomerStats = ({ stats }) => {
  
  // Gelen stats propunu (örn: stats.total) UI da gösterilecek etiket ikon ve renklerle
  // eşleştiren sabit (static) bir yapılandırma dizisi

  const statItems = [
    { 
      label: 'Toplam Müşteri', 
      value: stats.total, 
      icon: Users, 
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900'
    },
    { 
      label: 'Yeni Müşteri (Son 30G)', 
      value: stats.newThisMonth, 
      icon: UserPlus, 
      color: 'text-green-600 bg-green-100 dark:bg-green-900' 
    },
    { 
      label: 'Aktif Müşteri', 
      value: stats.active, 
      icon: UserCheck, 
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900' 
    },
    { 
      label: 'Pasif Müşteri', 
      value: stats.inactive, 
      icon: UserX, 
      color: 'text-red-600 bg-red-100 dark:bg-red-900' 
    }
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* statItems dizisindeki her bir eleman için bir istatistik kartı oluştur */}
      {statItems.map((item) => {
        const Icon = item.icon; 
        return (
    
          <Card key={item.label} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              
              <div className={`p-3 rounded-lg ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {/* Değeri helpers.js dosyasından gelen formatNumber ile formatla (örn: 1250 -> 1.250) */}
                  {formatNumber(item.value)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CustomerStats;