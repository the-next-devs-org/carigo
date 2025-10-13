import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, Info, Plus } from "lucide-react";
import { makeGetRequest } from "../../../api/Api";

interface Vehicle {
  id: number;
  registrationNumber: string;
  model: string;
  vehicleName: string;
  year: number;
  category: string;
  status: string;
  importOrigin: string;
  registrationDate: string;
  price: number;
  mileage: number;
  daysInStock: number;
  fuelType: string;
  gearbox: string;
  drive: string;
  color: string;
  horsepower: string;
  notes: string[];
  equipment: Record<string, boolean>;
  documents: Array<{
    url: string;
    type: string;
  }>;
  type: string;
  chassisNumber: string;
  engineVolume: string;
  maxSpeed: string;
  serviceWeight: number;
  totalWeight: number;
  passengers: number;
  variant: string;
  version: string;
  ecoCertificate: string;
}

const AddAdvertise = () => {
  const { registrationNumber } = useParams<{ registrationNumber: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    mileage: "",
    price: "",
    equipment: "",
    information: "",
    pictures: [] as File[],
    saveInformation: false,
  });

  const navigate = useNavigate();

  const fetchVehicleDetails = async () => {
    if (!registrationNumber) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await makeGetRequest(`vehicles/${registrationNumber}`);

      console.log("response", response);

      if (response.data && response.data.success) {
        const vehicleData = response.data.data;

        console.log("vehicleData", vehicleData);

        // Ensure required fields exist before setting state
        if (!vehicleData.mileage) {
          throw new Error("Vehicle data is missing required fields");
        }

        setVehicle(vehicleData);

        // Initialize form with vehicle data safely
        setFormData({
          mileage: vehicleData.mileage?.toString() || "",
          price: vehicleData.price?.toString() || "",
          equipment: vehicleData.equipment
            ? Object.entries(vehicleData.equipment)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(", ")
            : "",
          information: "",
          pictures: [],
          saveInformation: false,
        });
      } else {
        setError(response.data?.message || "No vehicle data found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        "An error occurred while fetching vehicle details. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [registrationNumber]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...files],
      }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("SEK", "kr");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

  return (
    <div className="lg:p-6 p-4 max-w-full mx-auto font-plus-jakarta bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white rounded-lg dashboard-cards border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Create Purchase Agreement
          </h2>

          <div className="space-y-6">
            {/* Vehicle Details Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Vehicle details
              </h3>

              {/* Mileage */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage (km)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.mileage}
                    onChange={(e) =>
                      handleInputChange("mileage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mileage"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              {/* Equipment */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment
                </label>
                <textarea
                  value={formData.equipment}
                  onChange={(e) =>
                    handleInputChange("equipment", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="List of equipment for the vehicle"
                />
              </div>

              {/* Information */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Information
                </label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={formData.information}
                    onChange={(e) =>
                      handleInputChange("information", e.target.value)
                    }
                    rows={3}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Add additional vehicle information"
                  />
                </div>
              </div>

              {/* Pictures */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pictures
                </label>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer block">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Add photos</p>
                  {formData.pictures.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.pictures.length} photos selected
                    </p>
                  )}
                </label>
              </div>

              {/* Save Information Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.saveInformation}
                    onChange={(e) =>
                      handleInputChange("saveInformation", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Save information
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8">
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2">
              Submit
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white rounded-lg dashboard-cards border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Preview</h3>

          {/* Vehicle Preview Card */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {vehicle.vehicleName}
            </h4>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Rain number</span>
                  <span className="text-gray-800">
                    {vehicle.registrationNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Model</span>
                  <span className="text-gray-800">{vehicle.model}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Price</span>
                  <span className="text-gray-800">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Come</span>
                  <span className="text-gray-800">N/A</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Model year</span>
                  <span className="text-gray-800">{vehicle.year}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Gearbox</span>
                  <span className="text-gray-800">{vehicle.gearbox}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Body type</span>
                  <span className="text-gray-800">{vehicle.type}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Note</span>
                  <span className="text-gray-800">{vehicle.category}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Miltal</span>
                  <span className="text-gray-800">
                    {vehicle.mileage.toLocaleString()} km
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Trim</span>
                  <span className="text-gray-800">N/A</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">First in Traffic</span>
                  <span className="text-gray-800">
                    {formatDate(vehicle.registrationDate)}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Paint</span>
                  <span className="text-gray-800">{vehicle.color}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Fuel</span>
                  <span className="text-gray-800">{vehicle.fuelType}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-500">Effecr</span>
                  <span className="text-gray-800">N/A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pictures Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Pictures
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {formData.pictures.length > 0 ? (
                formData.pictures.map((file, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded border overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center">
                    <span className="text-xs text-gray-500">Front view</span>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center">
                    <span className="text-xs text-gray-500">Rear view</span>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center">
                    <span className="text-xs text-gray-500">Interior</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdvertise;
