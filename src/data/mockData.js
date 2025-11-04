export const mockData = {
  // KPI Data

  kpis: {
    totalSales: 145890,
    totalOrders: 1247,
    averageOrderValue: 117,
    activeCustomers: 892
  },

  // Günlük satış trendi (son 30 gün)

  salesTrend: [
    { date: '01 Eki', sales: 4200, orders: 45 },
    { date: '02 Eki', sales: 3800, orders: 38 },
    { date: '03 Eki', sales: 5100, orders: 52 },
    { date: '04 Eki', sales: 4600, orders: 48 },
    { date: '05 Eki', sales: 5400, orders: 55 },
    { date: '06 Eki', sales: 4900, orders: 51 },
    { date: '07 Eki', sales: 5800, orders: 59 },
    { date: '08 Eki', sales: 4300, orders: 44 },
    { date: '09 Eki', sales: 4700, orders: 47 },
    { date: '10 Eki', sales: 5200, orders: 53 },
    { date: '11 Eki', sales: 4800, orders: 49 },
    { date: '12 Eki', sales: 5500, orders: 56 },
    { date: '13 Eki', sales: 6100, orders: 62 },
    { date: '14 Eki', sales: 5700, orders: 58 },
    { date: '15 Eki', sales: 4900, orders: 50 },
    { date: '16 Eki', sales: 5300, orders: 54 },
    { date: '17 Eki', sales: 4600, orders: 47 },
    { date: '18 Eki', sales: 5000, orders: 51 },
    { date: '19 Eki', sales: 5400, orders: 55 },
    { date: '20 Eki', sales: 4800, orders: 49 },
    { date: '21 Eki', sales: 5600, orders: 57 },
    { date: '22 Eki', sales: 5200, orders: 53 },
    { date: '23 Eki', sales: 4700, orders: 48 },
    { date: '24 Eki', sales: 5100, orders: 52 },
    { date: '25 Eki', sales: 5900, orders: 60 },
    { date: '26 Eki', sales: 5400, orders: 55 },
    { date: '27 Eki', sales: 4900, orders: 50 },
    { date: '28 Eki', sales: 5300, orders: 54 },
    { date: '29 Eki', sales: 5700, orders: 58 },
    { date: '30 Eki', sales: 6200, orders: 63 }
  ],

  // Kategori bazlı satışlar

  categoryData: [
    { name: 'Elektronik', value: 45000, percentage: 31 },
    { name: 'Giyim', value: 38000, percentage: 26 },
    { name: 'Ev & Yaşam', value: 28000, percentage: 19 },
    { name: 'Kitap', value: 20000, percentage: 14 },
    { name: 'Spor', value: 14890, percentage: 10 }
  ],

  // En çok satan ürünler

  topProducts: [
    { id: 1, name: 'iPhone 15 Pro', sales: 12400, revenue: 385000, stock: 45 },
    { id: 2, name: 'Samsung Galaxy S24', sales: 9800, revenue: 294000, stock: 67 },
    { id: 3, name: 'AirPods Pro', sales: 8500, revenue: 212500, stock: 120 },
    { id: 4, name: 'MacBook Air M3', sales: 5200, revenue: 468000, stock: 23 },
    { id: 5, name: 'Apple Watch Series 9', sales: 4800, revenue: 192000, stock: 89 }
  ],

  // Son siparişler

  recentOrders: [
    { id: '#ORD-2401', customer: 'Ahmet Yılmaz', product: 'iPhone 15 Pro', amount: 31000, status: 'Teslim Edildi', date: '30 Eki 2024' },
    { id: '#ORD-2402', customer: 'Ayşe Demir', product: 'Samsung Galaxy S24', amount: 28000, status: 'Kargoda', date: '30 Eki 2024' },
    { id: '#ORD-2403', customer: 'Mehmet Kaya', product: 'AirPods Pro', amount: 7500, status: 'Hazırlanıyor', date: '29 Eki 2024' },
    { id: '#ORD-2404', customer: 'Fatma Şahin', product: 'MacBook Air M3', amount: 45000, status: 'Teslim Edildi', date: '29 Eki 2024' },
    { id: '#ORD-2405', customer: 'Ali Öztürk', product: 'Apple Watch Series 9', amount: 12000, status: 'Kargoda', date: '28 Eki 2024' },
    { id: '#ORD-2406', customer: 'Zeynep Çelik', product: 'iPad Air', amount: 18500, status: 'Teslim Edildi', date: '28 Eki 2024' },
    { id: '#ORD-2407', customer: 'Can Arslan', product: 'Sony WH-1000XM5', amount: 9800, status: 'Hazırlanıyor', date: '27 Eki 2024' }
  ]
};

// Daha fazla sipariş datası

