import { useRecentUsers } from "../../../hooks/useRecentUsers";
import {
  getProfileInitials,
  getRandomColor,
} from "../../../utils/profileUtils";

const RecentUsers = () => {
  const { users, loading, error } = useRecentUsers();

  return (
    <div className="bg-white rounded-[20px] p-6 dashboard-cards">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#000814] font-plus-jakarta">
          Recent Users
        </h2>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F0F7FF] rounded-lg text-left">
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-l-lg">
                User
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Role
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Status
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-r-lg">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const fullName = `${user.first} ${user.last}`;
                const initials = getProfileInitials(user.first, user.last);
                const color = getRandomColor(user.id);

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: color }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#000814] font-plus-jakarta">
                            {fullName}
                          </div>
                          <div className="text-xs text-[#5E636B] font-plus-jakarta">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-[#5E636B] font-plus-jakarta">
                        {user.role || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-plus-jakarta
                          ${
                            user.active
                              ? "bg-[#ECFDF3] text-[#027A48]"
                              : "bg-[#FEF3F2] text-[#B42318]"
                          }
                        `}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-[#5E636B] font-plus-jakarta">
                        {user.last_Login || "Never"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
