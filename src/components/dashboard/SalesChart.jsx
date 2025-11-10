import {
  LineChart,
  Area, 
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import Card from '../common/Card';
import { formatCurrency, formatNumber } from '../../utils/helpers';

const SalesChart = ({ data, filter }) => { 
  const { theme } = useTheme();

  // Renkler 
  const SALES_COLOR = theme === 'light' ? '#8b5cf6' : '#a78bfa'; 
  const ORDER_COLOR = theme === 'light' ? '#10b981' : '#34d399'; 

  // Grafik üzerine gelince çıkan özel tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sales = payload.find(p => p.dataKey === 'sales');
      const orders = payload.find(p => p.dataKey === 'orders');

      return (
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
            {label}
          </p>
          <p className="text-sm" style={{ color: SALES_COLOR }}>
            Satış: {formatCurrency(sales?.value || 0)}
          </p>
          <p className="text-sm" style={{ color: ORDER_COLOR }}>
            Sipariş: {formatNumber(orders?.value || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        Satış Trendi
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Seçilen periyottaki performans
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          //  Filter propu değiştiğinde grafik animasyonu tetiklenir
          key={filter} 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradyan Tanımlamaları */}
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SALES_COLOR} stopOpacity={0.4} />
              <stop offset="95%" stopColor={SALES_COLOR} stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={ORDER_COLOR} stopOpacity={0.4} />
              <stop offset="95%" stopColor={ORDER_COLOR} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Grid çizgileri ve Axis'ler */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? '#3f3f46' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="date" 
            stroke={theme === 'dark' ? '#a1a1aa' : '#3f3f46'} 
            tickLine={false} 
            axisLine={false}
            // Yıllık görünümde X ekseni etiketlerini ayarla
            tickFormatter={(tick) => {
                if (filter === 'year') {
                    return tick.split(' ')[0];
                }
                return tick;
            }}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#a1a1aa' : '#3f3f46'} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₺${value / 1000}K`} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: theme === 'dark' ? SALES_COLOR : ORDER_COLOR, strokeWidth: 1, strokeDasharray: "3 3" }} 
          />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value) => <span className="text-gray-700 dark:text-gray-300">{value}</span>}
          />
          
          {/* Area ve Line Tanımlamaları */}
          <Area
            type="monotone"
            dataKey="orders"
            stroke={ORDER_COLOR}
            fill="url(#colorOrders)" 
            fillOpacity={1}
            strokeWidth={2}
            dot={{ r: 4, fill: ORDER_COLOR }}
            animationDuration={700} 
          />
          
          <Area
            type="monotone"
            dataKey="sales"
            stroke={SALES_COLOR}
            fill="url(#colorSales)" 
            fillOpacity={1}
            strokeWidth={2}
            dot={{ r: 4, fill: SALES_COLOR }}
            animationDuration={700} 
          />

        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesChart;