import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const RegistrationDates = ({ vehicle }: Props) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Registration & Dates
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Registration Date</div>
          <div className="text-sm font-medium text-gray-900">
            {formatDate(vehicle.registrationDate) || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">
            Pre-Registration date
          </div>
          <div className="text-sm font-medium text-gray-900">
            {formatDate(vehicle.preRegistrationDate) || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Registration Renewed</div>
          <div className="text-sm font-medium text-gray-900">
            {formatDate(vehicle.registrationRenewed) || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Status Date</div>
          <div className="text-sm font-medium text-gray-900">
            {formatDate(vehicle.statusDate) || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDates;
