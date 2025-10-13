import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../invoiceTable/InvoiceTable";
import FilterInvoices from "../../models/FilterInvoices";

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

const initialFilterState: InvoiceFilters = {
  status: "",
  customerType: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date-desc",
};

const AllInvoices = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [invoiceFilters, setInvoiceFilters] =
    useState<InvoiceFilters>(initialFilterState);
  const [filteredCount, setFilteredCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleClearFilters = () => {
    setInvoiceFilters(initialFilterState);
    setSearch("");
  };

  const isFiltersApplied =
    Object.values(invoiceFilters).some(
      (value) => value !== "" && value !== "date-desc"
    ) || search !== "";

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 font-sans dashboard-cards font-plus-jakarta">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">All Invoices</h2>
        <div className="flex sm:flex-row flex-col gap-3 sm:items-center lg:mt-0 mt-4">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 top-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                className="p-1.5 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter className="h-4 w-4 text-gray-400" />
              </button>
            </div> */}
          </div>
          {/* Professional Filter Button */}
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
          {/* <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={() => navigate("/add-new-invoice")}
          >
            <span className="text-lg leading-none mb-1">+</span>
            Create Invoice
          </button> */}
          <div className="relative">
            <button
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <span className="text-lg leading-none mb-1">+</span>
              Create
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute sm:right-0 mt-2 w-56 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-invoice")}
                >
                  <span>📄</span> Invoice
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-receipt")}
                >
                  <span>📄</span> Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFiltersApplied && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 mb-6 flex items-center justify-between text-sm">
          <span>
            Showing <strong>{filteredCount}</strong> filtered invoices
          </span>
          <button
            onClick={handleClearFilters}
            className="font-semibold hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      <InvoiceTable
        search={search}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        filters={invoiceFilters}
        setFilteredCount={setFilteredCount}
      />
      {showFilterModal && (
        <FilterInvoices
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setInvoiceFilters}
          currentFilters={invoiceFilters}
        />
      )}
    </div>
  );
};

export default AllInvoices;
