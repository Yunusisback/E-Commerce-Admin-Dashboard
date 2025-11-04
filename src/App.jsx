import Layout from './components/layout/Layout';
import KPICard from './components/dashboard/KPICard';
import SalesChart from './components/dashboard/SalesChart';
import CategoryChart from './components/dashboard/CategoryChart';
import TopProducts from './components/dashboard/TopProducts';
import RecentOrders from './components/dashboard/RecentOrders';
import DateFilter from './components/common/DateFilter';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { mockData } from './data/mockData';

function App() {
  const handleFilterChange = (filter) => {
    console.log('Seçilen filtre:', filter);

    // Burada filtreleme işlemleri yapılabilir
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header with Date Filter */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">E-ticaret performans özeti</p>
          </div>
          <DateFilter onFilterChange={handleFilterChange} />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Toplam Satış"
            value={mockData.kpis.totalSales}
            trend={12.5}
            icon={DollarSign}
            type="currency"
          />
          <KPICard
            title="Toplam Sipariş"
            value={mockData.kpis.totalOrders}
            trend={8.2}
            icon={ShoppingBag}
            type="number"
          />
          <KPICard
            title="Ortalama Sepet"
            value={mockData.kpis.averageOrderValue}
            trend={5.7}
            icon={TrendingUp}
            type="currency"
          />
          <KPICard
            title="Aktif Müşteri"
            value={mockData.kpis.activeCustomers}
            trend={-2.4}
            icon={Users}
            type="number"
          />
        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={mockData.salesTrend} />
          </div>
          <div>
            <CategoryChart data={mockData.categoryData} />
          </div>
        </div>

        {/* Tables */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <TopProducts data={mockData.topProducts} />
          </div>
          <div className="lg:col-span-2">
            <RecentOrders data={mockData.recentOrders} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;