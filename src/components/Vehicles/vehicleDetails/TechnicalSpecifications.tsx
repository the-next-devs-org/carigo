import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const TechnicalSpecifications = ({ vehicle }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Technical Specifications
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Engine Volume</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.engineVolume || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Gearbox</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.gearbox || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Max Speed</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.maxSpeed || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Service Weight</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.serviceWeight ? `${vehicle.serviceWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Weight</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.totalWeight ? `${vehicle.totalWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Vehicle Weight</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.vehicleWeight ? `${vehicle.vehicleWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Passengers</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.passengers || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Fuel Type</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.fuelType || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Variant</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.variant || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Version</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.version || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Type Code</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.typeCode || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">ECO Certificate</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.ecoCertificate || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
