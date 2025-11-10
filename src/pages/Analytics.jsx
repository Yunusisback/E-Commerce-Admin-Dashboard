import { 
  mockData,
  analyticsRevenueData,
  productPerformanceData, 
  customerInsightsData 
} from '../data/mockData';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import DateFilter from '../components/common/DateFilter';
import RevenueChart from '../components/analytics/RevenueChart';
import ProductPerformance from '../components/analytics/ProductPerformance';
import CustomerInsights from '../components/analytics/CustomerInsights';


const Analytics = () => {
  const { setPageTitle } = useApp();
  useEffect(() => {
    setPageTitle('Analizler'); 
  }, [setPageTitle]);

  const [filter, setFilter] = useState('30d'); 
  
  // Gelir grafiği için state 
  const [revenueData, setRevenueData] = useState(mockData.salesTrend.map(d => ({ date: d.date, revenue: d.sales })));
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    console.log('Analiz Filtresi Değişti:', newFilter);

    // API çağrısını simüle et

    if (newFilter === '7d') {
      setRevenueData(mockData.salesTrend.slice(-7).map(d => ({ date: d.date, revenue: d.sales })));
    } else if (newFilter === '30d') {
      setRevenueData(mockData.salesTrend.map(d => ({ date: d.date, revenue: d.sales })));
    } else if (newFilter === 'today') {
      setRevenueData([mockData.salesTrend[mockData.salesTrend.length - 1]].map(d => ({ date: d.date, revenue: d.sales })));
    } else if (newFilter === 'year') {

      // Yıllık veri için 'analyticsRevenueData'yı (aylık veriler) kullan
      setRevenueData(analyticsRevenueData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detaylı performans metrikleri ve analizler
          </p>
        </div>
        <DateFilter onFilterChange={handleFilterChange} />
      </div>
      <RevenueChart data={revenueData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInsights data={customerInsightsData} />
        <ProductPerformance data={productPerformanceData} />
      </div>
      
    </div>
  );
};

export default Analytics;