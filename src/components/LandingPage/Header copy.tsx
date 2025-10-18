import { useState } from "react";
import { Menu, X, Car, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserProfile } from "../../utils/useUserProfile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user, loading } = useUserProfile();
  const token = localStorage.getItem("token");

  const isLoggedIn = !!token && !!user;

  if (loading) return null;

  return (
    <header className="bg-gradient-to-r from-black to-gray-800 text-white px-4 py-3 font-plus-jakarta relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Hamburger + Logo */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-500 transition-colors duration-200 cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          {/* <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold">
              <span className="text-white">S</span>
              <span className="text-orange-500">i</span>
              <span className="text-white">XT</span>
            </span>
          </div> */}
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold">
              <span className="text-white">Your</span>
              <span className="text-orange-500">Logo</span>
            </span>
          </div>
        </div>

        {/* Right Side - Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="manage-my-booking-info" className="flex items-center gap-2 hover:text-orange-500">
            <Car size={18} />
            Manage bookings
          </Link>
          <a href="#lang" className="flex items-center gap-2 hover:text-orange-500">
            <Globe size={18} />
            EN | kr
          </a>
          <div className="flex gap-2">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Log in
                </Link>
                <span>|</span>
                <Link
                  to="/signup"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Left Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleMenu} className="cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4 p-4 text-sm font-medium">
          <a href="#bookings" className="flex items-center gap-2 hover:text-orange-500">
            <Car size={18} />
            Manage bookings
          </a>
          <a href="#lang" className="flex items-center gap-2 hover:text-orange-500">
            <Globe size={18} />
            EN | kr
          </a>
          <div className="flex gap-2">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Log in
                </Link>
                <span>|</span>
                <Link
                  to="/signup"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