export const allOrders = [
  { id: '#ORD-2401', customer: 'Ahmet Yılmaz', product: 'iPhone 15 Pro', amount: 31000, status: 'Teslim Edildi', date: '30 Eki 2024', email: 'ahmet@email.com' },
  { id: '#ORD-2402', customer: 'Ayşe Demir', product: 'Samsung Galaxy S24', amount: 28000, status: 'Kargoda', date: '30 Eki 2024', email: 'ayse@email.com' },
  { id: '#ORD-2403', customer: 'Mehmet Kaya', product: 'AirPods Pro', amount: 7500, status: 'Hazırlanıyor', date: '29 Eki 2024', email: 'mehmet@email.com' },
  { id: '#ORD-2404', customer: 'Fatma Şahin', product: 'MacBook Air M3', amount: 45000, status: 'Teslim Edildi', date: '29 Eki 2024', email: 'fatma@email.com' },
  { id: '#ORD-2405', customer: 'Ali Öztürk', product: 'Apple Watch Series 9', amount: 12000, status: 'Kargoda', date: '28 Eki 2024', email: 'ali@email.com' },
  { id: '#ORD-2406', customer: 'Zeynep Çelik', product: 'iPad Air', amount: 18500, status: 'Teslim Edildi', date: '28 Eki 2024', email: 'zeynep@email.com' },
  { id: '#ORD-2407', customer: 'Can Arslan', product: 'Sony WH-1000XM5', amount: 9800, status: 'Hazırlanıyor', date: '27 Eki 2024', email: 'can@email.com' },
  { id: '#ORD-2408', customer: 'Elif Yıldız', product: 'iPhone 15', amount: 27000, status: 'Teslim Edildi', date: '27 Eki 2024', email: 'elif@email.com' },
  { id: '#ORD-2409', customer: 'Burak Aydın', product: 'Samsung TV 55"', amount: 22000, status: 'Kargoda', date: '26 Eki 2024', email: 'burak@email.com' },
  { id: '#ORD-2410', customer: 'Selin Korkmaz', product: 'Dyson V15', amount: 15000, status: 'Hazırlanıyor', date: '26 Eki 2024', email: 'selin@email.com' },
  { id: '#ORD-2411', customer: 'Kaan Özkan', product: 'PlayStation 5', amount: 18000, status: 'Teslim Edildi', date: '25 Eki 2024', email: 'kaan@email.com' },
  { id: '#ORD-2412', customer: 'Deniz Aksoy', product: 'Nintendo Switch', amount: 9500, status: 'İptal', date: '25 Eki 2024', email: 'deniz@email.com' },
];

// Sipariş istatistikleri

export const orderStats = {
  pending: 15,
  processing: 28,
  shipped: 45,
  delivered: 156,
  cancelled: 8
};

// Ürünler datası

export const allProducts = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Elektronik', price: 31000, stock: 45, sales: 124, image: '📱', status: 'active' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'Elektronik', price: 28000, stock: 67, sales: 98, image: '📱', status: 'active' },
  { id: 3, name: 'AirPods Pro', category: 'Elektronik', price: 7500, stock: 120, sales: 85, image: '🎧', status: 'active' },
  { id: 4, name: 'MacBook Air M3', category: 'Elektronik', price: 45000, stock: 23, sales: 52, image: '💻', status: 'active' },
  { id: 5, name: 'Apple Watch Series 9', category: 'Elektronik', price: 12000, stock: 89, sales: 48, image: '⌚', status: 'active' },
  { id: 6, name: 'iPad Air', category: 'Elektronik', price: 18500, stock: 56, sales: 67, image: '📱', status: 'active' },
  { id: 7, name: 'Sony WH-1000XM5', category: 'Elektronik', price: 9800, stock: 78, sales: 43, image: '🎧', status: 'active' },
  { id: 8, name: 'Adidas Spor Ayakkabı', category: 'Spor', price: 2500, stock: 150, sales: 89, image: '👟', status: 'active' },
  { id: 9, name: 'Nike Koşu Ayakkabısı', category: 'Spor', price: 3200, stock: 120, sales: 76, image: '👟', status: 'active' },
  { id: 10, name: 'Yoga Matı', category: 'Spor', price: 450, stock: 200, sales: 134, image: '🧘', status: 'active' },
  { id: 11, name: 'Kahve Makinesi', category: 'Ev & Yaşam', price: 3500, stock: 45, sales: 56, image: '☕', status: 'active' },
  { id: 12, name: 'Dyson Süpürge', category: 'Ev & Yaşam', price: 15000, stock: 34, sales: 38, image: '🧹', status: 'low-stock' },
  { id: 13, name: 'Karaca Yemek Takımı', category: 'Ev & Yaşam', price: 2800, stock: 67, sales: 45, image: '🍽️', status: 'active' },
  { id: 14, name: 'PlayStation 5', category: 'Elektronik', price: 18000, stock: 12, sales: 67, image: '🎮', status: 'low-stock' },
  { id: 15, name: 'Sapiens Kitabı', category: 'Kitap', price: 280, stock: 0, sales: 234, image: '📚', status: 'out-of-stock' },
];

// Ürün kategorileri
export const productCategories = [
  { value: 'all', label: 'Tüm Kategoriler' },
  { value: 'Elektronik', label: 'Elektronik' },
  { value: 'Spor', label: 'Spor' },
  { value: 'Ev & Yaşam', label: 'Ev & Yaşam' },
  { value: 'Kitap', label: 'Kitap' },
  { value: 'Giyim', label: 'Giyim' }
];