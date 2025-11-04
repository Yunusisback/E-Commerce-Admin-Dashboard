import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

const CategoryChart = ({ data }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {payload[0].payload.percentage}% toplam satıştan
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kategori Bazlı Satışlar</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Kategorilere göre satış dağılımı</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ percentage }) => `${percentage}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;