import { useState, useEffect } from 'react'; 
import { useApp } from '../context/AppContext';
import KPICard from '../components/dashboard/KPICard';
import SalesChart from '../components/dashboard/SalesChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import TopProducts from '../components/dashboard/TopProducts';
import RecentOrders from '../components/dashboard/RecentOrders';
import DateFilter from '../components/common/DateFilter';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { mockData } from '../data/mockData';



const Dashboard = () => {
  const { setPageTitle } = useApp();

  useEffect(() => {
    setPageTitle('Dashboard'); 
  }, [setPageTitle]);

// Filtre state'i
  const [filter, setFilter] = useState('30d'); 
  
  const [kpiStats, setKpiStats] = useState(mockData.kpis);
  const [salesTrend, setSalesTrend] = useState(mockData.salesTrend);
  const [categoryData, setCategoryData] = useState(mockData.categoryData);

  // Bu fonksiyon DateFilter'dan çağrılır
  const handleFilterChange = (newFilter) => {
    console.log('Seçilen filtre:', newFilter);
    setFilter(newFilter); 
    
// Filtreye göre verileri güncelle
    if (newFilter === '7d') {
      setKpiStats({
        totalSales: 45230,
        totalOrders: 310,
        averageOrderValue: 145,
        activeCustomers: 620
      });
      setSalesTrend(mockData.salesTrend.slice(-7));
    } else if (newFilter === '30d') {
      setKpiStats(mockData.kpis);
      setSalesTrend(mockData.salesTrend);
    } else if (newFilter === 'today') {
      setKpiStats({
        totalSales: 8500,
        totalOrders: 55,
        averageOrderValue: 154,
        activeCustomers: 400
      });
      setSalesTrend([mockData.salesTrend[mockData.salesTrend.length - 1]]);
    } else if (newFilter === 'year') {
       setKpiStats({
        totalSales: 1750000,
        totalOrders: 14500,
        averageOrderValue: 120,
        activeCustomers: 1050
      });
      setSalesTrend(mockData.analyticsRevenueData.map(d => ({ 
             date: d.date.split(' ')[0], 
             sales: d.revenue, 
             orders: 0 
          }))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DateFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Toplam Satış"
          value={kpiStats.totalSales} 
          trend={12.5}
          icon={DollarSign}
          type="currency"
        />
        <KPICard
          title="Toplam Sipariş"
          value={kpiStats.totalOrders} 
          trend={8.2}
          icon={ShoppingBag}
          type="number"
        />
        <KPICard
          title="Ortalama Sepet"
          value={kpiStats.averageOrderValue} 
          trend={5.7}
          icon={TrendingUp}
          type="currency"
        />
        <KPICard
          title="Aktif Müşteri"
          value={kpiStats.activeCustomers} 
          trend={-2.4}
          icon={Users}
          type="number"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesTrend} filter={filter} /> 
        </div>
        <div>
          <CategoryChart data={categoryData} /> 
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <TopProducts data={mockData.topProducts} />
        </div>
        <div className="lg:col-span-2">
          <RecentOrders data={mockData.recentOrders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;