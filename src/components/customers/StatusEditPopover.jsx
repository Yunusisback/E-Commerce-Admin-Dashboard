import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Edit, Check } from 'lucide-react';



// Müşteri durumları ve etiketleri
const statuses = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
  { value: 'banned', label: 'Yasaklı' },
];

const StatusEditPopover = ({ customer, onStatusChange }) => {
  return (
    <Popover className="relative">
      {/* Menüyü açan "Düzenle" ikonu */}
      <Popover.Button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </Popover.Button>

      {/* Açılır Panel (Animasyonlu) */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-40 max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div className="relative flex flex-col bg-white dark:bg-zinc-800 p-2">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  // Tıklandığında ana 'Customers' sayfasındaki 'onStatusChange'i tetikle
                  onClick={() => onStatusChange(customer.id, status.value)}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {status.label}
                  </span>
                  {customer.status === status.value && (
                    // Mevcut durumu 'check' (tik) ikonu ile göster
                    <Check className="w-4 h-4 text-amber-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default StatusEditPopover;