import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AgreementsTable from "../agreementsTable/AgreementsTable";
import FilterAgreements from "../../models/FilterAgreements";

interface AgreementFilters {
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

const initialFilterState: AgreementFilters = {
  status: "",
  agreementType: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date-desc",
};

const AllAgreements = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [agreementFilters, setAgreementFilters] =
    useState<AgreementFilters>(initialFilterState);
  const [filteredCount, setFilteredCount] = useState(0);

  const navigate = useNavigate();

  const handleClearFilters = () => {
    setAgreementFilters(initialFilterState);
    setSearch("");
  };

  const isFiltersApplied =
    Object.values(agreementFilters).some(
      (value) => value !== "" && value !== "date-desc"
    ) || search !== "";

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 font-sans dashboard-cards font-plus-jakarta">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Alla avtal</h2>
        <div className="flex sm:flex-row justify-between flex-col gap-3 sm:items-center lg:mt-0 mt-4">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Sök"
              className="w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Professional Filter Button */}
          <button
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
              isFiltersApplied
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            }`}
            onClick={() => setShowFilterModal(true)}
            title="Filtrera avtal"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {isFiltersApplied && (
              <div className="flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                {filteredCount}
              </div>
            )}
          </button>
          <div className="relative">
            <button
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
              onClick={() => navigate("/add-new-sales-agreement")}
            >
              <span className="text-lg leading-none mb-1">+</span>
              Nytt avtal 
            </button>
            {showDropdown && (
              <div className="absolute sm:right-0 mt-2 w-56 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-sales-agreement")}
                >
                  <span>📄</span> Försäljningsavtal
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-purchase-agreement")}
                >
                  <span>📄</span> Köpeavtal
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-agency-agreement")}
                >
                  <span>📄</span> Byråavtal
                </button>
                {/* <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left gap-2 cursor-pointer"
                  onClick={() => navigate("/add-new-invoice")}
                >
                  <span>📄</span> Kvitto
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {isFiltersApplied && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 mb-6 flex items-center justify-between text-sm">
          <span>
            Visar <strong>{filteredCount}</strong> filtrerade avtal
          </span>
          <button
            onClick={handleClearFilters}
            className="font-semibold hover:underline cursor-pointer"
          >
            Rensa filter
          </button>
        </div>
      )}

      <AgreementsTable
        search={search}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        filters={agreementFilters}
        setFilteredCount={setFilteredCount}
      />

      <FilterAgreements
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={setAgreementFilters}
        currentFilters={agreementFilters}
      />
    </div>
  );
};

export default AllAgreements;
