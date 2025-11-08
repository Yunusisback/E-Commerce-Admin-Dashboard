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
    { id: 1, name: 'iPhone 16 Pro', sales: 12400, revenue: 385000, stock: 45 },
    { id: 2, name: 'Samsung Galaxy S25', sales: 9800, revenue: 294000, stock: 67 },
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
  { id: '#ORD-2401', customer: 'Ahmet Yılmaz', product: 'iPhone 16 Pro', amount: 31000, status: 'Teslim Edildi', date: '30 Eki 2024', email: 'ahmet@email.com' },
  { id: '#ORD-2402', customer: 'Ayşe Demir', product: 'Samsung Galaxy S25', amount: 28000, status: 'Kargoda', date: '30 Eki 2024', email: 'ayse@email.com' },
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

// Ürünler datası (image: 'URL'ler ile güncellendi)
export const allProducts = [
  { id: 1, name: 'iPhone 16 Pro', category: 'Elektronik', price: 31000, stock: 45, sales: 124, image: 'https://st-troy.mncdn.com/Content/media/ProductImg/original/mynf3tua-iphone-16-pro-128gb-desert-titanium-638617384632302005.jpg?width=785', status: 'active' },
  { id: 2, name: 'Samsung Galaxy S25', category: 'Elektronik', price: 28000, stock: 67, sales: 98, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvfokv_3kbRs8ofY0wwrLOvpwJjQvGQfxhQ&s', status: 'active' },
  { id: 3, name: 'AirPods Pro', category: 'Elektronik', price: 7500, stock: 120, sales: 85, image: 'https://w7.pngwing.com/pngs/801/441/png-transparent-airpods-pro-thumbnail.png', status: 'active' },
  { id: 4, name: 'MacBook Air M3', category: 'Elektronik', price: 45000, stock: 23, sales: 52, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6itQZMT2PwY2_exSDao1uyTLGtH-e7vhaRQ&s', status: 'active' },
  { id: 5, name: 'Apple Watch Series 9', category: 'Elektronik', price: 12000, stock: 89, sales: 48, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lX9mfoOr4Oxv9huxiiYExOcMGbmatsusdg&s', status: 'active' },
  { id: 6, name: 'iPad Air', category: 'Elektronik', price: 18500, stock: 56, sales: 67, image: 'https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/muxd3tua-apple-11-inc-ipad-air-m2-wi-fi-cellular-128gb-uzay-grisi-muxd3tua-638509375860704012.jpg', status: 'active' },
  { id: 7, name: 'Sony WH-1000XM5', category: 'Elektronik', price: 9800, stock: 78, sales: 43, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOux4xPx67B3OnDxjDlNlRkvE8msB70vjl7Q&s', status: 'active' },
  { id: 8, name: 'Adidas Spor Ayakkabı', category: 'Spor', price: 2500, stock: 150, sales: 89, image: 'https://e7.pngegg.com/pngimages/719/248/png-clipart-sneakers-white-shoe-adidas-racing-flat-adidas-white-outdoor-shoe.png', status: 'active' },
  { id: 9, name: 'Nike Koşu Ayakkabısı', category: 'Spor', price: 3200, stock: 120, sales: 76, image: 'https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png', status: 'active' },
  { id: 10, name: 'Ofis Koltuğu ', category: 'Ev & Yaşam ', price: 450, stock: 200, sales: 134, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBL2QPA86_4PGtFXhfLEgH5fxi4Y8fbf20g&s', status: 'active' },
  { id: 11, name: 'Kahve Makinesi', category: 'Ev & Yaşam', price: 3500, stock: 45, sales: 56, image: 'https://w7.pngwing.com/pngs/706/793/png-transparent-espresso-machines-coffeemaker-krups-coffee.png', status: 'active' },
  { id: 12, name: 'Dyson Süpürge', category: 'Ev & Yaşam', price: 15000, stock: 34, sales: 38, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlVmLNrsSvA-XzWYbl3Eaf1XRHv9R6PaztA&s', status: 'low-stock' },
  { id: 13, name: 'Karaca Yemek Takımı', category: 'Ev & Yaşam', price: 2800, stock: 67, sales: 45, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGZEzJQYFLYedJr3kdYa3QwuXGVxfcQHSQA&s', status: 'active' },
  { id: 14, name: 'PlayStation 5', category: 'Elektronik', price: 18000, stock: 12, sales: 67, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEFb4Z484ryn9AFyU1CbvyC9wjpGGl25a_w&s', status: 'low-stock' },
  { id: 15, name: 'Sapiens Kitabı', category: 'Kitap', price: 280, stock: 0, sales: 234, image: 'https://www.ekinkitap.com/u/ekinyayinevi/img/b/h/a/hayvanlardan-tanrilara-sapiens3130a450a888674275660ddeb5ac722f.png', status: 'out-of-stock' },
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

// Müşteri istatistikleri
export const customerStats = {
  total: 1250,
  newThisMonth: 82,
  active: 970,
  inactive: 280
};

// Tüm müşteriler
export const allCustomers = [
  { id: 'CUST-001', name: 'Ahmet Yılmaz', email: 'ahmet@email.com', phone: '0555 123 4567', totalSpent: 15400, orderCount: 5, status: 'active', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'CUST-002', name: 'Ayşe Demir', email: 'ayse@email.com', phone: '0555 234 5678', totalSpent: 8200, orderCount: 3, status: 'active', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'CUST-003', name: 'Mehmet Kaya', email: 'mehmet@email.com', phone: '0555 345 6789', totalSpent: 23000, orderCount: 8, status: 'active', avatar: 'https://i.pravatar.cc/150?img=17' },
  { id: 'CUST-004', name: 'Fatma Şahin', email: 'fatma@email.com', phone: '0555 456 7890', totalSpent: 5100, orderCount: 2, status: 'inactive', avatar: 'https://i.pravatar.cc/150?img=19' },
  { id: 'CUST-005', name: 'Ali Öztürk', email: 'ali@email.com', phone: '0555 567 8901', totalSpent: 3000, orderCount: 1, status: 'banned', avatar: 'https://i.pravatar.cc/150?img=56' }
];

// Analitik - Gelir Datası
export const analyticsRevenueData = [
  { date: '01 Kas', revenue: 4500 },
  { date: '02 Kas', revenue: 4800 },
  { date: '03 Kas', revenue: 5100 },
  { date: '04 Kas', revenue: 4900 },
  { date: '05 Kas', revenue: 5300 },
  { date: '06 Kas', revenue: 5800 },
  { date: '07 Kas', revenue: 6200 },
  { date: '08 Kas', revenue: 5900 },
  { date: '09 Kas', revenue: 6400 },
  { date: '10 Kas', revenue: 7100 },
  { date: '11 Kas', revenue: 6800 },
  { date: '12 Kas', revenue: 7500 },
];

// Ürün Performans Datası (image: 'URL'ler ile güncellendi)
export const productPerformanceData = [
  { id: 'p1', name: 'iPhone 16 Pro', image: 'https://pngimg.com/d/iphone16_PNG38.png', views: 25000, unitsSold: 124, conversionRate: 4.96, revenue: 384400 },
  { id: 'p2', name: 'Samsung Galaxy S25', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvfokv_3kbRs8ofY0wwrLOvpwJjQvGQfxhQ&s', views: 18000, unitsSold: 98, conversionRate: 5.44, revenue: 274400 },
  { id: 'p3', name: 'AirPods Pro', image: 'https://w7.pngwing.com/pngs/801/441/png-transparent-airpods-pro-thumbnail.png', views: 35000, unitsSold: 85, conversionRate: 2.43, revenue: 63750 },
  { id: 'p4', name: 'MacBook Air M3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6itQZMT2PwY2_exSDao1uyTLGtH-e7vhaRQ&s', views: 12000, unitsSold: 52, conversionRate: 4.33, revenue: 234000 },
  { id: 'p8', name: 'Adidas Spor Ayakkabı', image: 'https://e7.pngegg.com/pngimages/719/248/png-clipart-sneakers-white-shoe-adidas-racing-flat-adidas-white-outdoor-shoe.png', views: 45000, unitsSold: 89, conversionRate: 1.98, revenue: 222500 },
  { id: 'p15', name: 'Sapiens Kitabı', image: 'https://www.ekinkitap.com/u/ekinyayinevi/img/b/h/a/hayvanlardan-tanrilara-sapiens3130a450a888674275660ddeb5ac722f.png', views: 60000, unitsSold: 234, conversionRate: 0.39, revenue: 65520 },
];

// Müşteri İçgörüleri Datası
export const customerInsightsData = {
  metrics: {
    clv: 1250, // Müşteri Yaşam Boyu Değeri
    churnRate: 5.2, // Ayrılma Oranı (%)
    cac: 85, // Müşteri Edinme Maliyeti
  },
  newVsReturning: [
    { name: 'Yeni Müşteri', value: 180, percentage: 22 },
    { name: 'Mevcut Müşteri', value: 640, percentage: 78 },
  ]
};