import React, { useState, useEffect } from "react";
import { AlertCircle, Pencil, Trash2 } from "lucide-react";
import { makeGetRequest } from "../../api/Api";
// import AddNewUser from "../models/AddNewUser";
// import EditUser from "../models/EditUser";
import {
  UserSearchIcon,
  PaginationLeftIcon,
  PaginationRightIcon,
} from "../utils/Icons";
import DeletePopup from "../models/DeletePopup";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: number;
  first: string;
  last: string;
  email: string;
  type: string;
  active: boolean;
  // These fields might come from your backend or need to be computed
  name?: string;
  role?: string;
  avatar?: string;
  joined?: string;
  status?: string;
}

// interface ApiResponse {
//   success: boolean;
//   data: User[];
//   totalItems: number;
//   totalPages: number;
//   currentPage: number;
//   itemsPerPage: number;
// }

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-500",
};

const UserTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deletePopupId, setDeletePopupId] = useState<number | null>(null);

  console.log("sample", selectedUser, editUserOpen, addUserOpen);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await makeGetRequest(
  //         `user/getAllUsers?page=${page}&limit=${pageSize}`
  //       );

  //       if (response.data.success) {
  //         // Transform the backend data to match your frontend structure
  //         const transformedUsers = response.data.data.map((user: User) => ({
  //           ...user,
  //           name: `${user.first} ${user.last}`,
  //           role: user.type, // Assuming type maps to role
  //           avatar: `https://ui-avatars.com/api/?name=${user.first}+${user.last}`,
  //           joined: new Date().toISOString(), // You might want to get this from backend
  //           status: user.active ? "Active" : "Inactive",
  //         }));

  //         setUsers(transformedUsers);
  //         setTotalItems(response.data.totalItems);
  //       } else {
  //         setError(response.data.message || "Failed to fetch users");
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching users");
  //       console.error("Error fetching users:", err);
  //       toast.error("Failed to load users");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, [page, pageSize]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest(
          `user/getAllUsers?page=${page}&limit=${pageSize}`
        );

        if (response.data.success) {
          const transformedUsers = response.data.data.map((user: User) => ({
            ...user,
            name: `${user.first} ${user.last}`,
            role: user.type,
            avatar: `https://ui-avatars.com/api/?name=${user.first}+${user.last}`,
            joined: new Date().toISOString(),
            status: user.active ? "Active" : "Inactive",
          }));

          setUsers(transformedUsers);
          setTotalItems(response.data.totalItems);
        } else {
          // Handle specific error from backend
          if (response.data.message === "User corporation not found") {
            setError("You need to be assigned to a corporation to view users");
            toast.error("You're not assigned to any corporation");
          } else {
            setError(response.data.message || "Failed to fetch users");
          }
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while fetching users";
        setError(errorMessage);

        if (err.response?.status === 401) {
          toast.error("Please login to access this resource");
          // Optionally redirect to login
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize]);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase()) ||
      u.type.toLowerCase().includes(search.toLowerCase()) ||
      u.status?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / pageSize);
  const paginated = filtered.slice(0, pageSize); // Client-side pagination for filtered results

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const handleDeleteUser = async () => {
    if (!deletePopupId) return;

    try {
      // TODO: Implement actual delete API call
      // await makeDeleteRequest(`/users/${deletePopupId}`);
      setUsers(users.filter((user) => user.id !== deletePopupId));
      toast.success("User deleted successfully");
      setDeletePopupId(null);
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      {/* <AddNewUser 
        open={addUserOpen} 
        onClose={() => setAddUserOpen(false)}
        onUserAdded={(newUser) => {
          setUsers([newUser, ...users]);
          setTotalItems(totalItems + 1);
        }}
      />
      <EditUser
        open={editUserOpen}
        onClose={() => setEditUserOpen(false)}
        user={selectedUser}
        onUserUpdated={(updatedUser) => {
          setUsers(users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          ));
        }}
      /> */}
      {deletePopupId !== null && (
        <DeletePopup
          entityName="User"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteUser}
        />
      )}
      <div className="bg-white rounded-2xl lg:p-6 p-4 font-plus-jakarta shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-[32px] font-bold text-gray-900 mb-1">
              User Management
            </h2>
            <p className="text-gray-500 text-sm">
              Manage all users and their roles.
            </p>
          </div>
          <button
            className="bg-[#012F7A] cursor-pointer hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={() => setAddUserOpen(true)}
          >
            <span className="text-lg leading-none mb-1">+</span>
            Add User
          </button>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserSearchIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F0F7FF]">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    User
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Joined
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                        {error.includes("corporation") && (
                          <button
                            onClick={() => window.location.reload()}
                            className="mt-2 text-blue-600 hover:underline"
                          >
                            Try again
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      {search
                        ? "No matching users found"
                        : "No users available"}
                    </td>
                  </tr>
                ) : (
                  paginated.map((user) => (
                    <tr key={user.id}>
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 leading-tight">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {user.role}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {user.type}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {new Date(user.joined || new Date()).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[user.status || "Inactive"] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 flex gap-2">
                        <button
                          className="text-blue-700 hover:text-blue-900 p-2 rounded-md transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUserOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 p-2 rounded-md transition-colors cursor-pointer"
                          onClick={() => setDeletePopupId(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between md:flex-row flex-col md:items-center items-start md:gap-0 gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show</span>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:border-gray-400"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
              </select>
              <span>entries of {totalItems} entries</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
                className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <PaginationLeftIcon />
              </button>
              {[...Array(Math.min(7, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    disabled={isLoading}
                    className={`px-3 py-2 text-sm border rounded-md ${
                      page === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    } ${isLoading ? "disabled:opacity-50" : ""}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 7 && <span className="px-2">...</span>}
              {totalPages > 7 && (
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={isLoading}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || isLoading}
                className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <PaginationRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
