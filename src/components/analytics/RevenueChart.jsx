import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';



const RevenueChart = ({ data }) => {
  const { theme } = useTheme();

  // Renkler
  const REVENUE_COLOR = theme === 'light' ? '#fbbf24' : '#fcd34d'; 

  // Grafik üzerine gelince çıkan özel tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
            {label}
          </p>
          <p className="text-sm" style={{ color: REVENUE_COLOR }}>
            Gelir: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        Gelir Performansı
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Seçilen periyottaki günlük/aylık gelir
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
           
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          
              <stop offset="5%" stopColor={REVENUE_COLOR} stopOpacity={1} />
            
              <stop offset="95%" stopColor={REVENUE_COLOR} stopOpacity={0.6} />
            </linearGradient>
          </defs>

       
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={theme === 'dark' ? '#3f3f46' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="date" 
            stroke={theme === 'dark' ? '#a1a1aa' : '#3f3f46'} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#a1a1aa' : '#3f3f46'} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₺${value / 1000}K`} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
          />
          
        
          <Bar 
            dataKey="revenue" 
            fill="url(#colorRevenue)" 
            barSize={20}
            radius={[4, 4, 0, 0]} 
            activeBar={{ fill: REVENUE_COLOR, fillOpacity: 0.8 }} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;