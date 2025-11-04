import { Eye, Download } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, getStatusColor } from '../../utils/helpers';

const OrdersTable = ({ orders }) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Sipariş No</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Müşteri</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Ürün</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tutar</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Durum</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tarih</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-blue-600 dark:text-blue-400">{order.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{order.customer}</td>
                <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{order.email}</td>
                <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{order.product}</td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(order.amount)}</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrdersTable;