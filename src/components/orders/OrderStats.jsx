import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';

const OrderStats = ({ stats }) => {
  const statItems = [
    { label: 'Beklemede', value: stats.pending, icon: Clock, color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900' },
    { label: 'Hazırlanıyor', value: stats.processing, icon: Package, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900' },
    { label: 'Kargoda', value: stats.shipped, icon: Truck, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900' },
    { label: 'Teslim Edildi', value: stats.delivered, icon: CheckCircle, color: 'text-green-600 bg-green-100 dark:bg-green-900' },
    { label: 'İptal', value: stats.cancelled, icon: XCircle, color: 'text-red-600 bg-red-100 dark:bg-red-900' }


  ];
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderStats;