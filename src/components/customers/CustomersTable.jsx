import { Eye, Edit, Trash2, EyeOff } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatNumber } from '../../utils/helpers';
import StatusEditPopover from './StatusEditPopover';
import { getStatusColor } from '../../utils/helpers'; 

const CustomersTable = ({
  customers,
  hiddenCustomers,
  onToggleVisibility,
  onStatusChange,
  onOpenDeleteModal
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-700">
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Müşteri</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Telefon</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Toplam Harcama</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Sipariş Sayısı</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Durum</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const isHidden = hiddenCustomers.includes(customer.id);
              return (
                <tr key={customer.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className={`w-10 h-10 rounded-full object-cover transition-all ${isHidden ? 'blur-sm' : ''}`}
                      />
                      <div>
                        <p className={`text-sm font-medium text-gray-900 dark:text-white transition-all ${isHidden ? 'blur-sm' : ''}`}>
                          {isHidden ? '********' : customer.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {isHidden ? '****' : customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-sm text-gray-500 dark:text-gray-400 transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '********' : customer.email}
                  </td>
                  <td className={`py-4 px-4 text-sm text-gray-700 dark:text-gray-300 transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '********' : customer.phone}
                  </td>
                  <td className={`py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '₺****' : formatCurrency(customer.totalSpent)}
                  </td>
                  <td className={`py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '**' : formatNumber(customer.orderCount)}
                  </td>
                  <td className="py-4 px-4">
                    {/*getStatusColor fonksiyonunu kullanıyor */}
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status === 'active' ? 'Aktif' : customer.status === 'inactive' ? 'Pasif' : 'Yasaklı'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleVisibility(customer.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        {isHidden ? <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                      </button>
                      <StatusEditPopover customer={customer} onStatusChange={onStatusChange} />
                      <button
                        onClick={() => onOpenDeleteModal(customer)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CustomersTable;