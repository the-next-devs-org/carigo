import { Edit, Trash, Eye } from "lucide-react";
import type { Vehicle, Outlay } from "./types";
import { useState } from "react";
import AddNewOutlay from "../../models/AddNewOutlay";
import DeletePopup from "../../models/DeletePopup";
import ViewOutlay from "../../models/ViewOutlay";

interface Props {
  vehicle: Vehicle;
  onSaveOutlay: (data: {
    date: string;
    amount: number;
    description: string;
    id?: number;
  }) => void;
  onDelete: (outlayId: number) => void;
}

const OutlayComponent = ({ vehicle, onSaveOutlay, onDelete }: Props) => {
  const [isOutlayModalOpen, setIsOutlayModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewOutlayModalOpen, setIsViewOutlayModalOpen] = useState(false);
  const [selectedOutlay, setSelectedOutlay] = useState<Outlay | null>(null);

  const openAddModal = () => {
    setSelectedOutlay(null);
    setIsOutlayModalOpen(true);
  };

  const openEditModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsOutlayModalOpen(true);
  };

  const openViewModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsViewOutlayModalOpen(true);
  };

  const openDeleteModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsOutlayModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewOutlayModalOpen(false);
    setSelectedOutlay(null);
  };

  const handleSaveOrUpdate = (data: {
    date: string;
    amount: number;
    description: string;
  }) => {
    if (selectedOutlay) {
      onSaveOutlay({ ...data, id: selectedOutlay.id });
    } else {
      onSaveOutlay(data);
    }
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedOutlay) {
      onDelete(selectedOutlay.id);
    }
    closeModal();
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Outlay</h2>
          <button
            onClick={openAddModal}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
          >
            + Add Outlay
          </button>
        </div>
        <div className="p-6 space-y-4">
          {vehicle.outlay?.map((outlay) => (
            <div
              key={outlay.id}
              className="flex items-start justify-between group hover:bg-gray-50 p-3 rounded-md transition"
            >
              <div>
                <p className="text-sm text-gray-900 mb-1">
                  {outlay.description}
                </p>
                <div className="flex gap-4">
                  <p className="text-xs text-gray-500">
                    {outlay.date.split("T")[0]}
                  </p>
                  <p className="text-xs font-medium text-gray-900">
                    {outlay.amount} SEK
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:opacity-100 transition">
                <button
                  onClick={() => openViewModal(outlay)}
                  className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(outlay)}
                  className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteModal(outlay)}
                  className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(!vehicle.outlay || vehicle.outlay.length === 0) && (
            <div className="text-gray-500">
              No outlays for this vehicle yet.
            </div>
          )}
        </div>
      </div>
      {isOutlayModalOpen && (
        <AddNewOutlay
          isOpen={isOutlayModalOpen}
          onClose={closeModal}
          onSubmit={handleSaveOrUpdate}
          outlayToEdit={selectedOutlay}
        />
      )}
      {isDeleteModalOpen && selectedOutlay && (
        <DeletePopup
          entityName="Outlay"
          onCancel={closeModal}
          onDelete={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}
      {isViewOutlayModalOpen && selectedOutlay && (
        <ViewOutlay outlay={selectedOutlay} onClose={closeModal} />
      )}
    </>
  );
};

export default OutlayComponent;
