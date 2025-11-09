import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatNumber } from '../../utils/helpers';

// KPI kart bileşeni
const KPICard = ({ title, value, trend, icon: Icon, type = 'number' }) => {

  // Trendin pozitif olup olmadığını belirler
  const isPositive = trend >= 0;
  
  // Değeri türüne göre formatlar"
  const formatValue = () => {
    if (type === 'currency') return formatCurrency(value);
    return formatNumber(value);
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {formatValue()}

          </h3>
          {/* Trend göstergesi */}
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(trend)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs geçen ay</span>
          </div>
        </div>
        
        {/* İkon alanı */}
        <div className="bg-blue-100 dark:bg-amber-900/50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-amber-400" />
        </div>
      </div>
    </Card>
  );
};
export default KPICard;