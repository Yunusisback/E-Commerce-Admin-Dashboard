import { Edit, Trash2, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/helpers';



const ProductCard = ({ product, onEdit, onDelete }) => {
  
  // 1.  Boş fonksiyon 'product.status'u kullanacak şekilde dolduruldu
  const getStockStatus = () => {
    if (product.status === 'out-of-stock') {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
    if (product.status === 'low-stock') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  // 2.  Boş fonksiyon 'product.status'u kullanacak şekilde dolduruldu
  const getStockText = () => {
    if (product.status === 'out-of-stock') return 'Stokta Yok';
    if (product.status === 'low-stock') return 'Az Stok';
    return 'Stokta';
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      <div className="flex items-start justify-between mb-3">
        <img 
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-lg object-contain shadow-sm bg-white p-1"
        />
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockStatus()}`}>
          {getStockText()}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {product.name}
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {product.category}
      </p>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Fiyat</p>
          <p className="text-lg font-bold text-blue-600 dark:text-amber-400">
            {formatCurrency(product.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Stok</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {product.stock}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 dark:bg-zinc-700/50 rounded">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {formatNumber(product.sales)} satış
        </span>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(product)} 
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">Düzenle</span>
        </button>
        <button 
          onClick={() => onDelete(product.id)} 
          className="p-2 bg-red-100 hover:bg-red-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-red-600 dark:text-red-500 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;