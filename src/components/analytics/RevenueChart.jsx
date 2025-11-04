import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

/**
 * Grafiğin üzerine gelindiğinde (hover) görünecek özel tooltip bileşeni.
 * Proje stiline (dark mode dahil) uyması ve para formatlaması için kullanılır.
 */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Gelir: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};


const RevenueChart = ({ data }) => {
  return (

    <Card>
      {/* 1. Başlık Alanı */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gelir Performansı</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Seçilen periyottaki günlük gelir</p>
      </div>
      
      {/* 2. Grafik Alanı  */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}

            // Y eksenindeki değerleri formatlar (örn: 15000 -> ₺15k)
            tickFormatter={(value) => `₺${value / 1000}k`} 
          />
          {/* Özel tooltipimizi burada çağırıyoruz */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* Grafiğin ana çubuk (Bar) bileşeni */}
          <Bar 
            dataKey="revenue" 
            name="Gelir" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;