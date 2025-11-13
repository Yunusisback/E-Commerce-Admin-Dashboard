import { useState } from 'react';

// Tarih filtre bileşeni
const DateFilter = ({ onFilterChange }) => {
  
  // Aktif filtre durumunu yönetir
  const [activeFilter, setActiveFilter] = useState('30d');
  
  // Filtre seçenekleri 
  const filters = [
    { label: 'Bugün', value: 'today' },
    { label: '7 Gün', value: '7d' },
    { label: '30 Gün', value: '30d' },
    { label: 'Yıllık', value: 'year' }
  ];
  
  // Filtre tıklama işleyicisi
  const handleFilterClick = (value) => {
    setActiveFilter(value);
    if (onFilterChange) onFilterChange(value);
  };
  
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter.value
              ? 'bg-blue-600 text-white dark:bg-amber-600 dark:text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600' 
          }`}
        >
          {filter.label} 
        </button>
      ))}
    </div>
  );
};
export default DateFilter;