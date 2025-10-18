import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";
import AddNewVehicle from "../../components/models/AddNewVehicle";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../api/config";

type CarType = {
  id: number;
  name: string;
  brand: string;
  model?: string;
  category: string;
  year: number;
  color: string;
  registration_number: string;
  transmission?: string;
  fuel_type?: string;
  mileage?: number;
  price_per_day: number;
  price_per_week?: number;
  deposit?: number;
  image?: string;
  image_url?: string;
  extra_km_cost?: number;
  status?: string;
  user_id?: string;
};

const VehicleSearch = () => {
  const [vehicles, setVehicles] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen_xyz, setModalOpen_xyz] = useState(false);
  const [currentCar_xyz, setCurrentCar_xyz] = useState<CarType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const mainTabs = [
    { id: "oversikt", label: "Översikt & Pris" },
    { id: "tillganglighet", label: "Tillgänglighknit" },
    { id: "historik", label: "Historik" },
    { id: "dokument", label: "Dokument" },
  ];

  const subTabs = [
    { id: "oversikt-pris", label: "Översikt & Pris" },
    { id: "histori", label: "Histori" },
    { id: "service", label: "Service & Skada" },
    { id: "dokuments", label: "Dokuments" },
  ];

  const statsData = [
    { label: "Fordonsflotta", value: 120, iconType: "car" },
    { label: "Tillgängliga", value: 75, iconType: "check" },
    { label: "Bokade", value: 35, iconType: "calendar" },
    { label: "Uthyrda", value: 10, iconType: "hourglass" },
    // { label: "Kommande Service", value: 5, iconType: "clock" },
  ];

  const getAllVehiclesfullUrl = `${BACKEND_API_ENDPOINT}getAllVehicles`;

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(getAllVehiclesfullUrl);

        // response.data.data contains the array of vehicles
        const vehiclesArray = Array.isArray(response.data.data) ? response.data.data : [];
        setVehicles(vehiclesArray);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const openModal_xyz = (vehicle: CarType) => {
    setCurrentCar_xyz(vehicle);
    setModalOpen_xyz(true);
  };

  const closeModal_xyz = () => {
    setCurrentCar_xyz(null);
    setModalOpen_xyz(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const [activeMainTab, setActiveMainTab] = useState("oversikt");
  const [activeSubTab, setActiveSubTab] = useState("oversikt-pris");

  // VehicleSearch component ke andar
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getAllVehiclesfullUrl);
      const vehiclesArray = Array.isArray(response.data.data) ? response.data.data : [];
      setVehicles(vehiclesArray);
    } catch (err) {
      console.error(err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect me bhi call karenge initially
  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Search filter
    const matchesSearch =
      vehicle.registration_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter button (optional)
    let matchesFilter = true;
    if (activeFilter) {
      switch (activeFilter) {
        case "Drivmedel":
          matchesFilter = vehicle.fuel_type?.toLowerCase().includes("fuel") ?? false;
          break;
        case "Biltyp":
          matchesFilter = vehicle.category.toLowerCase().includes("bil") ?? false;
          break;
        case "Pris":
          matchesFilter = vehicle.price_per_day > 0;
          break;
        case "Modellår":
          matchesFilter = vehicle.year >= 2000; // example filter
          break;
        case "Miltal":
          matchesFilter = vehicle.mileage !== undefined;
          break;
        case "Växellåda":
          matchesFilter = !!vehicle.transmission;
          break;
        case "Säljare":
          matchesFilter = !!vehicle.user_id; // example
          break;
        default:
          matchesFilter = true;
      }
    }

    return matchesSearch && matchesFilter;
  });


  return (
    <div className="max-w-full mx-auto font-plus-jakarta">
      <section aria-label="Fordonsstatistik" className="w-full rounded-2xl bg-muted/50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex w-full gap-4 overflow-x-auto pb-2">
            {statsData.map((s, i) => {
              const icon = (() => {
                switch (s.iconType) {
                  case "car":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-muted-foreground)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13l2-5a3 3 0 012.8-2h6.4A3 3 0 0117 8l2 5" />
                        <path d="M5 13h14" />
                        <circle cx="7" cy="16.5" r="1.5" />
                        <circle cx="17" cy="16.5" r="1.5" />
                      </svg>
                    );
                  case "check":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-5)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8 12l2.5 2.5L16 9" />
                      </svg>
                    );
                  case "calendar":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-2)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3.5" y="5" width="17" height="15" rx="2" />
                        <path d="M8 3.5V6.5M16 3.5V6.5M3.5 9h17" />
                      </svg>
                    );
                  case "hourglass":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-4)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 3h10M7 21h10" />
                        <path d="M8 3c0 4 4 4 4 6s-4 2-4 6" />
                        <path d="M16 3c0 4-4 4-4 6s4 2 4 6" />
                      </svg>
                    );
                  case "clock":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-4)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    );
                }
              })();

              return (
                <div key={i} className="relative w-full rounded-xl bg-card p-3 shadow-sm bg-white">
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-foreground">{s.value}</div>
                  <div className="absolute bottom-3 right-3">{icon}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toolbar filters */}
      <div role="toolbar" aria-label="Fordonsregister filter" className="mavchassinummersearch rounded-xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
        <div className="flex items-center gap-2 justify-between">
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              <path
                d="M21 21l-4.2-4.2m1.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              aria-label="Sök"
              placeholder="Sök Reg.nr, Modell eller Chassinummer..."
              className="chassinummersearch shadow-sm h-9 w-[280px] sm:w-[360px] md:w-[480px] rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-ring/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["Drivmedel", "Biltyp", "Pris", "Modellår", "Miltal", "Växellåda", "Säljare"].map((btn, i) => (
              <button
                key={i}
                className={`rounded-full border border-gray-300 px-3 py-1.5 text-sm shadow-sm transition ${activeFilter === btn ? "bg-blue-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveFilter(activeFilter === btn ? null : btn)}
              >
                {btn}
              </button>
            ))}

          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-pretty">Fordonsflotta</h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#0B153C] text-white px-[10px] py-[8px] rounded-[10px] hover:bg-blue-700 transition">
            Lägg till fordon
          </button>
          <AddNewVehicle
            open={isModalOpen}
            onClose={handleCloseModal}
            onSuccess={() => {
              handleCloseModal();
              fetchVehicles();
            }}
          />
        </div>

        <section aria-label="Fordonskort" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p>Loading vehicles...</p>}

          {!loading && filteredVehicles.length === 0 && (
            <p className="text-gray-500 col-span-full">Inga fordon hittades.</p>
          )}

          {!loading && filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="max-w-full mx-auto font-plus-jakarta cursor-pointer"
              onClick={() => openModal_xyz(vehicle)}
            >
              <div className="bg-card bg-white text-card-foreground rounded-2xl shadow-lg p-5 hover:shadow-xl transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-col gap-2">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{vehicle.registration_number}</h3>
                      <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
                    </div>
                    {(vehicle.status === "Active" || vehicle.status === "Inactive") && (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${vehicle.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {vehicle.status}
                      </span>
                    )}
                  </div>

                  <div className="relative h-[110px] w-[220px] shrink-0">
                    <img
                      src={vehicle.image_url || "https://via.placeholder.com/220x110.png?text=No+Image"}
                      className="object-contain cardcardimage h-full w-full rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-3">
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="text-gray-500">
                      <span className="font-medium text-gray-800">Mätarställning:</span> {vehicle.mileage ?? "N/A"} km
                    </p>
                    <p className="text-gray-500">
                      <span className="font-medium text-gray-800">Baspris/dygn</span>
                    </p>
                  </div>
                  <p className="text-right text-lg font-semibold text-gray-800">{vehicle.price_per_day} kr/dygn</p>
                </div>
              </div>
            </div>
          ))}

          {/* Vehicle detail modal */}
          {modalOpen_xyz && currentCar_xyz && (
            <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm">
              <div className="viewdeatilscardwidthset h-full bg-white shadow-lg flex flex-col transform transition-transform duration-300 overflow-hidden translate-x-0">
                {/* Header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Registreringsnummer {currentCar_xyz.registration_number}
                    </h2>
                    <p className="text-sm text-gray-600">{currentCar_xyz.brand} {currentCar_xyz.model}</p>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeModal_xyz}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Main Tabs */}
                <div className="flex border-b border-gray-200 px-4 flex-shrink-0">
                  {mainTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMainTab(tab.id)}
                      className={`fontsizeovermaintabs px-3 py-3 text-sm font-medium border-b-2 transition-colors ${activeMainTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub Tabs */}
                <div className="flex gap-2 px-4 py-3 bg-gray-50 overflow-x-auto flex-shrink-0">
                  {subTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded whitespace-nowrap transition-colors ${activeSubTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Modal Content */}
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  {/* Regnty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regnty</label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Reg.nr. {currentCar_xyz.registration_number}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Årsmodell */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Årsmodell</label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Årsmodell: {currentCar_xyz.year}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Pristruktur */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fordonsflotta</label>
                    <div className="flex items-center gap-2">
                      <input type="text" value={`Pris/dygn: ${currentCar_xyz.price_per_day}`} readOnly className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input type="text" value={`${currentCar_xyz.extra_km_cost ?? 0} kr/km`} readOnly className="w-24 px-3 py-2 bg-white border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VehicleSearch;
