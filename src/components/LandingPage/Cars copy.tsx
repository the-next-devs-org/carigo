import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../api/Api";
import toast from "react-hot-toast";

interface Car {
  id: number;
  name: string;
  brand: string;
  category: string;
  year: number;
  color: string;
  registration_number: string;
  price_per_day: string;
  available: number;
  description: string;
  image_url: string;
}

const ShowCars: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeGetRequest("getAllVehicles");
      if (response.data && response.data.success) {
        setCars(response.data.data);
      } else {
        setError(response.data?.message || "Failed to fetch cars");
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while fetching cars");
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCardClick = (car: Car) => {
    setSelectedCar((prev) => (prev?.id === car.id ? null : car));
  };

  // Break cars into rows of 3
  const rows: Car[][] = [];
  for (let i = 0; i < cars.length; i += 3) {
    rows.push(cars.slice(i, i + 3));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="p-6 text-center">Loading cars...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow max-w-7xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 text-center">
          VILKEN BIL VILL DU KÖRA?
        </h1>

        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full mb-6">
              {row.map((car) => (
                <div
                  key={car.id}
                  onClick={() => handleCardClick(car)}
                  className={`relative bg-black rounded-xl overflow-hidden group w-80 cursor-pointer border-4 transition-all duration-300 overflow-visible ${
                    selectedCar?.id === car.id
                      ? "border-orange-500 shadow-lg transform scale-105"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <div className="relative h-90 bg-gray-900 rounded-xl">
                    <img
                      src={car.image_url}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 text-white space-y-1">
                      <h3 className="text-lg font-bold">{car.name}</h3>
                      <p className="text-sm opacity-90">{car.brand}</p>
                      <p className="text-xs opacity-80">{car.category}</p>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white font-bold">
                      ${car.price_per_day} / day
                    </div>
                  </div>

                  {selectedCar?.id === car.id && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 z-50"
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        transform: "rotate(45deg) translate(-50%)",
                        borderBottomRightRadius: "30%",
                        background:
                          "linear-gradient(to right bottom, transparent, transparent 50%, rgb(255, 80, 0) 0px, rgb(255, 80, 0) 100%)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {selectedCar &&
              row.some((c) => c.id === selectedCar.id) && (
                <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/2">
                      <img
                        src={selectedCar.image_url}
                        alt={selectedCar.name}
                        className="w-full h-64 lg:h-80 rounded-xl object-cover shadow-md"
                      />
                    </div>

                    <div className="lg:w-1/2 space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedCar.name}
                        </h2>
                        <p className="text-gray-600 mb-1">{selectedCar.brand}</p>
                        <p className="text-gray-700 font-medium">
                          {selectedCar.category}
                        </p>
                        <p className="text-gray-700 font-medium">
                          Year: {selectedCar.year}
                        </p>
                        <p className="text-gray-700 font-medium">
                          Color: {selectedCar.color}
                        </p>
                        <p className="text-gray-700 font-medium">
                          Registration: {selectedCar.registration_number}
                        </p>
                        <p className="text-gray-700 font-medium">
                          Description: {selectedCar.description}
                        </p>
                        <p
                          className={`inline-block mt-2 px-2 py-1 rounded text-white font-bold ${
                            selectedCar.available
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {selectedCar.available ? "Available" : "Not Available"}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${selectedCar.price_per_day}
                          </span>
                          <span className="text-lg text-gray-600">/ day</span>
                        </div>
                      </div>

                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200">
                        Välj denna bil
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </React.Fragment>
        ))}
      </main>
    </div>
  );
};

export default ShowCars;
