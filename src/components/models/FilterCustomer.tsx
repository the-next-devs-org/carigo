import { useState } from "react";
import { X } from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

type CustomerFilters = {
  type?: string;
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
};

interface FilterCustomerProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: CustomerFilters) => void;
  currentFilters: CustomerFilters;
}

const FilterCustomer: React.FC<FilterCustomerProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<CustomerFilters>(currentFilters);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: CustomerFilters = {
      type: "",
      status: "",
      agreementType: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Customer Filters
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Customer Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={filters.type || ""}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">All Types</option>
                <option value="Client">Client</option>
                <option value="Owner">Owner</option>
                <option value="Agency">Agency</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate || ""}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
            />
          </div>
          <div>
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate || ""}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
            />
          </div>
        </div>

        <div className="p-6 border-t bg-white mt-auto">
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCustomer;
