import { TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatNumber } from '../../utils/helpers';



const TopProducts = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">En Çok Satan Ürünler</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Top 5 ürün performansı</p>
      </div>
      <div className="space-y-4">
        {data.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4">
   
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600 dark:text-amber-400">#{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatNumber(product.sales)} satış • Stok: {product.stock}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(product.revenue)}
              </p>
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">+12%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopProducts;