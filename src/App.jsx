import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                404 - Sayfa Bulunamadı
              </h1>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;