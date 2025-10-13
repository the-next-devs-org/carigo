import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentsTable from "../paymentsTable/PaymentsTable";
import FilterPayments, {
  type PaymentFilters,
} from "../../models/FilterPayments";

const initialFilterState: PaymentFilters = {
  category: "",
  status: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
};

const AllPayment = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<PaymentFilters>(initialFilterState);
  const [filteredCount, setFilteredCount] = useState(0);

  const navigate = useNavigate();

  const handleApplyFilters = (newFilters: PaymentFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilterState);
    setSearch("");
  };

  const isFiltersApplied =
    Object.values(filters).some((value) => value !== "") || search !== "";

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 font-sans dashboard-cards font-plus-jakarta">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
        <div className="flex sm:flex-row flex-col gap-3 sm:items-center lg:mt-0 mt-4">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
              isFiltersApplied
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            }`}
            onClick={() => setShowFilterModal(true)}
            title="Filter agreements"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {isFiltersApplied && (
              <div className="flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                {filteredCount}
              </div>
            )}
                   
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={() => navigate("/add-new-payment")}
          >
            <span className="text-lg leading-none mb-1">+</span>
            New Payment
          </button>
        </div>
      </div>

      {isFiltersApplied && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 mb-6 flex items-center justify-between text-sm">
          <span>
            Showing <strong>{filteredCount}</strong> filtered payments
          </span>
          <button
            onClick={handleClearFilters}
            className="font-semibold hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      <PaymentsTable
        search={search}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        filters={filters}
        setFilteredCount={setFilteredCount}
      />
      <FilterPayments
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default AllPayment;
