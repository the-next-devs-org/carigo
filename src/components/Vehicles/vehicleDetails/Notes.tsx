// import { Edit, Trash, Eye } from "lucide-react";
// import type { Vehicle, Note } from "./types";
// import { useState } from "react";
// import AddNewNote from "../../models/AddNewNote";
// import DeletePopup from "../../models/DeletePopup";
// import ViewNote from "../../models/ViewNote";

// interface Props {
//   vehicle: Vehicle;
//   onSaveNote: (data: { text: string; id?: number }) => void;
//   onDelete: (noteId: number) => void;
// }

// const Notes = ({ vehicle, onSaveNote, onDelete }: Props) => {
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isViewNoteModalOpen, setIsViewNoteModalOpen] = useState(false);
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);

//   const openAddModal = () => {
//     setSelectedNote(null);
//     setIsNoteModalOpen(true);
//   };

//   const openEditModal = (note: Note) => {
//     setSelectedNote(note);
//     setIsNoteModalOpen(true);
//   };

//   const openViewModal = (note: Note) => {
//     setSelectedNote(note);
//     setIsViewNoteModalOpen(true);
//   };

//   const openDeleteModal = (note: Note) => {
//     setSelectedNote(note);
//     setIsDeleteModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsNoteModalOpen(false);
//     setIsDeleteModalOpen(false);
//     setIsViewNoteModalOpen(false);
//     setSelectedNote(null);
//   };

//   const handleSaveOrUpdate = (text: string) => {
//     if (selectedNote) {
//       onSaveNote({ text, id: selectedNote.id });
//     } else {
//       onSaveNote({ text });
//     }
//     closeModal();
//   };

//   const handleDeleteConfirm = () => {
//     if (selectedNote) {
//       onDelete(selectedNote.id);
//     }
//     closeModal();
//   };

//   return (
//     <>
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
//           <button
//             onClick={openAddModal}
//             className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
//           >
//             + Add Note
//           </button>
//         </div>
//         <div className="p-6 space-y-4">
//           {vehicle.notes?.map((note) => (
//             <div
//               key={note.id}
//               className="flex items-start justify-between group hover:bg-gray-50 p-3 rounded-md transition"
//             >
//               <div>
//                 <p className="text-sm text-gray-900 mb-1">{note.text}</p>
//                 <p className="text-xs text-gray-500">
//                   {note.date.split("T")[0]}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition">
//                 <button
//                   onClick={() => openViewModal(note)}
//                   className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => openEditModal(note)}
//                   className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => openDeleteModal(note)}
//                   className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
//                 >
//                   <Trash className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))}
//           {(!vehicle.notes || vehicle.notes.length === 0) && (
//             <div className="text-gray-500">No notes for this vehicle yet.</div>
//           )}
//         </div>
//       </div>
//       {isNoteModalOpen && (
//         <AddNewNote
//           onClose={closeModal}
//           onSave={handleSaveOrUpdate}
//           noteToEdit={selectedNote}
//         />
//       )}
//       {isDeleteModalOpen && selectedNote && (
//         <DeletePopup
//           entityName="Note"
//           onCancel={closeModal}
//           onDelete={handleDeleteConfirm}
//           onClose={closeModal}
//         />
//       )}
//       {isViewNoteModalOpen && selectedNote && (
//         <ViewNote note={selectedNote} onClose={closeModal} />
//       )}
//     </>
//   );
// };

// export default Notes;

import { Edit, Trash, Eye } from "lucide-react";
import type { Vehicle, Note } from "./types";
import { useState } from "react";
import AddNewNote from "../../models/AddNewNote";
import DeletePopup from "../../models/DeletePopup";
import ViewNote from "../../models/ViewNote";

interface Props {
  vehicle: Vehicle;
  onSaveNote: (data: { text: string; id?: number }) => void;
  onDelete: (noteId: number) => void;
}

const Notes = ({ vehicle, onSaveNote, onDelete }: Props) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewNoteModalOpen, setIsViewNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openAddModal = () => {
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const openViewModal = (note: Note) => {
    setSelectedNote(note);
    setIsViewNoteModalOpen(true);
  };

  const openDeleteModal = (note: Note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsNoteModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewNoteModalOpen(false);
    setSelectedNote(null);
  };

  const handleSaveOrUpdate = (noteData: { text: string; id?: number }) => {
    onSaveNote(noteData);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedNote) {
      onDelete(selectedNote.id);
    }
    closeModal();
  };

  // Helper function to safely format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "Invalid date";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
          <button
            onClick={openAddModal}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
          >
            + Add Note
          </button>
        </div>
        <div className="p-6 space-y-4">
          {vehicle.notes?.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between group hover:bg-gray-50 p-3 rounded-md transition"
            >
              <div>
                <p className="text-sm text-gray-900 mb-1">{note.text}</p>
                <p className="text-xs text-gray-500">{formatDate(note.date)}</p>
              </div>
              <div className="flex items-center gap-2 lg:opacity-100 transition">
                <button
                  onClick={() => openViewModal(note)}
                  className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(note)}
                  className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteModal(note)}
                  className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(!vehicle.notes || vehicle.notes.length === 0) && (
            <div className="text-gray-500">No notes for this vehicle yet.</div>
          )}
        </div>
      </div>
      {isNoteModalOpen && (
        <AddNewNote
          onClose={closeModal}
          onSave={handleSaveOrUpdate}
          noteToEdit={selectedNote}
        />
      )}
      {isDeleteModalOpen && selectedNote && (
        <DeletePopup
          entityName="Note"
          onCancel={closeModal}
          onDelete={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}
      {isViewNoteModalOpen && selectedNote && (
        <ViewNote note={selectedNote} onClose={closeModal} />
      )}
    </>
  );
};

export default Notes;
