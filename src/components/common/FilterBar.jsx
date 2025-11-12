import { Search, Filter } from 'lucide-react';

/**
 * Projedeki tüm arama ve select/filtreleme işlemleri için jenerik bileşen
 * @param {string} searchTerm - Arama input'unun mevcut değeri
 * @param {function} onSearchChange - Arama input'u her değiştiğinde (e.target.value ile) tetiklenen fonksiyon
 * @param {string} filterValue - Select kutusunun mevcut seçili değeri
 * @param {function} onFilterChange - Select kutusu değiştiğinde (e target value ile) tetiklenen fonksiyon
 * @param {Array} filterOptions - Select kutusundaki seçenekler
 * @param {string} searchPlaceholder - Arama kutusunda görünecek metin.
 * @param {React.ReactNode} children - Bileşenin sağına eklenecek ekstra elementler (örn: Yeni Ekle butonu)
 */


const FilterBar = ({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  searchPlaceholder = "Ara...",
  children 

}) => {

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* Arama çubuğu */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
        />
      </div>
      
      {/* Kategori/Durum filtresi */}
      {filterOptions && onFilterChange && (
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Ekstra Butonlar  */}
      {children}
    </div>
  );
};

export default FilterBar;