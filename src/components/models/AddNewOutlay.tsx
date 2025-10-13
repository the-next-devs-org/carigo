import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Outlay } from "../Vehicles/vehicleDetails/types";

interface AddNewOutlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    date: string;
    amount: number;
    description: string;
    id?: number;
  }) => void;
  outlayToEdit?: Outlay | null;
}

const AddNewOutlay = ({
  isOpen,
  onClose,
  onSubmit,
  outlayToEdit,
}: AddNewOutlayProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isEditMode = !!outlayToEdit;

  useEffect(() => {
    if (outlayToEdit) {
      setFormData({
        date: outlayToEdit.date.split("T")[0],
        amount: outlayToEdit.amount.toString(),
        description: outlayToEdit.description,
      });
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        amount: "",
        description: "",
      });
    }
    setErrors({});
  }, [outlayToEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount))) {
      newErrors.amount = "Please enter a valid number";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const outlayData = {
        date: formData.date,
        amount: Number(formData.amount),
        description: formData.description.trim(),
        id: outlayToEdit?.id, // Include the ID when editing
      };

      onSubmit?.(outlayData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm font-plus-jakarta mb-0 px-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit Outlay" : "Add New Outlay"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (SEK) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50"
              disabled={
                !formData.date ||
                !formData.amount ||
                !formData.description.trim()
              }
            >
              {isEditMode ? "Update Outlay" : "Save Outlay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewOutlay;
