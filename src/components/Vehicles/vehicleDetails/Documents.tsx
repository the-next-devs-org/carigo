import { Eye, Download } from "lucide-react";
import type { Vehicle } from "./types";
import { useState } from "react";
import AddNewDocument from "../../models/AddNewDocument";

interface Props {
  vehicle: Vehicle;
  onUploadDocument: (file: File, type: string) => void;
}

const Documents = ({ vehicle, onUploadDocument }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = (file: File, type: string) => {
    onUploadDocument(file, type);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
          >
            + Upload Document
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {vehicle.documents?.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">
                      {doc.type.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {vehicle.documents?.length === 0 && (
              <div className="text-gray-500">
                No documents for this vehicle yet.
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddNewDocument
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};

export default Documents;
