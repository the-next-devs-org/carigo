import React, { useState } from "react";
import rolesData from "../../assets/data/AllRoles.json";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddNewRole from "../models/AddNewRole";

const resourceIcons: Record<string, React.ReactNode> = {
  Dashboard: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  Swish: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 8.50586H22"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 16.5059H8"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 16.5059H14.5"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.44 3.50586H17.55C21.11 3.50586 22 4.38586 22 7.89586V16.1059C22 19.6159 21.11 20.4959 17.56 20.4959H6.44C2.89 20.5059 2 19.6259 2 16.1159V7.89586C2 4.38586 2.89 3.50586 6.44 3.50586Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  "User Management": (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  Vehicles: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15.51 2.83008H8.49C6 2.83008 5.45 4.07008 5.13 5.59008L4 11.0001H20L18.87 5.59008C18.55 4.07008 18 2.83008 15.51 2.83008Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.99 19.82C22.1 20.99 21.16 22 19.96 22H18.08C17 22 16.85 21.54 16.66 20.97L16.46 20.37C16.18 19.55 16 19 14.56 19H9.43998C7.99998 19 7.78998 19.62 7.53998 20.37L7.33998 20.97C7.14998 21.54 6.99998 22 5.91998 22H4.03998C2.83998 22 1.89998 20.99 2.00998 19.82L2.56998 13.73C2.70998 12.23 2.99998 11 5.61998 11H18.38C21 11 21.29 12.23 21.43 13.73L21.99 19.82Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 8H3"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 8H20"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 3V5"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 5H13.5"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 15H9"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 15H18"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  Agreements: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 12.1992H15"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 16.1992H12.38"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  Customers: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  "Roles Management": (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.2101 15.741L15.67 19.281C15.53 19.421 15.4 19.681 15.37 19.871L15.18 21.221C15.11 21.711 15.45 22.051 15.94 21.981L17.29 21.791C17.48 21.761 17.75 21.631 17.88 21.491L21.42 17.951C22.03 17.341 22.32 16.631 21.42 15.731C20.53 14.841 19.8201 15.131 19.2101 15.741Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
  Invoices: (
    <span className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 7.04V16.96C20 18.48 19.86 19.56 19.5 20.33C19.5 20.34 19.49 20.36 19.48 20.37C19.26 20.65 18.97 20.79 18.63 20.79C18.1 20.79 17.46 20.44 16.77 19.7C15.95 18.82 14.69 18.89 13.97 19.85L12.96 21.19C12.56 21.73 12.03 22 11.5 22C10.97 22 10.44 21.73 10.04 21.19L9.02002 19.84C8.31002 18.89 7.05999 18.82 6.23999 19.69L6.22998 19.7C5.09998 20.91 4.10002 21.09 3.52002 20.37C3.51002 20.36 3.5 20.34 3.5 20.33C3.14 19.56 3 18.48 3 16.96V7.04C3 5.52 3.14 4.44 3.5 3.67C3.5 3.66 3.50002 3.65 3.52002 3.64C4.09002 2.91 5.09998 3.09 6.22998 4.3L6.23999 4.31C7.05999 5.18 8.31002 5.11 9.02002 4.16L10.04 2.81C10.44 2.27 10.97 2 11.5 2C12.03 2 12.56 2.27 12.96 2.81L13.97 4.15C14.69 5.11 15.95 5.18 16.77 4.3C17.46 3.56 18.1 3.21 18.63 3.21C18.97 3.21 19.26 3.36 19.48 3.64C19.5 3.65 19.5 3.66 19.5 3.67C19.86 4.44 20 5.52 20 7.04Z"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 10.25H16"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 13.75H14"
          stroke="#012F7A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
    </span>
  ),
};

const RoleTable = () => {
  const [openRole, setOpenRole] = useState<number | null>(1);
  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const roles = rolesData;

  return (
    <>
      <AddNewRole open={addRoleOpen} onClose={() => setAddRoleOpen(false)} />
      <div className="bg-white rounded-2xl lg:p-6 p-4 font-plus-jakarta shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-[32px] font-bold text-gray-900 mb-1">
              Roles Management
            </h2>
            <p className="text-gray-500 text-sm">
              Manage roles and permissions for your users.
            </p>
          </div>
          <button
            className="bg-[#012F7A] cursor-pointer hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={() => setAddRoleOpen(true)}
          >
            <span className="text-lg leading-none mb-1">+</span> Create Role
          </button>
        </div>
        {roles.map((role: any) => (
          <div
            key={role.id}
            className="bg-[#F8FAFC] rounded-xl mb-4 border border-gray-100"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              onClick={() => setOpenRole(openRole === role.id ? null : role.id)}
            >
              <div className="flex justify-center items-center gap-5">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#012F7A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"
                      stroke="#012F7A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {role.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {role.description}
                  </div>
                </div>
              </div>
              {openRole === role.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openRole === role.id && (
              <div className="overflow-x-auto px-6 pb-6">
                <table className="min-w-full mt-2">
                  <thead>
                    <tr className="bg-[#F0F7FF]">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        Resource
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                        View
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                        Add
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                        Edit
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {role.permissions.map((perm: any) => (
                      <tr key={perm.resource}>
                        <td className="py-4 px-4 flex items-center gap-3 min-w-[180px]">
                          {resourceIcons[perm.resource]}
                          <span className="font-medium text-gray-800">
                            {perm.resource}
                          </span>
                        </td>
                        {["view", "add", "edit", "delete"].map((action) => (
                          <td key={action} className="py-4 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={!!perm[action]}
                              readOnly
                              className="accent-[#012F7A] w-5 h-5 rounded border-gray-300 focus:ring-0 cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RoleTable;
