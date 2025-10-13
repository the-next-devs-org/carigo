import { X } from "lucide-react";
import type { Outlay } from "../Vehicles/vehicleDetails/types";

interface ViewOutlayProps {
  outlay: Outlay;
  onClose: () => void;
}

const ViewOutlay = ({ outlay, onClose }: ViewOutlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm font-plus-jakarta mb-0 px-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Outlay Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="text-sm text-gray-900 mt-1">
              {outlay.date.split("T")[0]}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Amount</h3>
            <p className="text-sm text-gray-900 mt-1">{outlay.amount} SEK</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
              {outlay.description}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOutlay;
