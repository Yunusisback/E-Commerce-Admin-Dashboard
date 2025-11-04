import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { TrendingUp, TrendingDown, DollarSign, UserCheck } from 'lucide-react';

const CustomerInsights = ({ data }) => {
  const COLORS = ['#3B82F6', '#10B981']; 

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Müşteri Analizleri</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Müşteri davranışı ve değeri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sol Taraf*/}

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Müşteri Yaşam Boyu Değeri (CLV)</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(data.metrics.clv)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Müşteri Edinme Maliyeti (CAC)</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(data.metrics.cac)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ayrılma Oranı (Churn)</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.metrics.churnRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Sağ Taraf*/}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2 text-center">
            Yeni vs. Mevcut Müşteri
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.newVsReturning}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {data.newVsReturning.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} müşteri`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </Card>
  );
};

export default CustomerInsights;