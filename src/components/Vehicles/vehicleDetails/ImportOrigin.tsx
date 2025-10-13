import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const ImportOrigin = ({ vehicle }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Import & Origin</h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Import ID</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.importID || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Direct Import</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.directImport || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportOrigin;
