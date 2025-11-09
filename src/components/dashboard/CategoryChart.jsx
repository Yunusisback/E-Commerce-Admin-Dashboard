import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../common/Card';
import { mockData } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme'; 

// Kategori grafik bileşeni
const CategoryChart = () => {
  const { theme } = useTheme();
  const categoryData = mockData.categoryData;

  // Renk paletleri
  const LIGHT_COLORS = ['#f59e0b', '#10b981', '#0ea5e9', '#e11d48', '#7c3aed'];
  const DARK_COLORS =  ['#facc15', '#34d399', '#38bdf8', '#f43f5e', '#a78bfa'];
  
  // Tema  renkleri
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  // Özel tooltip bileşeni
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      const colorIndex = categoryData.findIndex(item => item.name === data.name);
      const color = COLORS[colorIndex % COLORS.length];

      return (
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
          <p className="font-semibold text-lg text-gray-900 dark:text-white">{data.name}</p>
   
          <p className="text-sm" style={{ color: color }}>
            Satış: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Oran: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        Kategori Bazlı Satışlar
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Kategorilere göre satış dağılımı
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
 
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`} 
            outerRadius={100} 
            fill="#8884d8"
            dataKey="value"
            stroke="none" 
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
           
            formatter={(value) => <span className="text-gray-700 dark:text-gray-300">{value}</span>}
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;