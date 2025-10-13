import React from "react";
import { Trash } from "lucide-react";

interface DeletePopupProps {
  entityName?: string;
  onCancel: () => void;
  onDelete: () => void;
  onClose?: () => void;
  isDeleting?: boolean;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  entityName = "Item",
  onCancel,
  onDelete,
  onClose,
  isDeleting = false,
}) => {
  const title = `Delete ${entityName}`;
  const description = `Are you sure you want to delete this ${entityName.toLowerCase()}? This action cannot be undone.`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm font-plus-jakarta mb-0">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          onClick={onClose || onCancel}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex justify-center mb-4">
          <span className="bg-red-50 rounded-full p-4 flex items-center justify-center">
            <Trash className="w-8 h-8 text-red-500" />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-6">{description}</p>
        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 border border-blue-900 text-blue-900 rounded-lg py-2 font-semibold hover:bg-blue-50 transition cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-lg py-2 font-semibold hover:bg-blue-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
