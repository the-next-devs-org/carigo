import React from "react";
import { X } from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  type: string;
  joined: string;
  status: string;
  phone?: string;
  password?: string;
}

interface EditUserProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUser: React.FC<EditUserProps> = ({ open, onClose, user }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
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
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user.name}
              placeholder="Enter full name..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              placeholder="Enter your email..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue={user.phone || ""}
              placeholder="Enter your phone number..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              defaultValue={user.password || ""}
              placeholder="Enter your password..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <div className="relative">
              <select
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={user.type.toLowerCase()}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Role
            </label>
            <div className="relative">
              <select
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={user.role.toLowerCase()}
              >
                <option value="">Select User Role</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DropdownArrowIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
