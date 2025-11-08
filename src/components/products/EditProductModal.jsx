import { useState, useEffect, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Button from '../common/Button';



const inputStyle = "w-full mt-1 px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500";
const labelStyle = "text-sm font-medium text-gray-700 dark:text-gray-300";

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  // Formun state'i
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
  });

  // 'product' prop'u her değiştiğinde (yeni bir ürünü düzenlemek için açıldığında)
  // formun state'ini bu yeni ürünle doldur
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = (name === 'price' || name === 'stock') ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, ...formData });
    onClose(); 
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
  
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Ürünü Düzenle: {product?.name}
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className={labelStyle}>Ürün Adı</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputStyle} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="category" className={labelStyle}>Kategori</label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputStyle} 
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className={labelStyle}>Fiyat (₺)</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={inputStyle} 
                      />
                    </div>
                    <div>
                      <label htmlFor="stock" className={labelStyle}>Stok</label>
                      <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className={inputStyle} 
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                
                    <Button type="button" variant="secondary" onClick={onClose}>
                      İptal
                    </Button>
                    <Button type="submit" variant="primary">
                      Kaydet
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProductModal;