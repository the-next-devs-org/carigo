import React, { useEffect, useState, useMemo } from "react";
import { makeGetRequest } from "../../api/Api";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";

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
  booking_overview?: string;
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
  const [step, setStep] = useState<"cars" | "packages" | "next" | "summary">("cars");
  const [addons, setAddons] = useState<any[]>([]);
  const [addonsLoading, setAddonsLoading] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(
    parseFloat(localStorage.getItem("totalPrice") || "0")
  );
  const [phone, setPhone] = useState<any>("");
  const [selected, setSelected] = useState("yes");
  const [checked, setChecked] = useState(true);
  const [readchecked, readsetChecked] = useState(true);

  const [value, setValue] = useState(null);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (val) => {
    setValue(val);
  };

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

  const fetchAddons = async () => {
    setAddonsLoading(true);
    try {
      const url = "addons/getall";
      const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;
      const response = await axios.get(fullUrl);
      setAddons(response.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch addons");
    } finally {
      setAddonsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchPackages();
    fetchAddons();
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
    setTotalPrice(total);
  };

  const handleShowPrice = () => {
    setShowPriceOnly(true);
    setStep("packages");
  };

  const handleContinue = () => setStep("next");
  const handleNextStep = () => setStep("summary");

  const handleBack = () => {
    if (step === "next") {
      setStep("packages");
    } else if (step === "packages") {
      setShowPriceOnly(false);
    } else if (step === "summary") {
      setStep("next");
    }
  };

  const handleToggleAddon = (addonId: number, price: number) => {
    const currentTotal = parseFloat(localStorage.getItem("totalPrice") || "0");
    let updatedTotal = currentTotal;

    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
      updatedTotal -= price;
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
      updatedTotal += price;
    }

    localStorage.setItem("totalPrice", updatedTotal.toString());
    setTotalPrice(updatedTotal);
  };

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

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (packageloading) return <div>Loading packages...</div>;

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedCar || !selectedPackage) {
      toast.error("Please select a car and a package before proceeding.");
      return;
    }

    const formElement = (e.currentTarget as HTMLFormElement).closest("form");
    if (!formElement) {
      toast.error("Form not found.");
      return;
    }

    const formData = new FormData(formElement);
    const combinedPhone = `${phone || ""}${formData.get("numberphone") || ""}`;

    const payload = {
      vehicle_id: selectedCar.id,
      package_id: selectedPackage.id,
      addons: selectedAddons,
      total_price: totalPrice,
      phone: combinedPhone,
      sms_notifications: selected === "yes",
      is_25_or_older: checked,
      has_read_terms: readchecked,
      country: ((value as unknown) as { label?: string } | null)?.label ?? "",

      company: formData.get("company") as string || "",
      firstname: formData.get("firstname") as string || "",
      surname: formData.get("surname") as string || "",
      email: formData.get("email") as string || "",
      streetaddress: formData.get("streetaddress") as string || "",
      zipcode: formData.get("zipcode") as string || "",
      city: formData.get("city") as string || "",
      cardnumber: formData.get("cardnumber") as string || "",
      cardholder: formData.get("cardholder") as string || "",
      card_date: formData.get("card_date") as string || "",
      card_cvc: formData.get("card_cvc") as string || "",
      fightnumber: formData.get("fightnumber") as string || "",
    };

    // console.log("🧾 Booking Payload:", payload);

    try {
      const response = await axios.post(`${BACKEND_API_ENDPOINT}bookings/create`, payload);

      if (response.data.success) {
        toast.success("Booking successfully created!");
        // console.log("Booking ID:", response.data.booking_id);
        setTimeout(() => {
          window.location.href = "/"; 
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to create booking.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while submitting your booking.");
    }
  };



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow max-w-7xl px-6 py-10">
        {/* STEP 1: Show Cars */}
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
                      className={`relative bg-black rounded-xl overflow-hidden group w-80 cursor-pointer border-4 transition-all duration-300 ${selectedCar?.id === car.id
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
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {selectedCar.name}
                          </h2>
                          <p className="text-gray-700 font-medium">{selectedCar.category}</p>
                          <p className="text-gray-700 font-medium">Year: {selectedCar.year}</p>
                          <p className="text-gray-700 font-medium">Color: {selectedCar.color}</p>
                          <p className="text-gray-700 font-medium">
                            Registration: {selectedCar.registration_number}
                          </p>
                          <p className="text-gray-700 font-medium">Description: {selectedCar.description}</p>
                          <p
                            className={`inline-block mt-2 px-2 py-1 rounded text-white font-bold ${selectedCar.available ? "bg-green-500" : "bg-red-500"
                              }`}
                          >
                            {selectedCar.available ? "Available" : "Not Available"}
                          </p>

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

        {/* STEP 2: Packages */}
        {showPriceOnly && step === "packages" && (
          <>
            <header className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200 transition">
                  <svg aria-hidden="true" className="size-6 shrink-0 text-foreground/80" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  WHICH PROTECTION PACKAGE DO YOU NEED?
                </h1>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-foreground/60">Total:</div>
                  <div className="text-xl font-semibold">
                    {totalPrice.toFixed(2)} kr
                  </div>
                </div>

                <button
                  className={`h-11 rounded-full px-6 text-sm font-semibold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                    ${selectedPackage
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  aria-label="Continue"
                  onClick={selectedPackage ? handleContinue : undefined}
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
                  className={`relative rounded-xl border bg-white p-5 shadow-sm cursor-pointer ${selectedPackage?.id === pkg.id ? "border-orange-500" : "border-gray-200"}`}
                >
                  <h3 className="mb-2 text-xl font-extrabold">{pkg.name}</h3>
                  <p className="mb-4 text-sm font-semibold">{pkg.description}</p>
                  <div className="mt-5 text-lg font-bold">
                    ${pkg.price_per_day.toFixed(2)} / day
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* STEP 3: Add-ons */}
        {step === "next" && (
          <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <header className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200 transition">
                    <svg aria-hidden="true" className="size-6 shrink-0 text-foreground/80" viewBox="0 0 24 24" fill="none">
                      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                    What add-ons do you need?
                  </h1>
                </div>

                <div className="ml-auto flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-foreground/60">Total:</div>
                    <div className="text-xl font-semibold">
                      {totalPrice.toFixed(2)} kr
                    </div>
                  </div>

                  {/* 🔥 Updated Button for Summary Step */}
                  <button
                    className={`h-11 rounded-full px-6 text-sm font-semibold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                      ${selectedPackage
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    aria-label="Continue"
                    onClick={selectedPackage ? handleNextStep : undefined}
                  >
                    Continue
                  </button>
                </div>
              </header>

              <div className="grid md:grid-cols-[1fr_300px] gap-6">
                <section className="space-y-4">
                  {addonsLoading ? (
                    <div>Loading addons...</div>
                  ) : (
                    addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
                      >
                        <div>
                          <h3 className="font-semibold">{addon.name}</h3>
                          <p className="text-sm text-gray-600">
                            {addon.price} {addon.price_unit}
                          </p>
                        </div>

                        {addon.is_optional ? (
                          <div
                            onClick={() => handleToggleAddon(addon.id, parseFloat(addon.price))}
                            className={`h-8 w-14 rounded-full relative cursor-pointer transition-all ${selectedAddons.includes(addon.id) ? "bg-orange-500" : "bg-gray-300"
                              }`}
                          >
                            <span
                              className={`absolute top-1 h-6 w-6 bg-white rounded-full shadow transition-transform ${selectedAddons.includes(addon.id) ? "translate-x-6" : "translate-x-1"
                                }`}
                            ></span>
                          </div>
                        ) : (
                          <div className="text-green-500 font-semibold text-sm">Included</div>
                        )}
                      </div>
                    ))
                  )}
                </section>
                <aside className="p-6 border rounded-lg bg-gray-50 shadow-sm md:sticky md:top-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="font-semibold text-lg">Your booking overview:</h2>
                  </div>

                  <ul className="space-y-2 text-gray-700">
                    {(selectedPackage?.booking_overview
                      ? selectedPackage.booking_overview.split("\n")
                      : [
                        "24/7 Roadside Assistance Hotline",
                        "Unlimited miles",
                        "Payment options: Best price - Pay now, cancellable and modifiable for a fee",
                      ]
                    ).map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </main>
        )}

        {/* STEP 4: Summary */}
        {step === "summary" && (
          <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <header className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200 transition">
                    <svg aria-hidden="true" className="size-6 shrink-0 text-foreground/80" viewBox="0 0 24 24" fill="none">
                      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                    Review your booking
                  </h1>
                </div>

                <div className="ml-auto flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-foreground/60">Total:</div>
                    <div className="text-xl font-semibold">
                      {totalPrice.toFixed(2)} kr
                    </div>
                  </div>
                </div>
              </header>
              <form onSubmit={handleBookingSubmit}>
                <div className="grid md:grid-cols-[1fr_300px] gap-6">
                  <section className="space-y-4">
                    <h4 className="whowilldrive">Who will drive?</h4>
                    <label className="block fontweightbold">Company <span className="fontwightlight">(optional)</span></label>
                    <input type="text" name="company" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="fontweightbold block font-semibold mb-1">First name</label>
                        <input
                          type="text"
                          name="firstname"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="fontweightbold block font-semibold mb-1">Surname</label>
                        <input
                          type="text"
                          name="surname"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>
                    </div>

                    <label className="block fontweightbold">Email</label>
                    <input type="email" name="email" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" required />

                    <div className="flex items-center gap-3">
                      <div className="w-1/4">
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <PhoneInput
                          country="se"
                          value={phone}
                          onChange={(value) => setPhone(value)}
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          inputClass="!p-3 !rounded-lg !border !border-gray-300 focus:!ring-2 focus:!ring-orange-400 focus:!border-orange-400"
                          buttonClass="!border-gray-300"
                          containerClass="!w-full"
                        />
                      </div>

                      <div className="w-3/4">
                        <label className="block font-semibold mb-1">Phone number</label>
                        <input
                          type="tel"
                          name="numberphone"
                          placeholder="Enter phone number"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>
                    </div>

                    <label className="flex items-center cursor-pointer mt-10">
                      <div
                        className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-colors ${selected === "yes" ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"
                          }`}
                      >
                        {selected === "yes" && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                      <span className="ml-3 text-base font-medium text-gray-900">
                        I would like to receive SMS notifications about my reservation.
                      </span>
                      <input
                        type="radio"
                        className="hidden"
                        name="sms-notifications"
                        value="yes"
                        checked={selected === "yes"}
                        onChange={() => setSelected("yes")}
                      />
                    </label>

                    <label className="flex items-center cursor-pointer mt-10">
                      <div
                        className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-colors ${selected === "no" ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"
                          }`}
                      >
                        {selected === "no" && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                      <span className="ml-3 text-base font-medium text-gray-900">
                        No, I do not wish to receive any text messages.
                      </span>
                      <input
                        type="radio"
                        className="hidden"
                        name="sms-notifications"
                        value="no"
                        checked={selected === "no"}
                        onChange={() => setSelected("no")}
                      />
                    </label>

                    <label className="flex items-center cursor-pointer space-x-2 mt-10">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={checked}
                          name="is_25_or_older"
                          onChange={() => setChecked(!checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 border rounded-sm flex items-center justify-center 
                          ${checked ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300"}`}
                        >
                          {checked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-base font-medium text-gray-900 agecheckbox">I am 25 years old or older</span>
                    </label>

                    <h4 className="whowilldrive mt-10">How would you like to pay?</h4>
                    <label className="block fontweightbold mt-10">Card Number</label>
                    <input type="number" name="cardnumber" required className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="1234 1234 1234 1234" />

                    <label className="block fontweightbold mt-10">Card holder</label>
                    <input type="text" name="cardholder" required className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="fontweightbold block font-semibold mb-1">Card Date</label>
                        <input
                          type="date"
                          name="card_date"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="fontweightbold block font-semibold mb-1">Card CVC</label>
                        <input
                          type="number"
                          name="card_cvc"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>
                    </div>
                    <p className="paymentmethodissue">Payment method must be issued in the renter's name and physically presented at pick-up. Debit cards accepted for select vehicle classes and additional
                      <a href="#" className="fontboldsupplementary"> supplementary documents </a>
                      may be required in some cases.
                    </p>

                    <h4 className="whowilldrive mt-10">What is your billing address?</h4>

                    <label className="block mb-2 font-semibold">Country</label>
                    <Select
                      options={options}
                      value={value}
                      onChange={changeHandler}
                      placeholder="Select your country"
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: "8px",
                          borderColor: "#f97316", // orange
                          boxShadow: "none",
                          "&:hover": { borderColor: "#fb923c" },
                        }),
                      }}
                    />

                    <label className="block fontweightbold mt-10">Street address</label>
                    <input type="text" name="streetaddress" required className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" />


                    <div className="flex items-center gap-3">
                      <div className="w-1/4">
                        <label className="block font-semibold mb-1 fontweightbold">Zip Code</label>
                        <input
                          type="number"
                          name="zipcode"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>

                      <div className="w-3/4">
                        <label className="block font-semibold mb-1 fontweightbold">City</label>
                        <input
                          type="text"
                          name="city"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          required
                        />
                      </div>
                    </div>

                    <h4 className="whowilldrive mt-10">Enter flight number</h4>
                    <div className="fightnumber">
                      <svg
                        className="infoicon"
                        fill="#000000"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0ZM12,8a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,8Z"></path>
                      </svg>
                      <p className="infopara">This is used to see if your flight is delayed, so we can prepare a car for you.</p>
                    </div>

                    <label className="block fontweightbold">Flight number <span className="fontwightlight">(optional)</span></label>
                    <input type="text" name="fightnumber" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <div className="totalamountlast">
                      <div className="mt-10">


                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-900">Total</h4>
                            <h4 className="text-sm text-gray-500">The amount you will pay</h4>
                          </div>

                          <span className="font-bold pricetotallastfinal">{totalPrice.toFixed(2)} kr</span>
                        </div>

                      </div>
                      <a className="navlinkbonus">Price information</a>
                      <br></br>
                      <br></br>
                      <a className="navlinkbonus mt-5">Important information about your booking</a>
                      <p className="importantinformationavoutpara">Your prepaid rate is subject to the following cancellation, rebooking and no-show fees. Please note that the fees below will never exceed the total prepaid amount:</p>
                      <ul className="importantinformationavoutlist">
                        <li className="importantinformationavoutpara">Cancellation: An amount of SEK 875.27 will be charged in case of cancellation (which is possible up until the agreed pick-up time). Any remaining prepaid amount of SEK 875.27 will be refunded.</li>
                        <li className="importantinformationavoutpara">No-show: No refund will be made in the event of missed vehicle pick-up (no-show) or cancellation after the scheduled pick-up time.</li>
                        <li className="importantinformationavoutpara">No Refunds for Unused Rental Days: No refunds or credits will be issued for unused rental days (due to late pickup or early return) once the vehicle has been picked up.</li>
                      </ul>

                      <label className="flex items-start cursor-pointer space-x-2 mt-10">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={readchecked}
                            name="readreciept"
                            onChange={() => readsetChecked(!readchecked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 border rounded-sm flex items-center justify-center 
                            ${readchecked ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300"}`}
                          >
                            {readchecked && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-base font-small text-gray-900 agenewcheckbox">
                          I have read and accept the Rental Information, Terms and Conditions and Privacy Policy and confirm that I am booking a prepaid rate, where the total booking price will be immediately charged to the payment
                          method I provided. I am aware that certain driver requirements (such as age), payment requirements (such as debit card, security lock) and territorial restrictions apply.
                        </span>
                      </label>

                      <button className="payandbookbutton" type="submit">Pay and book</button>
                    </div>
                  </section>
                  <aside className="p-6 rounded-lg bg-gray-50 shadow-sm md:sticky md:top-6">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <img src={selectedCar?.image_url} alt={selectedCar?.name} className="w-24 h-16 object-cover rounded-md mb-2" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{selectedCar?.name} <span>({selectedCar?.category})</span></h4>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h6 className="font-semibold fontbookingoview">Your booking overview:</h6>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      {(selectedPackage?.booking_overview
                        ? selectedPackage.booking_overview.split("\n")
                        : [
                          "24/7 Roadside Assistance Hotline",
                          "Unlimited miles",
                          "Payment options: Best price - Pay now, cancellable and modifiable for a fee",
                        ]
                      ).map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </form>
            </div>
          </main >
        )}
      </main >
    </div >
  );
};

export default ShowCars;
