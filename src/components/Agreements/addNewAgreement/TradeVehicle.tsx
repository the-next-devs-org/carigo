import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSearch: (type: "VEHICLE", query: string) => void;
};

const TradeVehicle: React.FC<Props> = ({ form, handleChange, onSearch }) => {
  const [regInput, setRegInput] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  console.log(regInput)

  console.log("error", error);

  const handleVehicleSearch = () => {
    if (!(form.tradeInRegistrationNumber || "").trim()) {
      setError("Trade-in Registration number is required");
      return;
    }
    setError("");
    // Update the form state with the trade-in registration number
    handleChange({
      target: {
        name: "tradeInRegistrationNumber",
        value: form.tradeInRegistrationNumber,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    onSearch("VEHICLE", form.tradeInRegistrationNumber);
  };


  if (location.pathname === "/add-new-sales-agreement") {
    return (
      <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
        <h2 className="text-blue-900 font-semibold mb-4">Trade-In Vehicle</h2>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Trade-in Vehicle
          </label>
          <select
            name="tradeInVehicle"
            value={form.tradeInVehicle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {form.tradeInVehicle === "yes" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Registration Number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="tradeInRegistrationNumber"
                  value={form.tradeInRegistrationNumber || ""}
                  onChange={(e) => {
                    setRegInput(e.target.value);
                    handleChange(e);
                  }}
                  placeholder="ABC123"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                  type="button"
                  onClick={handleVehicleSearch}
                >
                  Fetch
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                name="tradeInPurchaseDate"
                value={form.tradeInPurchaseDate || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Purchase Price (SEK)
              </label>
              <input
                type="number"
                name="tradeInPurchasePrice"
                value={form.tradeInPurchasePrice || ""}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Mileage (km)
              </label>
              <input
                type="number"
                name="tradeInMileage"
                value={form.tradeInMileage || ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Credit Marking
              </label>
              <select
                name="tradeInCreditMaking"
                value={form.tradeInCreditMaking || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {form.tradeInCreditMaking === "yes" && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Restskuld
                </label>
                <input
                  type="number"
                  name="tradeInRestAmount"
                  value={form.tradeInRestAmount || ""}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default TradeVehicle;
