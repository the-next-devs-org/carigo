import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makeDeleteRequest, makeGetRequest } from "../../../api/Api";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
} from "../../utils/Icons";
import toast from "react-hot-toast";
import DeletePopup from "../../models/DeletePopup";

interface Vehicle {
  id: number;
  registrationNumber: string;
  brand: string;
  vehicleName: string;
  model: string;
  type: string;
  status: string;
  year: number;
}

interface VehiclesTableProps {
  search: string;
  expandedId: number | null;
  filteredVehicles?: any[] | null;
}

const statusColors: { [key: string]: string } = {
  "In Stock": "bg-green-100 text-green-700",
  Agency: "bg-red-100 text-red-700",
  Sold: "bg-blue-100 text-blue-700",
};

const VehiclesTable: React.FC<VehiclesTableProps> = ({
  search,
  expandedId,
  filteredVehicles,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePopupRegistrationNumber, setDeletePopupRegistrationNumber] =
    useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("vehicles/getAllVehicles");
        if (response.data && response.data.success) {
          setVehicles(response.data.data.reverse());
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

    if (filteredVehicles === null) {
      fetchVehicles();
    } else {
      setIsLoading(false);
    }
  }, [filteredVehicles]);

  const handleDelete = async () => {
    if (!deletePopupRegistrationNumber) return;

    setIsDeleting(true);
    try {
      await makeDeleteRequest(
        `vehicles/deleteVehicle/${deletePopupRegistrationNumber}`
      );
      toast.success("Vehicle deleted successfully!");
      setVehicles(
        vehicles.filter(
          (v) => v.registrationNumber !== deletePopupRegistrationNumber
        )
      );
      setDeletePopupRegistrationNumber(null);
      setShowDeletePopup(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete vehicle.");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setShowDeletePopup(false);
    }
  };

  const allVehicles = filteredVehicles !== null ? filteredVehicles : vehicles;

  const filtered = (allVehicles || []).reverse().filter((v) => {
    const searchTerm = search.toLowerCase();

    return (
      (v.registrationNumber?.toLowerCase() || "").includes(searchTerm) ||
      (v.vehicleName?.toLowerCase() || "").includes(searchTerm) ||
      (v.model?.toLowerCase() || "").includes(searchTerm) ||
      (v.type?.toLowerCase() || "").includes(searchTerm) ||
      (v.status?.toLowerCase() || "").includes(searchTerm) ||
      (v.year?.toString() || "").includes(search)
    );
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filtered.length]);

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  return (
    <>
      {showDeletePopup && (
        <DeletePopup
          entityName="Vehicle"
          onCancel={() => {
            setDeletePopupRegistrationNumber(null);
            setShowDeletePopup(false);
          }}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[400px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Registreringsnummer
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Fordonsnamn
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Modell
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Typ
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                År
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Åtgärder
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
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Inga fordon hittades
                </td>
              </tr>
            ) : (
              paginated.map((vehicle) => (
                <React.Fragment key={vehicle.id}>
                  <tr
                    className={`hover:bg-gray-50 ${
                      expandedId === vehicle.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 border border-[rgb(232,234,238)] rounded pr-1">
                        <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-tl rounded-bl px-2 py-2 text-xs font-bold">
                          S
                        </span>
                        <span className="font-medium text-gray-900">
                          {vehicle.registrationNumber || "Saknas"}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {vehicle.vehicleName || "Saknas"}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {vehicle.model || "Saknas"}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {vehicle.type || "Saknas"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[vehicle.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {vehicle.status || "Saknas"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {vehicle.year || "Saknas"}
                    </td>
                    <td className="py-4 px-4 flex items-center gap-1">
                      <button
                        className="border border-blue-600 text-blue-600 px-4 py-1 cursor-pointer rounded font-medium flex items-center gap-2 hover:bg-blue-50"
                        onClick={() =>
                          navigate(
                            `/vehicle-details/${vehicle.registrationNumber}`
                          )
                        }
                      >
                        Detaljer <ArrowRightIcon className="w-[13px] h-[10px]" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                        onClick={() => {
                          setDeletePopupRegistrationNumber(
                            vehicle.registrationNumber
                          );
                          setShowDeletePopup(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {expandedId === vehicle.id && (
                    <tr>
                      <td
                        colSpan={7}
                        className="bg-gray-50 border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Fordonsinformation
                              </h3>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Registreringsnummer
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.registrationNumber || "Saknas"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Fordonsnamn
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.vehicleName || "Saknas"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Modell
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.model || "Saknas"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Typ
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.type || "Saknas"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    År
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.year || "Saknas"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Status
                                  </div>
                                  <span
                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                      statusColors[vehicle.status] ||
                                      "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {vehicle.status || "Saknas"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                <Edit className="w-4 h-4" />
                                Redigera fordon
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && !error && filtered.length > 0 && (
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start mt-6 md:gap-0 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Visa</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>poster av {filtered.length} poster</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              <ArrowLeftIcon className="w-[6px] h-[10px]" />
            </button>
            {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
              let pageNum = i + 1;
              if (page > 3 && totalPages > 5) {
                pageNum = page - 2 + i;
              }
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 text-sm border rounded-md cursor-pointer ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && page < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            {totalPages > 1 && page < totalPages - 1 && totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              <ArrowLeftDoubleIcon className="w-[6px] h-[10px] rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VehiclesTable;
