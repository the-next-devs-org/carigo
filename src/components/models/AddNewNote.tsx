import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Note } from "../Vehicles/vehicleDetails/types";

interface AddNewNoteProps {
  onClose: () => void;
  onSave: (noteData: { text: string; id?: number }) => void;
  noteToEdit?: Note | null;
}

const AddNewNote = ({ onClose, onSave, noteToEdit }: AddNewNoteProps) => {
  const [noteText, setNoteText] = useState("");
  const isEditMode = !!noteToEdit;

  useEffect(() => {
    if (noteToEdit) {
      setNoteText(noteToEdit.text);
    }
  }, [noteToEdit]);

  const handleSave = () => {
    if (noteText.trim()) {
      onSave({
        text: noteText,
        id: noteToEdit?.id, // Include the ID when editing
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm font-plus-jakarta mb-0 px-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit Note" : "Add New Note"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            disabled={!noteText.trim()}
          >
            {isEditMode ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewNote;
