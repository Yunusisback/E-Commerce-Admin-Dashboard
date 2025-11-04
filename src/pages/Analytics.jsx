import { useState } from 'react';
import DateFilter from '../components/common/DateFilter';
import RevenueChart from '../components/analytics/RevenueChart';
import ProductPerformance from '../components/analytics/ProductPerformance';
import CustomerInsights from '../components/analytics/CustomerInsights';
import { 
  analyticsRevenueData, 
  productPerformanceData, 
  customerInsightsData 
} from '../data/mockData';


const Analytics = () => {
  const [filter, setFilter] = useState('30d'); 

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    
    // TODO: Filtre değiştiğinde (newFilter), API'den yeni veri çek
    // veya mockData'yı filtrele (eğer mockData daha geniş olsaydı)
    // Şimdilik sadece logluyoruz
    console.log('Analiz Filtresi Değişti:', newFilter);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analizler</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detaylı performans metrikleri ve analizler
          </p>
        </div>
        <DateFilter onFilterChange={handleFilterChange} />
      </div>

      {/* 1. Ana Gelir Grafiği (Tam genişlik) */}
      <RevenueChart data={analyticsRevenueData} />

      {/* 2. Müşteri ve Ürün Analizleri (50/50 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInsights data={customerInsightsData} />
        <ProductPerformance data={productPerformanceData} />
      </div>
      
    </div>
  );
};

export default Analytics;