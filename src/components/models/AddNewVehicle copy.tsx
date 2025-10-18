import React, { useState, useEffect } from "react";
import { makePostRequest, makePutRequest } from "../../api/Api";
import { AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Vehicle } from "../Vehicles/vehicleDetails/types";
import { BACKEND_API_ENDPOINT } from "../../api/config";

interface AddNewVehicleProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (shouldRedirect?: boolean) => void;
  vehicleToEdit?: Vehicle | null;
}

interface VehicleSearchResponse {
  success: boolean;
  type: string;
  keyword: string;
  count: number;
  data: {
    _type: string;
    id: string;
    country: string;
    legalId: string;
    registrationData: {
      registrationNumber: string;
      registeredOn: string;
    };
    detail: {
      vehicleType: string;
      vehicleCategory: string;
      vehicleBrand: string;
      vehicleModel: string;
      color: string;
      chassisNumber: string;
      registrationDate: string;
      registrationNumberReused: boolean;
      vehicleImpactClass: string;
      vehicleBrandRaw: string;
      vehicleModelRaw: string;
      vehicleYear: string;
    };
    ownerInfo: {
      identityNumber: string;
      acquisitionDate: string;
      organization: boolean;
      numberOfUsers: number;
      previousUserIdentityNumber: string;
      previousUserAcquisitionDate: string;
      beforePreviousUserIdentityNumber: string;
      beforePreviousUserAcquisitionDate: string;
      owner: string;
      ownerAcquisitionDate: string;
      userReference: {
        _type: string;
        id: string;
        country: string;
        addresses: any[];
      };
      ownerReference: {
        _type: string;
        id: string;
        country: string;
        addresses: any[];
      };
    };
    status: {
      registrationType: string;
      date: string;
      leased: boolean;
      methodsOfUse: string[];
      creditPurchase: boolean;
      code: string;
      insuranceType: string;
    };
    origin: {
      importerId: string;
      preRegistrationDate: string;
      directImport: boolean;
    };
    technicalData: {
      variant: string;
      version: string;
      type: string;
      bodyCode1: string;
      nrOfPassengers: number;
      eeg: string;
      cylinderVolume: number;
      gearbox: string;
      couplingDevices: string[];
      serviceWeight: number;
      vehicleTypeWeight: number;
      totalWeight: number;
      allWheelDrive: boolean;
      maxSpeed: string;
      fuelCodes: string[];
    };
    equipment: any[];
    environmental: {
      environmentalClassEuro: string;
      emissionClass: string;
      superGreenCar: boolean;
    };
    inspection: {
      inspectionDate: string;
      inspectionDateUpToAndIncluding: string;
      mileage: number;
      inspectionStation: string;
    };
    vehicleId: string;
  }[];
}

const initialVehicleState = {
  registrationNumber: "",
  model: "",
  vehicleName: "",
  year: "",
  importOrigin: "",
  price: "",
  mileage: "",
  daysInStock: 0,
  color: "",
  horsepower: "",
  chassisNumber: "",
  registrationDate: new Date().toISOString().split("T")[0],
  preRegistrationDate: "",
  registrationRenewed: "",
  statusDate: "",
  engineVolume: "",
  maxSpeed: "",
  serviceWeight: 0,
  totalWeight: 0,
  vehicleWeight: 0,
  passengers: 0,
  version: "",
  typeCode: "",
  ecoCertificate: "",
  currentOwner: "",
  acquisitionDate: "",
  organizationOwner: "",
  lastInspection: "",
  nextInspectionDue: "",
  inspectionMileage: 0,
  inspectionStation: "",
  importID: "",
  category: "",
  status: "",
  fuelType: "",
  gearbox: "",
  drive: "",
  GPS: true,
  Sunroof: true,
  type: "",
  variant: "",
  totalOwners: 0,
  directImport: true,
};

