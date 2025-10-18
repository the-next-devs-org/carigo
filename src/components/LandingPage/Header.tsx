import { useState } from "react";
import { ChevronDown, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"SV" | "EN">("SV");
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "SV" ? "EN" : "SV"));
  };
  return (
    <header
      className="
        fixed top-2 left-1/2 transform -translate-x-1/2 
        w-[92%] md:w-[85%] bg-white 
        border border-white/30 shadow-lg rounded-2xl z-50 
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Left - Logo */}
        <a href="/" className="flex items-center">
          <div className="flex items-center bg-white text-black px-3 py-2 rounded-lg font-bold text-xl gap-2">
            {/* <img src="/logo.png" alt="logo" className="w-6 h-6" /> */}
            Carigo
          </div>

        </a>
        <div className="flex items-center space-x-6">
          {/* Center - Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white drop-shadow-md">
            <Link to="/" className="hover:text-[#1612ff] text-black transition-colors">
              Hem
            </Link>
            <Link to="/show-cars" className="hover:text-[#1612ff] text-black transition-colors">
              Våra bilar 
            </Link>
            <Link to="/support" className="hover:text-[#1612ff] text-black transition-colors">
              Support
            </Link>
             <Link to="/about" className="hover:text-[#1612ff] text-black transition-colors">
              Om oss
            </Link>
          </nav>
          <div
      onClick={toggleLanguage}
      className="relative flex items-center bg-gray-100 rounded-full w-40 p-1 cursor-pointer select-none transition-all"
    >
      {/* Företag */}
      <div
        className={`py-[2px] px-0 flex-1 text-center text-sm font-medium z-10 transition-all ${
          language === "SV" ? "text-white" : "text-gray-500"
        }`}
      >
        Företag
      </div>

      {/* Privat */}
      <div
        className={`py-[2px] px-0 flex-1 text-center text-sm font-medium z-10 transition-all ${
          language === "EN" ? "text-white" : "text-gray-500"
        }`}
      >
        Privat
      </div>

      {/* Moving background */}
      <div
        className={`absolute top-1 left-1 bg-[#0B153C] rounded-[100px] w-[50%] h-[calc(100%-8px)] transition-transform duration-300 ${
          language === "SV" ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
    </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 pb-4 border-t border-white/30 bg-white/20 backdrop-blur-md rounded-b-2xl">
          <nav className="flex flex-col space-y-3 px-4 pt-3 text-white font-medium">
            <Link to="/" className="hover:text-teal-300 py-2 transition-colors">
              Home
            </Link>
            <Link to="/cars" className="hover:text-teal-300 py-2 transition-colors">
              Our Cars
            </Link>
            <Link to="/services" className="hover:text-teal-300 py-2 transition-colors">
              Services
            </Link>
            <Link to="/about" className="hover:text-teal-300 py-2 transition-colors">
              About Us
            </Link>
            <Link to="/support" className="hover:text-teal-300 py-2 transition-colors">
              Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
