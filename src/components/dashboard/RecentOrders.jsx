import Card from '../common/Card';
import { formatCurrency, getStatusColor } from '../../utils/helpers';

const RecentOrders = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Siparişler</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">En son gelen siparişler</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Sipariş No</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Müşteri</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Ürün</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tutar</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Durum</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-3 px-2 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">{order.customer}</td>
                <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">{order.product}</td>
                <td className="py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(order.amount)}</td>
                <td className="py-3 px-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentOrders;