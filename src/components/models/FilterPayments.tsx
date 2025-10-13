import React, { useState } from "react";
import { X } from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

export interface PaymentFilters {
  category: string;
  status: string;
  fromDate: string;
  toDate: string;
  minAmount: string;
  maxAmount: string;
}

interface FilterPaymentsProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: PaymentFilters) => void;
  currentFilters: PaymentFilters;
}

const initialFilterState: PaymentFilters = {
  category: "",
  status: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
};

const FilterPayments: React.FC<FilterPaymentsProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<PaymentFilters>(currentFilters);

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
    setFilters(initialFilterState);
    onApplyFilters(initialFilterState);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white w-full max-w-[420px] h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Filters
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
              Payment Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">All Categories</option>
                <option value="Swish">Swish</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Company">Company</option>
                <option value="Individual">Individual</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                  placeholder="From Date"
                />
              </div>
            </div>
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                  placeholder="To Date"
                />
              </div>
            </div>
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Min Amount (kr)
              </label>
              <input
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Min Amount (kr)"
              />
            </div>
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Max Amount (kr)
              </label>
              <input
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Max Amount (kr)"
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t bg-white mt-auto">
          <div className="flex gap-3">
            <button
              type="button"
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

export default FilterPayments;
