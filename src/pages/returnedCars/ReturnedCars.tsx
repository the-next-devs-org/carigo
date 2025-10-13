import { useState } from "react";
import { Search, Filter } from "lucide-react";
import AddNewVehicle from "../../components/models/AddNewVehicle";
import FilterVehicle from "../../components/models/FilterVehicle";
import VehiclesTable from "../../components/vehiclesTable/VehiclesTable";

const ReturnedCars = () => {
  const [expandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);
  const [filteredVehicles, setFilteredVehicles] = useState<any[] | null>(null);

  console.log("expandedId", expandedId);

  const handleSuccess = () => {
    setShowAddModal(false);
    setRefetchKey((prevKey) => prevKey + 1);
    setFilteredVehicles(null);
  };

  const handleFiltersApplied = (vehicles: any[]) => {
    setFilteredVehicles(vehicles);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setFilteredVehicles(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 font-sans dashboard-cards font-plus-jakarta">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">All Vehicles</h2>
        <div className="flex sm:flex-row flex-col gap-3 sm:items-center lg:mt-0 mt-4">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {/* Professional Filter Button */}
          <button
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
              filteredVehicles !== null
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            }`}
            onClick={() => setShowFilterModal(true)}
            title="Filter vehicles"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {filteredVehicles !== null && (
              <div className="flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                {filteredVehicles.length}
              </div>
            )}
                   
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={() => setShowAddModal(true)}
          >
            <span className="text-lg leading-none mb-1">+</span>
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Show filter status and clear button */}
      {filteredVehicles !== null && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
          <span className="text-sm text-blue-700">
            Showing {filteredVehicles.length} filtered vehicles
          </span>
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      <VehiclesTable
        key={refetchKey}
        search={search}
        expandedId={expandedId}
        filteredVehicles={filteredVehicles}
      />

      <AddNewVehicle
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />

      <FilterVehicle
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFiltersApplied={handleFiltersApplied}
      />
    </div>
  );
};

export default ReturnedCars;
