import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

/**
 * Grafiğin özel tooltipi.
 * Bu grafik çift veri (Satış ve Sipariş) gösterdiği için
 * tooltip'te her ikisini de (payload[0] ve payload[1]) formatlayarak gösterir
 */

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {payload[0].payload.date}
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Satış: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-sm text-green-600 dark:text-green-400">
          Sipariş: {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};


const SalesChart = ({ data }) => {
  return (
    <Card>

      {/* 1. Başlık Alanı */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Satış Trendi</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Son 30 günlük satış performansı</p>
      </div>
      
      {/* 2. Grafik Alanı */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Satış (₺)"
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Sipariş"
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesChart;