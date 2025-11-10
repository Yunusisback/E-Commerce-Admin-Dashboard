import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../common/Card';
import { mockData } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme'; 

const CategoryChart = () => {
  const { theme } = useTheme();
  const categoryData = mockData.categoryData;

// Renk paletleri
  const LIGHT_COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EF4444']; 
  const DARK_COLORS =  ['#C4B5FD', '#FCD34D', '#4ADE80', '#60A5FA', '#FCA5A5']; 
  
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  // Grafik üzerine gelince çıkan özel tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      const { name, value, percentage } = payload[0].payload;
      const color = COLORS[categoryData.findIndex(d => d.name === name) % COLORS.length];

      return (
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-md shadow-2xl border border-gray-200 dark:border-zinc-700">
          <p className="font-semibold text-lg text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm" style={{ color: color }}>
            Satış: {formatCurrency(value)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Oran: {percentage}%</p>
        </div>
      );
    }
    return null;
  };



// Label konumunu pasta diliminin dışına taşıyan bileşen
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.9; 
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  const labelColor = COLORS[index % COLORS.length];

  return (
    <text 
      x={x} 
      y={y} 
      fill={labelColor} 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central" 
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



  // Modern Legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {entry.value}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              (%{categoryData[index].percentage})
            </span>
          </div>
        ))}
      </div>
    );
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
            innerRadius={70} 
            outerRadius={100} 
            paddingAngle={4} 
            dataKey="value"
            stroke="none" 
            label={renderCustomLabel} 
          >
            {categoryData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="transition-all duration-300 cursor-pointer"
                style={{ filter: 'brightness(1.05)', outline: 'none' }}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            dy="-0.8em" 
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl font-bold fill-gray-900 dark:fill-white"
          >
            100%
          </text>

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;