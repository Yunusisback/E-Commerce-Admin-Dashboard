import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme'; 

// Özel tooltip bileşeni
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {payload[0].payload.date}
        </p>
        <p className="text-sm text-blue-600 dark:text-amber-400">
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

// Satış grafiği bileşeni
const SalesChart = ({ data }) => {
  const { theme } = useTheme();

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Satış Trendi</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Son 30 günlük satış performansı</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" opacity={0.3} />
          <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} tickFormatter={(value) => `₺${value / 1000}k`} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="sales"
            stroke={theme === 'light' ? '#3B82F6' : '#facc15'} 
            strokeWidth={2}
            name="Satış (₺)"
            dot={{ fill: theme === 'light' ? '#3B82F6' : '#facc15', r: 4 }}
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