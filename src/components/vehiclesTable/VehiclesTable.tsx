import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { makeGetRequest } from "../../api/Api";
import { ArrowRightIcon } from "../utils/Icons";
import { useNavigate } from "react-router-dom";
import SearchNewVehicle from "../models/SearchVehicleModal";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  category: string;
  year: number;
  color: string;
  registration_number: string;
  price_per_day: number | string;
  available: boolean;
  description: string;
  image: string;
  status?: string;
  origin_market?: string;
  date?: string;
  created_at: string;
  updated_at: string;
}

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const fetchVehicles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await makeGetRequest("getAllVehicles");
      if (response.data && response.data.success) {
        setVehicles(response.data.data.reverse());
      } else {
        setError(response.data?.message || "Failed to fetch vehicles.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching vehicles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [showAddModal]); // Refresh list after adding new vehicle

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = search.toLowerCase();
    return (
      vehicle.registration_number.toLowerCase().includes(searchLower) ||
      vehicle.name.toLowerCase().includes(searchLower) ||
      vehicle.category.toLowerCase().includes(searchLower)
    );
  });

  const statusColors: { [key: string]: string } = {
    Available: "bg-green-100 text-green-700",
    Sold: "bg-red-100 text-red-700",
  };

  const handleSearchNewVehicle = () => {
    setShowAddModal(true);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="font-plus-jakarta bg-white p-6 rounded-lg shadow-md">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Våra bilar</h2>
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
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={handleSearchNewVehicle}
          >
            <span className="text-lg leading-none mb-1">+</span>
            Lägg till bil
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 md:max-h-[600px] max-h-[500px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Reg Number
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Vehicle Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Model
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Origin Market
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{vehicle.registration_number}</td>
                  <td className="py-4 px-4">{vehicle.name}</td>
                  <td className="py-4 px-4">{vehicle.category}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${vehicle.available
                          ? statusColors["Available"]
                          : statusColors["Sold"]
                        }`}
                    >
                      {vehicle.available ? "Available" : "Sold"}
                    </span>

                  </td>
                  <td className="py-4 px-4">{vehicle.origin_market}</td>
                  <td className="py-4 px-4">{vehicle.date} {vehicle.available}</td>
                  <td className="py-4 px-4">
                    <button
                      className="border border-blue-600 text-blue-600 px-4 py-1 cursor-pointer rounded font-medium flex items-center gap-2 hover:bg-blue-50"
                      onClick={() =>
                        navigate(`/vehicle-details/${vehicle.id}`)
                      }
                    >
                      Details <ArrowRightIcon className="w-[13px] h-[10px]" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <SearchNewVehicle
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchVehicles();
          }}
        />
      )}

    </div>

  );
};

export default VehiclesTable;
