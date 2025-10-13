import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const OwnershipInformation = ({ vehicle }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Ownership Information
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Current Owner</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.currentOwner ? vehicle.currentOwner : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Acquisition Date</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.acquisitionDate
              ? vehicle.acquisitionDate.split("T")[0]
              : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Owners</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.totalOwners || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Organization Owner</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.organizationOwner || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipInformation;
