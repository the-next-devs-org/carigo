import React from "react";
import { X } from "lucide-react";

interface AddNewRoleProps {
  open: boolean;
  onClose: () => void;
}

const AddNewRole: React.FC<AddNewRoleProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Role
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="p-6 flex-1 overflow-y-auto flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name
            </label>
            <input
              type="text"
              placeholder="Enter role name..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter full name..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>
        </form>
        <div className="p-6 border-t bg-white mt-auto flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2.5 bg-[#012F7A] text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer">
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewRole;
