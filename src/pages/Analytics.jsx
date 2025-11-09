import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
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
  const { setPageTitle } = useApp();

  useEffect(() => {
    setPageTitle('Analizler'); 
  }, [setPageTitle]);

  const [filter, setFilter] = useState('30d'); 

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    console.log('Analiz Filtresi Değişti:', newFilter);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end"> {/* Sadece DateFilter kalıyorsa sağa yasla */}
         <DateFilter onFilterChange={handleFilterChange} />
      </div>

      <RevenueChart data={analyticsRevenueData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInsights data={customerInsightsData} />
        <ProductPerformance data={productPerformanceData} />
      </div>
      
    </div>
  );
};

export default Analytics;