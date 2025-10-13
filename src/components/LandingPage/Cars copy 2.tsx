import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../api/Api";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_API_ENDPOINT, xApiKey } from "../../api/config";

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

interface Package {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  discount_percent: number;
  deductible: string;
  waiver_damage: boolean;
  liability_insurance: boolean;
  roadside_protection: boolean;
  accident_coverage: boolean;
  property_coverage: boolean;
  createdAt: string;
  updatedAt: string;
}

const ShowCars: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPriceOnly, setShowPriceOnly] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageloading, packagesetLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

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

  const fetchPackages = async () => {
    try {
      const url = "packages/getall";
      const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;
      const response = await axios.get(fullUrl);
      setPackages(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch packages");
    } finally {
      packagesetLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchPackages();
  }, []);

  const handleCardClick = (car: Car) => {
    setSelectedCar((prev) => (prev?.id === car.id ? null : car));
    localStorage.setItem("selectedCarPrice", car.price_per_day.toString());
  };

  const handlePackageClick = (pkg: Package) => {
    setSelectedPackage(pkg);

    const carPrice = selectedCar ? Number(selectedCar.price_per_day) : 0;

    const total = carPrice + pkg.price_per_day;

    localStorage.setItem("totalPrice", total.toString());
  };


  const handleShowPrice = () => {
    setShowPriceOnly(true);
  };

  const storedPrice = localStorage.getItem("selectedCarPrice");

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

  if (packageloading) return <div>Loading packages...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow max-w-7xl px-6 py-10 mx-auto">
        {!showPriceOnly && (
          <>
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
                      className={`relative bg-black rounded-xl overflow-hidden group w-80 cursor-pointer border-4 transition-all duration-300 overflow-visible ${selectedCar?.id === car.id
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

                {/* Selected car details */}
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
                              className={`inline-block mt-2 px-2 py-1 rounded text-white font-bold ${selectedCar.available
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

                          {/* Button to show price section */}
                          <button
                            onClick={handleShowPrice}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                          >
                            Välj denna bil
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </React.Fragment>
            ))}
          </>
        )}

        {showPriceOnly && (
          <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
            <header className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <svg aria-hidden="true" className="size-6 shrink-0 text-foreground/80" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  WHICH PROTECTION PACKAGE DO YOU NEED?
                </h1>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-foreground/60">Total:</div>
                  <div className="text-xl font-semibold">
                    {localStorage.getItem("totalPrice")
                      ? `${parseFloat(localStorage.getItem("totalPrice")!).toFixed(2)} kr`
                      : "0,00 kr"}
                  </div>
                  <button className="mt-1 text-sm font-medium text-foreground/80 underline underline-offset-4 hover:text-foreground">
                    Price information
                  </button>
                </div>
                <button
                  className="h-11 rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground shadow hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                  aria-label="Continue"
                >
                  Continue
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <article
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg)}
                  className={`relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer ${selectedPackage?.id === pkg.id ? "border-orange-500" : "border-gray-200"
                    }`}
                >
                  {selectedPackage?.id === pkg.id && (
                    <div className="absolute right-4 top-4">
                      <span className="block size-5 rounded-full border-2 border-orange-500 relative">
                        <span className="absolute inset-1 rounded-full bg-orange-500" />
                      </span>
                    </div>
                  )}

                  <h3 className="mb-2 pr-8 text-xl font-extrabold leading-7 text-gray-900">
                    {pkg.name}
                  </h3>

                  <p className="mb-4 text-sm font-semibold text-gray-700">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 text-gray-800">
                    {pkg.waiver_damage && (
                      <li className="flex items-start gap-3">
                        <svg
                          aria-hidden="true"
                          className="mt-0.5 size-5 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[15px] leading-6">Waiver Damage</span>
                      </li>
                    )}
                    {pkg.liability_insurance && (
                      <li className="flex items-start gap-3">
                        <svg
                          aria-hidden="true"
                          className="mt-0.5 size-5 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[15px] leading-6">Liability Insurance</span>
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 text-lg font-bold text-gray-900">
                    ${pkg.price_per_day.toFixed(2)} / day
                  </div>
                </article>
              ))}
            </div>


            <section aria-labelledby="booking-overview" className="mt-8 rounded-xl border bg-muted p-5 md:p-6">
              <h2 id="booking-overview" className="mb-3 text-base font-semibold">
                Your booking overview:
              </h2>
              <ul className="space-y-3">
                {(selectedPackage?.booking_overview
                  ? selectedPackage.booking_overview.split("\n") // assuming it's stored as a newline-separated string
                  : [
                    "24/7 Roadside Assistance Hotline",
                    "Unlimited miles",
                    "Payment options: Best price - Pay now, cancellable and modifiable for a fee",
                  ]
                ).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg aria-hidden="true" className="mt-0.5 size-5 text-success" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[15px] leading-6">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-end">
                <svg aria-hidden="true" className="size-5 text-foreground/60" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </section>
          </main>
        )}
      </main>
    </div>
  );
};

export default ShowCars;
