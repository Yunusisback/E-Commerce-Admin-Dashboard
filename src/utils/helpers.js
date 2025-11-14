// Para formatı - Türk Lirası
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};


// Sayı formatı - Binlik ayırıcı
export const formatNumber = (number) => {
  return new Intl.NumberFormat('tr-TR').format(number);
};

// Yüzde formatı
export const formatPercentage = (value) => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

// Tarih formatı
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

// Durum rengi - Sipariş durumuna göre 
export const getStatusColor = (status) => {
  switch (status) {

    // Pozitif durum (Müşteri & Sipariş)
    case 'Teslim Edildi':
    case 'active':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30';
    
    // Nötr / Beklemede durum 
    case 'Hazırlanıyor':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30';
    
    // Bilgi durumu 
    case 'Kargoda':
      return 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30';


    case 'İade':
    return 'bg-gray-200 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300 border border-gray-300 dark:border-gray-600/40';


    // Negatif durum
    case 'İptal':
    case 'banned':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30';
    
    // Pasif durum 
    case 'Pasif':
    case 'inactive':
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-600';
  }
};

// Trend hesaplama
export const calculateTrend = (current, previous) => {
  if (!previous) return 0;
  const change = ((current - previous) / previous) * 100;
  return Math.round(change * 10) / 10; 
};