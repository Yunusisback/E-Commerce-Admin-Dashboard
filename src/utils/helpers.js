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
  const colors = {
    'Teslim Edildi': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Kargoda': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Hazırlanıyor': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'İptal': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Trend hesaplama (örnek: geçen aya göre artış/azalış)

export const calculateTrend = (current, previous) => {
  if (!previous) return 0;
  const change = ((current - previous) / previous) * 100;
  return Math.round(change * 10) / 10; // 1 ondalık basamak
};