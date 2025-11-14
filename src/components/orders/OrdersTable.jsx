import { Eye, EyeOff, Download, FileText } from 'lucide-react'; 
import Card from '../common/Card';
import { formatCurrency, getStatusColor } from '../../utils/helpers';


const OrdersTable = ({ orders, onViewOrder, onDownloadInvoice, hiddenOrders, onToggleVisibility }) => {
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
            {orders.map((order) => {

              // 2. Bu siparişin gizli olup olmadığını kontrol et
              const isHidden = hiddenOrders.includes(order.id);
              
              return (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  
                  {/* ID (Gizlenmez) */}
                  <td className="py-4 px-4 text-sm font-medium text-blue-600 dark:text-blue-400">{order.id}</td>
                  
                  {/* Müşteri (Gizlenir) */}
                  <td className={`py-4 px-4 text-sm text-gray-900 dark:text-white transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '**********' : order.customer}
                  </td>
                  
                  {/* Email (Gizlenir) */}
                  <td className={`py-4 px-4 text-sm text-gray-500 dark:text-gray-400 transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '**********' : order.email}
                  </td>
                  
                  {/* Ürün (Gizlenir) */}
                  <td className={`py-4 px-4 text-sm text-gray-700 dark:text-gray-300 transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '**********' : order.product}
                  </td>
                  
                  {/* Tutar (Gizlenir) */}
                  <td className={`py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white transition-all ${isHidden ? 'blur-sm' : ''}`}>
                    {isHidden ? '₺***' : formatCurrency(order.amount)}
                  </td>
                  
                  {/* Durum (Gizlenmez) */}
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  
                  {/* Tarih (Gizlenmez) */}
                  <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                  
                  {/* İşlemler */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      
                      {/* YENİ: Gizle/Göster Butonu */}
                      <button 
                        onClick={() => onToggleVisibility(order.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title={isHidden ? "Detayları Göster" : "Detayları Gizle"}
                      >
                        {isHidden ? (
                          <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        )}
                      </button>
                      
                      {/*  "Detay Gör" Butonu  */}
                      <button 
                        onClick={() => onViewOrder(order)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Sipariş Detayını Gör"
                      >
                        <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      
                      {/* "İndir" Butonu */}
                      <button 
                        onClick={() => onDownloadInvoice(order)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Faturayı İndir"
                      >
                        <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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

export default OrdersTable;