import React, { useState, useEffect } from "react";
import { makePostRequest, makePutRequest } from "../../api/Api";
import { AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import axios from "axios";

interface AddNewVehicleProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (shouldRedirect?: boolean) => void;
  vehicleToEdit?: any;
}

const initialVehicleState = {
  name: "",
  brand: "",
  model: "",
  category: "",
  year: "",
  color: "",
  registration_number: "",
  transmission: "",
  fuel_type: "",
  mileage: 0,
  number_of_doors: 0,
  number_of_seats: 0,
  price_per_day: 0,
  price_per_week: 0,
  free_mileage: 0,
  extra_km_cost: 0,
  deposit: 0,
  insurance_included: false,
  deductible: 0,
  available: true,
  description: "",
  short_description: "",
  full_description: "",
  feature_tags: [] as string[],
  visible_on_website: true,
  status: "",
  origin_market: "",
  date: new Date().toISOString(),
  user_id: "",
  image: null as File | null,
  gallery: [] as File[],
};

const AddNewVehicle: React.FC<AddNewVehicleProps> = ({
  open,
  onClose,
  onSuccess,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<any>(initialVehicleState);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!vehicleToEdit;

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setFormData(prev => ({ ...prev, user_id: id || "" }));
  }, []);

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      setFormData({
        ...initialVehicleState,
        ...vehicleToEdit,
      });
    }
  }, [vehicleToEdit, isEditMode]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files, checked } = e.target as any;

    if (type === "file") {
      if (name === "image") {
        setFormData((prev: any) => ({ ...prev, image: files[0] }));
      } else if (name === "gallery") {
        setFormData((prev: any) => ({ ...prev, gallery: Array.from(files) }));
      }
    } else if (type === "checkbox") {
      setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formPayload = new FormData();

      for (const key in formData) {
        if (key === "gallery") {
          formData.gallery.forEach((file: File) => formPayload.append("gallery", file));
        } else if (key === "feature_tags") {
          formPayload.append(key, JSON.stringify(formData[key]));
        } else if (key === "image") {
          if (formData.image) formPayload.append("image", formData.image);
        } else {
          formPayload.append(key, formData[key]);
        }
      }

      let response;
      if (isEditMode) {
        response = await makePutRequest(
          `updateVehicle/${vehicleToEdit.registration_number}`,
          formPayload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await makePostRequest(
          "addNewVehicle",
          formPayload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data.success) {
        toast.success(`Vehicle ${isEditMode ? "updated" : "created"} successfully!`);

        setFormData(initialVehicleState);

        onClose();

        onSuccess();
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };


  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    type = "text"
  ) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name as string}
        value={formData[name] || ""}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );

  const renderFileField = (label: string, name: keyof typeof formData, multiple = false) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="file"
        name={name as string}
        onChange={handleChange}
        multiple={multiple}
        className="w-full text-sm"
      />
    </div>
  );

  const fetchVehicleByRegistration = async (registrationNumber: string, setFormData: any, setIsLoading: any) => {
    if (!registrationNumber) {
      toast.error("Please enter a registration number!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.put(
        "https://dealer.clubpadel.se/api/agreements/external/agreements",
        {
          query: registrationNumber,
          type: "VEHICLE",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success && response.data.data?.length > 0) {
        const vehicle = response.data.data[0];
        const detail = vehicle.detail || {};
        const inspection = vehicle.inspection || {};
        const registrationData = vehicle.registrationData || {};
        const origin = vehicle.origin || {};
        const technicalData = vehicle.technicalData || {};
        const status = vehicle.status || {};

        setFormData((prev: any) => ({
          ...prev,
          name: detail.vehicleModel || "",           
          brand: detail.vehicleBrand || "",
          model: detail.vehicleModel || "",
          category: detail.vehicleCategory || "",
          year: detail.vehicleYear || "",
          color: detail.color || "",
          registration_number: registrationData.registrationNumber || vehicle.legalId || "",
          transmission: technicalData.gearbox || detail.transmission || "",
          fuel_type: detail.fuelCodes?.[0] || "",
          mileage: inspection.mileage || 0,
          number_of_doors: detail.numberOfDoors || 0,
          number_of_seats: technicalData.nrOfPassengers || 0,
          price_per_day: 0,
          price_per_week: 0,
          free_mileage: 0,
          extra_km_cost: 0,
          deposit: 0,
          deductible: 0,
          description: "",
          short_description: "",
          full_description: "",
          origin_market: origin.importerId || "",
          insurance_included: false,
          available: true,
          visible_on_website: true,
          feature_tags: [],
        }));

        toast.success("Vehicle data loaded!");
      } else {
        toast.error(response.data.message || "Vehicle not found");
      }
    } catch (err: any) {
      console.error("API error:", err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-[460px] h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Vehicle" : "Add New Vehicle"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
          <div className="mb-3 flex items-center gap-2">
            {/* {renderInputField("Registration Number", "registration_number")} */}
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="button"
              className="bgbluebutton text-gray-800 px-3 py-2 rounded-lg text-sm"
                onClick={() => fetchVehicleByRegistration(formData.registration_number, setFormData, setIsLoading)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#efefef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
          {renderInputField("Name", "name")}
          {renderInputField("Brand", "brand")}
          {renderInputField("Model", "model")}
          {renderInputField("Category", "category")}
          {renderInputField("Year", "year", "number")}
          {renderInputField("Color", "color")}
          {renderInputField("Transmission", "transmission")}
          {renderInputField("Fuel Type", "fuel_type")}
          {renderInputField("Mileage", "mileage", "number")}
          {renderInputField("Number of Doors", "number_of_doors", "number")}
          {renderInputField("Number of Seats", "number_of_seats", "number")}
          {renderInputField("Price per Day", "price_per_day", "number")}
          {renderInputField("Price per Week", "price_per_week", "number")}
          {renderInputField("Free Mileage", "free_mileage", "number")}
          {renderInputField("Extra KM Cost", "extra_km_cost", "number")}
          {renderInputField("Deposit", "deposit", "number")}
          {renderInputField("Deductible", "deductible", "number")}
          <div className="mb-3 flex items-center gap-4">
            <label>
              <input
                type="checkbox"
                name="insurance_included"
                checked={formData.insurance_included}
                onChange={handleChange}
              />
              Insurance Included
            </label>
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>
            <label>
              <input
                type="checkbox"
                name="visible_on_website"
                checked={formData.visible_on_website}
                onChange={handleChange}
              />
              Visible on Website
            </label>
          </div>
          {renderInputField("Description", "description")}
          {renderInputField("Short Description", "short_description")}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Tags</label>
            <div className="flex gap-3">
              {["GPS", "Sunroof", "Towbar", "Rear Camera"].map((tag) => (
                <label key={tag} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="feature_tags"
                    checked={formData.feature_tags.includes(tag)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev: any) => {
                        const newTags = checked
                          ? [...prev.feature_tags, tag]
                          : prev.feature_tags.filter((t: string) => t !== tag);
                        return { ...prev, feature_tags: newTags };
                      });
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          {renderInputField("Full Description", "full_description")}
          {/* {renderInputField("Status", "status")} */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="" disabled selected>Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {renderInputField("Origin Market", "origin_market")}
          {renderInputField("Date", "date", "date")}
          {/* {renderInputField("User ID", "user_id")} */}
          {renderFileField("Main Image", "image")}
          {renderFileField("Gallery Images", "gallery", true)}
          <input type="hidden" name="user_id" value={formData.user_id} />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin inline-block" /> : isEditMode ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewVehicle;
