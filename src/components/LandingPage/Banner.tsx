import { useNavigate } from "react-router-dom";
import { Vector } from "../../assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 font-plus-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Banner Container */}
        <div className="bg-[#1657AD] rounded-3xl px-8 py-12 md:px-12 md:py-16 relative overflow-hidden">
          <div className="absolute -top-10 -left-[30%] w-full pointer-events-none z-0">
            <img className="w-full h-full opacity-15" src={Vector} alt="" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Redo att sätta igång?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl">
                Kom igång utan några kostnader!
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap cursor-pointer">
                Kontakta oss
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Skapa konto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
