import React, { useState } from "react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null; // agar modal band hai to kuch render na kare

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Send Email</h2>

        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={() => {
              console.log("Email Sent to:", email);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
