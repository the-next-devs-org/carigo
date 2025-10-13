import { useState } from "react";
import { X } from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface FilterInvoicesProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: InvoiceFilters) => void;
  currentFilters: InvoiceFilters;
}

const FilterInvoices: React.FC<FilterInvoicesProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<InvoiceFilters>(currentFilters);

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
    const resetFilters: InvoiceFilters = {
      status: "",
      customerType: "",
      fromDate: "",
      toDate: "",
      minAmount: "",
      maxAmount: "",
      sortBy: "date-desc",
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col">
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
              Type
            </label>
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">All Types</option>
                <option value="paid">Invoice</option>
                <option value="pending">Receipt</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Customer Type
            </label>
            <div className="relative">
              <select
                name="customerType"
                value={filters.customerType}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">All Customer Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
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
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
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
                value={filters.toDate}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Min Amount"
              />
            </div>
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Max Amount"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="relative">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount High-Low</option>
                <option value="amount-asc">Amount Low-High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
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

export default FilterInvoices;
