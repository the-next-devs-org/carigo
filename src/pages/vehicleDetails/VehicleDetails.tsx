import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { makeGetRequest, makeDeleteRequest } from "../../api/Api";
import type { Vehicle } from "../../components/Vehicles/vehicleDetails/types";
import BasicInformation from "../../components/Vehicles/vehicleDetails/BasicInformation";
import RegistrationDates from "../../components/Vehicles/vehicleDetails/RegistrationDates";
import TechnicalSpecifications from "../../components/Vehicles/vehicleDetails/TechnicalSpecifications";
import OwnershipInformation from "../../components/Vehicles/vehicleDetails/OwnershipInformation";
import InspectionDetails from "../../components/Vehicles/vehicleDetails/InspectionDetails";
import ImportOrigin from "../../components/Vehicles/vehicleDetails/ImportOrigin";
import DeletePopup from "../../components/models/DeletePopup";
import toast from "react-hot-toast";
import AddNewVehicle from "../../components/models/AddNewVehicle";

const VehicleDetails2 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const BACKEND_URL = "http://127.0.0.1:8000";

  const fetchVehicleDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await makeGetRequest(`vehicles/${id}`);
      if (response.data && response.data.success) {
        setVehicle(response.data.data);
      } else {
        setError(response.data?.message || "Failed to fetch vehicle details.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching vehicle details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!vehicle) return;
    setIsDeleting(true);
    try {
      await makeDeleteRequest(`vehicles/deleteVehicle/${vehicle.id}`);
      toast.success("Vehicle deleted successfully!");
      setShowDeletePopup(false);
      navigate("/vehicles");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete vehicle.");
      console.error("Delete error:", err);
      setShowDeletePopup(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSuccess = (shouldRedirect?: boolean) => {
    setIsEditModalOpen(false);
    if (shouldRedirect) {
      navigate("/vehicles");
    } else {
      fetchVehicleDetails();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="p-6 text-center">Loading vehicle details...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!vehicle) {
    return <div className="p-6 text-center">Vehicle not found.</div>;
  }

  return (
    <div className="lg:p-6 p-4 max-w-full mx-auto font-plus-jakarta">
      <AddNewVehicle
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        vehicleToEdit={vehicle}
      />
      {showDeletePopup && (
        <DeletePopup
          entityName="Vehicle"
          onCancel={() => setShowDeletePopup(false)}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      <div className="flex xl:items-center items-start xl:flex-row flex-col justify-between xl:gap-0 gap-5 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Vehicle Details
          </button>
          <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded px-2 py-1 text-xs font-bold">
            {vehicle?.id || "N/A"}
          </span>
        </div>
      </div>

      <div className="w-full gap-6">
        <div className="space-y-6 grid grid-cols-2 gap-6">
          <BasicInformation vehicle={vehicle} />
          <RegistrationDates vehicle={vehicle} />
          <TechnicalSpecifications vehicle={vehicle} />
          <OwnershipInformation vehicle={vehicle} />
          <InspectionDetails vehicle={vehicle} />
          <ImportOrigin vehicle={vehicle} />
          <div className="mb-6">
            {(vehicle as any).image ? (
              <img
                src={`${BACKEND_URL}/storage/${(vehicle as any).image}`}
                className="w-full max-w-sm h-auto object-cover rounded-lg shadow"
              />
            ) : (
              <div className="w-full max-w-sm h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                No Image
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default VehicleDetails2;
