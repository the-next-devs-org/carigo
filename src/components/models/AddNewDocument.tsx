import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud, File as FileIcon } from "lucide-react";

interface AddNewDocumentProps {
  onClose: () => void;
  onUpload: (file: File, type: string) => void;
}

const AddNewDocument = ({ onClose, onUpload }: AddNewDocumentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (file && type) {
      onUpload(file, type);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm px-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Document
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
            <label
              htmlFor="doc-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document Type
            </label>
            <input
              id="doc-type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., Insurance, Registration, Inspection..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag & drop a file here, or click to select a file"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PDF, Images, DOC, DOCX files supported
              </p>
            </div>
          </div>

          {file && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileIcon className="w-6 h-6 text-gray-500" />
                <p className="text-sm font-medium">{file.name}</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            disabled={!file || !type.trim()}
          >
            Upload to Cloudinary
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewDocument;
