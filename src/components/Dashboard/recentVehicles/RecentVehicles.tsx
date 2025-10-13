import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetRequest } from "../../../api/Api";

interface Vehicle {
  id: number;
  vehicleName: string;
  model: string;
  year: number;
  status: "In Stock" | "Sold" | "Agency";
  price: number;
  updatedAt: string;
}

const RecentVehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("vehicles/getAllVehicles");
        if (response.data && response.data.success) {
          const sortedByUpdated = response.data.data.sort(
            (a: Vehicle, b: Vehicle) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setVehicles(sortedByUpdated.slice(0, 5));
        } else {
          setError(response.data?.message || "Failed to fetch vehicles.");
        }
      } catch (err) {
        setError("An error occurred while fetching vehicles.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentVehicles();
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 dashboard-cards">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#000814] font-plus-jakarta">
          Recent Vehicles
        </h2>
        <button
          onClick={() => navigate("/vehicles")}
          className="text-[#FF8B1F] text-sm font-semibold font-plus-jakarta hover:text-[#e67b15] border-b border-[#FF8B1F] cursor-pointer"
        >
          See More
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F0F7FF] rounded-lg text-left">
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-l-lg">
                Vehicle
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Year
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Status
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-r-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-[#000814] font-plus-jakarta">
                      {vehicle.vehicleName}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {vehicle.year}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-plus-jakarta
                        ${
                          vehicle.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : vehicle.status === "Sold"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {typeof vehicle.price === "number" &&
                      vehicle.price !== null
                        ? vehicle.price.toLocaleString()
                        : "N/A"}{" "}
                      Kr
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentVehicles;
