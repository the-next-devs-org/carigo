import React, { useState } from "react";
import { X } from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface AgreementFilters {
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface FilterAgreementsProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AgreementFilters) => void;
  currentFilters: AgreementFilters;
}

const FilterAgreements: React.FC<FilterAgreementsProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<AgreementFilters>(currentFilters);

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
    const resetFilters: AgreementFilters = {
      status: "",
      agreementType: "",
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
            Sökfilter
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
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="">Alla statusar</option>
                <option value="active">Skapad</option>
                <option value="inactive">Signerad</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Från datum
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
                Till datum
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
                Min belopp
              </label>
              <input
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Min belopp"
              />
            </div>
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Max belopp
              </label>
              <input
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                placeholder="Max belopp"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Sortera efter
            </label>
            <div className="relative">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              >
                <option value="date-desc">Nyast först</option>
                <option value="date-asc">Äldst först</option>
                <option value="amount-desc">Belopp hög-låg</option>
                <option value="amount-asc">Belopp låg-hög</option>
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
              Återställ
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
            >
              Tillämpa filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAgreements;
