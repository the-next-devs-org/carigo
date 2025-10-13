import React from "react";

interface ViewNoteProps {
  note: {
    id: string | number;
    text: string;
    date: string;
  };
  onClose: () => void;
}

const ViewNote: React.FC<ViewNoteProps> = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm font-plus-jakarta mb-0 px-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Note Details</h2>
          <p className="text-sm text-gray-500 mt-1">{note.date}</p>
        </div>
        <p className="text-gray-800 whitespace-pre-wrap">{note.text}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
