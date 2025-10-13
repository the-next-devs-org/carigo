import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const InspectionDetails = ({ vehicle }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Inspection Details
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Last Inspection</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.lastInspection
              ? vehicle.lastInspection.split("T")[0]
              : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Next Inspection Due</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.nextInspectionDue
              ? vehicle.nextInspectionDue.split("T")[0]
              : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Inspection Mileage</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.inspectionMileage || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Inspection Station</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.inspectionStation || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;
