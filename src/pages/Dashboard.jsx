import { useState } from 'react'; 
import KPICard from '../components/dashboard/KPICard';
import SalesChart from '../components/dashboard/SalesChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import TopProducts from '../components/dashboard/TopProducts';
import RecentOrders from '../components/dashboard/RecentOrders';
import DateFilter from '../components/common/DateFilter';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { mockData } from '../data/mockData';



const Dashboard = () => {
  
  //  Veriler statik mockData'dan alınıp statee yüklendi
  // Artık bu verileri set fonksiyonları ile güncelleyebiliriz
  const [kpiStats, setKpiStats] = useState(mockData.kpis);
  const [salesTrend, setSalesTrend] = useState(mockData.salesTrend);
  const [categoryData, setCategoryData] = useState(mockData.categoryData);
  // (Diğerlerini de state'e alabiliriz  ama şimdilik bu 3'ü yeterli)

  /**
   *  DateFilter'dan gelen 'filter' değerini işleyen fonksiyon
   * Bu fonksiyon artık 'console.log' yerine state'i güncelliyor
   */
  const handleFilterChange = (filter) => {
    console.log('Seçilen filtre:', filter);

    
    // Biz şimdi 'mockData'yı değiştirerek simüle edelim:
    if (filter === '7d') {
      // KPI'ları 7 güne göre (rastgele) güncelle
      setKpiStats({
        totalSales: 45230,
        totalOrders: 310,
        averageOrderValue: 145,
        activeCustomers: 620
      });
      // Satış trendini (7 günlük) güncelle (mockData'nın son 7 elemanını al)
      setSalesTrend(mockData.salesTrend.slice(-7));
      
    } else if (filter === '30d') {
      // 30 güne (varsayılan) geri dön
      setKpiStats(mockData.kpis);
      setSalesTrend(mockData.salesTrend);
      
    } else if (filter === 'today') {
      // Bugüne özel (rastgele) veri
      setKpiStats({
        totalSales: 8500,
        totalOrders: 55,
        averageOrderValue: 154,
        activeCustomers: 400
      });
      // Sadece 1 günlük veri (mockData'nın son elemanı)
      setSalesTrend([mockData.salesTrend[mockData.salesTrend.length - 1]]);
    
    } else if (filter === 'year') {
      // Yıllık (rastgele) veri
       setKpiStats({
        totalSales: 1750000,
        totalOrders: 14500,
        averageOrderValue: 120,
        activeCustomers: 1050
      });
      // Yıllık veri için mockData'yı tekrar kullan (normalde API isteği olur)
      setSalesTrend(mockData.salesTrend);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">E-ticaret performans özeti</p>
        </div>
        {/* DateFilter'a 'handleFilterChange' fonksiyonunu prop olarak veriyoruz */}
        <DateFilter onFilterChange={handleFilterChange} />
      </div>

      {/* 4. ADIM: Bileşenler artık veriyi 'mockData'dan değil, 'state'den okuyor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Toplam Satış"
          value={kpiStats.totalSales} // Değişti
          trend={12.5}
          icon={DollarSign}
          type="currency"
        />
        <KPICard
          title="Toplam Sipariş"
          value={kpiStats.totalOrders} // Değişti
          trend={8.2}
          icon={ShoppingBag}
          type="number"
        />
        <KPICard
          title="Ortalama Sepet"
          value={kpiStats.averageOrderValue} // Değişti
          trend={5.7}
          icon={TrendingUp}
          type="currency"
        />
        <KPICard
          title="Aktif Müşteri"
          value={kpiStats.activeCustomers} // Değişti
          trend={-2.4}
          icon={Users}
          type="number"
        />
      </div>

      {/* 5. ADIM: Grafikler de artık 'stateden okuyor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesTrend} /> {/* Değişti */}
        </div>
        <div>
          <CategoryChart data={categoryData} /> {/* Değişti */}
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