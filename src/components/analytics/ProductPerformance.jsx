import Card from "../common/Card";
import { formatCurrency, formatNumber } from "../../utils/helpers";


// Ürün performansı bileşeni
const ProductPerformance = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Ürün Performansı
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          En çok performans gösteren ürünlerin analizi
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                Ürün
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                Görüntülenme
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                Satış (Birim)
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                Dönüşüm Oranı
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                Toplam Gelir
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    
                   
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-contain shadow-sm bg-white p-0.5"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Görüntülenme */}
                <td className="py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatNumber(product.views)}
                </td>

                {/* Satılan birim  */}
                <td className="py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatNumber(product.unitsSold)}
                </td>

                {/* Dönüşüm oranı  */}
                <td className="py-3 px-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {product.conversionRate}%
                </td>

                {/* Toplam gelir  */}
                <td className="py-3 px-2 text-sm font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProductPerformance;