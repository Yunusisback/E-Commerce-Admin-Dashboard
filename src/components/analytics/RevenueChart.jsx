import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme'; 



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </p>
        <p className="text-sm text-blue-600 dark:text-amber-400">
          Gelir: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data }) => {
  const { theme } = useTheme();

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gelir Performansı</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Seçilen periyottaki günlük gelir</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₺${value / 1000}k`} 
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend />
          
          <Bar 
            dataKey="revenue" 
            name="Gelir" 
            fill={theme === 'light' ? '#3B82F6' : '#facc15'} 
            radius={[4, 4, 0, 0]} 
            activeBar={false} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;