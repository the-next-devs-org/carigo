import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, UserDropdownIcon } from "../utils/Icons";
import { useUserProfile } from "../../utils/useUserProfile";
import { getProfileInitials, getRandomColor } from "../../utils/profileUtils";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useUserProfile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileInitials = user ? getProfileInitials(user.first_name, user.last_name) : "";
  const profileColor = user ? getRandomColor(user.user_id) : "#012F7A";

  return (
    <header className="w-full bg-white border-b border-gray-100 font-plus-jakarta flex items-center justify-between h-16 lg:px-6 pr-4 lg:pl-6 pl-[72px] lg:gap-0 gap-2">
      <div className="flex-1">
        <div className="relative w-full max-w-xs">
          {/* <input
            type="text"
            placeholder="Search"
            className="w-full md:pl-10 pl-7 md:pr-4 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          />
          <div className="absolute inset-y-0 left-0 md:pl-3 pl-2 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div> */}
        </div>
      </div>
      <div
        ref={dropdownRef}
        className="relative flex items-center md:gap-2 gap-1 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {loading ? (
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
        ) : user ? (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold border border-gray-200"
            style={{ backgroundColor: profileColor || "#FF6B00" }}
          >
            {profileInitials}
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            ?
          </div>
        )}

        <span className="font-medium text-gray-900 text-sm">
          {loading
            ? "Loading..."
            : user
            ? `${user.first_name} ${user.last_name}`
            : "Guest"}
        </span>

        <UserDropdownIcon
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Settings
            </button>
            {/* <button
              onClick={() => navigate("/users-management")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Users Management
            </button> */}
            {/* <button
              onClick={() => navigate("/roles-management")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Roles Management
            </button> */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