const AddNewVehicle: React.FC<AddNewVehicleProps> = ({
  open,
  onClose,
  onSuccess,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<any>(initialVehicleState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!vehicleToEdit;

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      const vehicleData = {
        ...initialVehicleState,
        ...vehicleToEdit,
        registrationDate: vehicleToEdit.registrationDate
          ? new Date(vehicleToEdit.registrationDate).toISOString().split("T")[0]
          : "",
        preRegistrationDate: vehicleToEdit.preRegistrationDate
          ? new Date(vehicleToEdit.preRegistrationDate)
              .toISOString()
              .split("T")[0]
          : "",
        registrationRenewed: vehicleToEdit.registrationRenewed
          ? new Date(vehicleToEdit.registrationRenewed)
              .toISOString()
              .split("T")[0]
          : "",
        statusDate: vehicleToEdit.statusDate
          ? new Date(vehicleToEdit.statusDate).toISOString().split("T")[0]
          : "",
        acquisitionDate: vehicleToEdit.acquisitionDate
          ? new Date(vehicleToEdit.acquisitionDate).toISOString().split("T")[0]
          : "",
        lastInspection: vehicleToEdit.lastInspection
          ? new Date(vehicleToEdit.lastInspection).toISOString().split("T")[0]
          : "",
        nextInspectionDue: vehicleToEdit.nextInspectionDue
          ? new Date(vehicleToEdit.nextInspectionDue)
              .toISOString()
              .split("T")[0]
          : "",
        GPS: vehicleToEdit.equipment?.GPS || false,
        Sunroof: vehicleToEdit.equipment?.Sunroof || false,
        directImport: vehicleToEdit.directImport === "Yes",
        // Ensure notes are preserved in the correct format
        notes: vehicleToEdit.notes || [],
        outlay: vehicleToEdit.outlay || [],
        documents: vehicleToEdit.documents || [],
      };
      setFormData(vehicleData);
    } else {
      setFormData(initialVehicleState);
    }
  }, [vehicleToEdit, isEditMode, open]);

  if (!open) return null;

  const handleSearchVehicle = async (regNumber: string) => {
    if (!regNumber) {
      toast.error("Please enter a registration number");
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50X2lkIjoiMDAwMDA5M2UyNDY5YjNhOGJmMTQ4NGVmODA5MWEyM2MiLCJ1c2VyX25hbWUiOiIwMDA1Y2ViN2I0ZmJjNmI1YjRlMzNjMTdlNGM4NDAzZiIsImRlcGFydG1lbnRfbmFtZSI6IlZhbGl0aXZlIENyZWRpdCIsImF1dGhvcml0aWVzIjpbIlZMVFZfQ1JFRElUX1NFQVJDSF9ETyIsIlZBTElUSVZFX0FQSV9BQ0NFU1MiXSwiY2xpZW50X2lkIjoiSU5TX1BBUlRORVIiLCJhdWQiOlsiVkFMSVRJVkUiXSwidXNlcl9pZCI6IjAwMDVjZWI3YjRmYmM2YjViNGUzM2MxN2U0Yzg0MDNmIiwidXNlcl9yZWFsX25hbWUiOiJTYW1pciBLYXNzZW0iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUi",
          },
          body: JSON.stringify({
            type: "VEHICLE",
            query: regNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: VehicleSearchResponse = await response.json();

      if (data.success && data.count > 0) {
        const vehicleData = data.data[0];
        setFormData((prev: any) => ({
          ...prev,
          registrationNumber: vehicleData.registrationData.registrationNumber,
          vehicleName: `${vehicleData.detail.vehicleBrand} ${vehicleData.detail.vehicleModel}`,
          model: vehicleData.detail.vehicleModel,
          year: vehicleData.detail.vehicleYear,
          color: vehicleData.detail.color,
          chassisNumber: vehicleData.detail.chassisNumber,
          registrationDate: vehicleData.registrationData.registeredOn,
          preRegistrationDate: vehicleData.origin?.preRegistrationDate || "",
          fuelType: vehicleData.technicalData.fuelCodes[0] || "Unknown",
          gearbox: vehicleData.technicalData.gearbox,
          mileage: vehicleData.inspection?.mileage || 0,
          passengers: vehicleData.technicalData.nrOfPassengers,
          serviceWeight: vehicleData.technicalData.serviceWeight,
          totalWeight: vehicleData.technicalData.totalWeight,
          vehicleWeight: vehicleData.technicalData.vehicleTypeWeight,
          maxSpeed: vehicleData.technicalData.maxSpeed,
          engineVolume: vehicleData.technicalData.cylinderVolume.toString(),
          version: vehicleData.technicalData.version,
          type: vehicleData.technicalData.type,
          variant: vehicleData.technicalData.variant,
          inspectionStation: vehicleData.inspection?.inspectionStation || "",
          inspectionMileage: vehicleData.inspection?.mileage || 0,
          lastInspection: vehicleData.inspection?.inspectionDate || "",
          nextInspectionDue:
            vehicleData.inspection?.inspectionDateUpToAndIncluding || "",
          currentOwner: vehicleData.ownerInfo?.owner || "",
          organizationOwner: vehicleData.ownerInfo?.organization
            ? "Company"
            : "Private",
          acquisitionDate: vehicleData.ownerInfo?.acquisitionDate || "",
          totalOwners: vehicleData.ownerInfo?.numberOfUsers || 1,
          directImport: vehicleData.origin?.directImport || false,
          importOrigin: vehicleData.origin?.importerId || "",
          status: "In Stock",
          ecoCertificate: vehicleData.environmental?.emissionClass || "",
          typeCode: vehicleData.technicalData.eeg || "",
          importID: vehicleData.origin?.importerId || "",
          category: vehicleData.detail.vehicleCategory || "",
        }));
        setHasSearched(true);
        toast.success("Vehicle details loaded successfully!");
      } else {
        toast.error("No vehicle found with this registration number");
        return false;
      }
    } catch (error) {
      console.error("Error searching vehicle:", error);
      toast.error("Failed to search vehicle. Please try again.");
      setHasSearched(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditMode && !hasSearched) {
      toast.error("Please search for the vehicle first");
      return;
    }

    setIsLoading(true);
    setError(null);

    const safeToISOString = (dateString: string) => {
      return dateString ? new Date(dateString).toISOString() : null;
    };

    // Create the base payload
    const payload = {
      ...formData,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      daysInStock: Number(formData.daysInStock),
      serviceWeight: Number(formData.serviceWeight),
      totalWeight: Number(formData.totalWeight),
      vehicleWeight: Number(formData.vehicleWeight),
      passengers: Number(formData.passengers),
      totalOwners: Number(formData.totalOwners),
      inspectionMileage: Number(formData.inspectionMileage),
      registrationDate: safeToISOString(formData.registrationDate),
      preRegistrationDate: safeToISOString(formData.preRegistrationDate),
      registrationRenewed: safeToISOString(formData.registrationRenewed),
      statusDate: safeToISOString(formData.statusDate),
      acquisitionDate: safeToISOString(formData.acquisitionDate),
      lastInspection: safeToISOString(formData.lastInspection),
      nextInspectionDue: safeToISOString(formData.nextInspectionDue),
      equipment: {
        GPS: formData.GPS,
        Sunroof: formData.Sunroof,
      },
      directImport: formData.directImport ? "Yes" : "No",
    };

    // When editing, include the existing notes and outlays in the payload
    if (isEditMode && vehicleToEdit) {
      // Preserve notes in the format the API expects
      payload.notes = vehicleToEdit.notes.map((note) => note.text); // Convert Note[] to string[]
      payload.outlay = vehicleToEdit.outlay || [];
      payload.documents = vehicleToEdit.documents || [];
    }

    try {
      if (isEditMode) {
        const response = await makePutRequest(
          `vehicles/updateVehicle/${vehicleToEdit?.registrationNumber}`,
          payload
        );
        if (response.data.success) {
          toast.success("Vehicle updated successfully!");
          const needsRedirect =
            vehicleToEdit?.registrationNumber !== payload.registrationNumber;
          onSuccess(needsRedirect);
        } else {
          toast.error(response.data.message || "An unknown error occurred.");
          setError(response.data.message || "An unknown error occurred.");
        }
      } else {
        const response = await makePostRequest(
          "vehicles/createVehicle",
          payload
        );
        if (response.data.success) {
          toast.success("Vehicle created successfully!");
          onSuccess();
        } else {
          toast.error(response.data.message || "An unknown error occurred.");
          setError(response.data.message || "An unknown error occurred.");
        }
      }
    } catch (err: any) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} vehicle:`,
        err
      );
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (
      name === "GPS" ||
      name === "Sunroof" ||
      name === "directImport"
    ) {
      finalValue = value === "Yes";
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    type = "text",
    placeholder = "",
    withSearch = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-3">
        <input
          type={type}
          name={name as string}
          value={formData[name] as string | number}
          onChange={handleChange}
          placeholder={placeholder || `Ange ${label.toLowerCase()}...`}
          className="w-full border rounded-lg px-3 py-2 text-sm pr-10"
          disabled={isLoading || (withSearch && isEditMode)}
        />
        {withSearch && !isEditMode && (
          <button
            type="button"
            onClick={() => handleSearchVehicle(formData.registrationNumber)}
            className="w-fit bg-blue-700 hover:bg-blue-800 text-white font-semibold cursor-pointer py-2.5 rounded-lg flex justify-center items-center px-3"
            disabled={isSearching || isLoading}
          >
            {isSearching ? `Söker` : "Sök"}
          </button>
        )}
      </div>
    </div>
  );

  const renderAllFields = () => (
    <>
      <div className="grid grid-cols-1 gap-4">
        {renderInputField(
          "Registreringsnummer",
          "registrationNumber",
          "text",
          "",
          true
        )}
        {renderInputField("Fordonsnamn", "vehicleName")}
        {renderInputField("Modell", "model")}
        {renderInputField("År", "year", "number")}
        {renderInputField("Färg", "color")}
        {renderInputField("Chassinummer", "chassisNumber")}
        {renderInputField("Registreringsdatum", "registrationDate", "date")}
        {renderInputField(
          "Förregistreringsdatum",
          "preRegistrationDate",
          "date"
        )}
        {renderInputField("Statusdatum", "statusDate", "date")}
        {renderInputField("Förvärvsdatum", "acquisitionDate", "date")}
        {renderInputField("Senaste besiktning", "lastInspection", "date")}
        {renderInputField("Nästa besiktning", "nextInspectionDue", "date")}
        {renderInputField("Mätarställning", "mileage", "number")}
        {renderInputField("Pris", "price", "number")}
        {renderInputField("Hästkrafter", "horsepower")}
        {renderInputField("Motorvolym", "engineVolume")}
        {renderInputField("Maxhastighet", "maxSpeed")}
        {renderInputField("Tjänstevikt", "serviceWeight", "number")}
        {renderInputField("Totalvikt", "totalWeight", "number")}
        {renderInputField("Fordonsvikt", "vehicleWeight", "number")}
        {renderInputField("Passagerare", "passengers", "number")}
        {renderInputField("Totalt antal ägare", "totalOwners", "number")}
        {renderInputField("Besiktningsmätarställning", "inspectionMileage", "number")}
        {renderInputField("Nuvarande ägare", "currentOwner")}
        {renderInputField("Organisationsägare", "organizationOwner")}
        {renderInputField("Importursprung", "importOrigin")}
        {renderInputField("Import-ID", "importID")}
        {renderInputField("Typkod", "typeCode")}
        {renderInputField("Miljöcertifikat", "ecoCertificate")}
        {renderInputField("Variant", "variant")}
        {renderInputField("Version", "version")}
        {renderInputField("Typ", "type")}
        {renderInputField("Kategori", "category")}

        {/* Equipment checkboxes */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="GPS"
              checked={formData.GPS}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            GPS
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Sunroof"
              checked={formData.Sunroof}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            Soltak
          </label>
        </div>

        {/* Direct Import radio buttons */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="directImport"
              value="Yes"
              checked={formData.directImport}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            Direktimport
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="directImport"
              value="No"
              checked={!formData.directImport}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            Ej direktimport
          </label>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-[460px] h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Stäng"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">
          {isEditMode ? "Redigera fordon" : "Lägg till nytt fordon"}
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Misslyckades med att {isEditMode ? "uppdatera" : "lägga till"} fordon
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col justify-between ${
            error ? "min-h-[80%] max-h-[80%]" : "min-h-[90%] max-h-[90%]"
          } overflow-y-auto`}
        >
          <div className="space-y-6">
            {isEditMode ? (
              renderAllFields()
            ) : (
              <div className="grid grid-cols-1 gap-4">{renderAllFields()}</div>
            )}
          </div>
          <div className="flex gap-3 pt-6 sticky bottom-0 bg-white">
            <button
              type="reset"
              onClick={() => {
                setFormData(isEditMode ? formData : initialVehicleState);
                setHasSearched(false);
              }}
              className="w-full bg-transparent border border-blue-700 text-blue-700 font-semibold cursor-pointer py-2.5 rounded-lg"
              disabled={isLoading}
            >
              Återställ
            </button>
            <button
              type="submit"
              className={`w-full bg-[#0B153C] text-white font-semibold py-2.5 rounded-lg flex justify-center items-center ${
                !hasSearched && !isEditMode
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800 cursor-pointer"
              }`}
              disabled={isLoading || (!hasSearched && !isEditMode)}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isEditMode ? (
                "Uppdatera fordon"
              ) : (
                "Lägg till fordon"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewVehicle;
