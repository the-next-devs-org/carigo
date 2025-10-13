import React, { useState, useEffect } from "react";
import { makePostRequest, makePutRequest } from "../../api/Api";
import { AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Vehicle } from "../Vehicles/vehicleDetails/types";

interface AddNewVehicleProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (shouldRedirect?: boolean) => void;
  vehicleToEdit?: Vehicle | null;
}

// Form data type matching DB table columns
interface VehicleFormData {
  name: string;
  brand: string;
  category: string;
  year: number;
  color: string;
  registration_number: string;
  price_per_day: number;
  available: number;
  description: string;
  image: string | File;
  status?: string;
  origin_market?: string;
  date?: string;
}

const initialFormData: VehicleFormData = {
  name: "",
  brand: "",
  category: "",
  year: new Date().getFullYear(),
  color: "",
  registration_number: "",
  price_per_day: 0,
  available: 1,
  description: "",
  image: "",
};

const SearchNewVehicle: React.FC<AddNewVehicleProps> = ({
  open,
  onClose,
  onSuccess,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<VehicleFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!vehicleToEdit;
  const [userId, setUserId] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      // Cast vehicleToEdit as any to avoid TS errors for missing fields
      const v = vehicleToEdit as any;
      setFormData({
        name: v.name || "",
        brand: v.brand || "",
        category: v.category || "",
        year: v.year || new Date().getFullYear(),
        color: v.color || "",
        registration_number: v.registration_number || v.registrationNumber || "",
        price_per_day: v.price_per_day || 0,
        available: v.available !== undefined ? v.available : 1,
        description: v.description || "",
        image: v.image || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [vehicleToEdit, isEditMode, open]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => {
      if (name === "available") {
        // Explicit number for checkbox
        return { ...prev, available: checked ? 1 : 0 };
      }

      if (type === "number") {
        return { ...prev, [name]: Number(value) } as VehicleFormData;
      }

      return { ...prev, [name]: value } as VehicleFormData;
    });
  };




  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          data.append(key, value); // ← backend expects string, not File
        } else {
          data.append(key, String(value)); // number ya boolean ko string me convert karo
        }
      });


      let response;
      if (isEditMode && vehicleToEdit) {
        response = await makePutRequest(`vehicles/${vehicleToEdit.id}`, data, true);
        if (response.data.success) {
          toast.success("Vehicle updated!");
          onClose();
          onSuccess(true);
        } else {
          toast.error(response.data.message || "Error updating vehicle");
        }
      } else {
        response = await makePostRequest("addNewVehicle", data, true);
        if (response.data.success) {
          toast.success("Vehicle created!");
          onClose();
          onSuccess(true);
        } else {
          toast.error(response.data.message || "Error creating vehicle");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-[460px] h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">
          {isEditMode ? "Edit Vehicle" : "Add Vehicle"}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Failed to {isEditMode ? "update" : "add"} vehicle
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/** Render all DB columns as inputs */}
          <input type="hidden" name="user_id" value={userId} />
          <input type="hidden" name="date" value={currentDate} />
          <input
            type="text"
            name="name"
            placeholder="Vehicle Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="origin_market"
            placeholder="Origin Market"
            value={formData.origin_market || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="registration_number"
            placeholder="Registration Number"
            value={formData.registration_number}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            name="price_per_day"
            placeholder="Price per Day"
            value={formData.price_per_day}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available === 1}
              onChange={handleChange}
              className="rounded border-gray-300"
            />
            Available
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData((prev) => ({ ...prev, image: file }));
              }
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

        </div>

        <div className="flex gap-3 pt-6 sticky bottom-0 bg-white">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold cursor-pointer py-2.5 rounded-lg flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : isEditMode ? (
              "Update Vehicle"
            ) : (
              "Add Vehicle"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchNewVehicle;
