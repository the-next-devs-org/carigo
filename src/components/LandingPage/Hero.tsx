import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/show-cars", {
      state: {
        pickupLocation,
        returnLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
      },
    });
  };

  return (
    <section className="relative">
      {/* Hero Car Image Background */}
      <div className="h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src="https://img.sixt.com/2800/cd9947ef-d2e3-4c72-b224-7cbe379dfd16.jpg"
          alt="Mercedes Car"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Booking Form Overlay */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-6xl mx-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Pickup Location */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Pick up car drop off
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Return Location */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Different drop off location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Other place for return"
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Date of Pick Up
            </label>
            <div className="flex">
              <div className="relative flex-1">
                <Calendar className="absolute left-2 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full pl-8 pr-1 py-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="relative flex-1">
                <Clock className="absolute left-2 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full pl-8 pr-1 py-3 border border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Date of return
            </label>
            <div className="flex">
              <div className="relative flex-1">
                <Calendar className="absolute left-2 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-8 pr-1 py-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="relative flex-1">
                <Clock className="absolute left-2 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full pl-8 pr-1 py-3 border border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-md font-semibold transition duration-200"
            >
              View fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
