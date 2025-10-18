import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSearch: (type: "VEHICLE" | "ORG" | "PERSON", query: string) => void;
};

const BasicInformation: React.FC<Props> = ({
  form,
  handleChange,
  onSearch,
}) => {
  const [regInput, setRegInput] = useState("");
  const [orgOrSsn, setOrgOrSsn] = useState("");
  const [error, setError] = useState("");

  // const handleVehicleSearch = () => {
  //   if (!regInput) {
  //     setError("Registration number is required");
  //     return;
  //   }
  //   setError("");
  //   onSearch("VEHICLE", regInput);
  // };

  const handleVehicleSearch = () => {
    if (!regInput) {
      setError("Registration number is required");
      return;
    }
    setError("");
    // Update the form state with the registration number
    handleChange({
      target: {
        name: "registrationNumber",
        value: regInput,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    onSearch("VEHICLE", regInput);
  };

  const handleOrgOrPersonSearch = () => {
    if (
      (form.customerType === "company" ||
        form.customerType === "private individual") &&
      !orgOrSsn
    ) {
      setError(
        form.customerType === "company"
          ? "Organization number is required"
          : "Social Security number is required"
      );
      return;
    }
    setError("");

    // Update the form state based on customer type
    if (form.customerType === "company") {
      handleChange({
        target: {
          name: "organizationNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      onSearch("ORG", orgOrSsn);
    } else if (form.customerType === "private individual") {
      handleChange({
        target: {
          name: "socialSecurityNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      onSearch("PERSON", orgOrSsn);
    }
  };

  const location = useLocation();

  return (
    <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
      <h2 className="text-blue-900 font-semibold mb-4">Basic Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Registration Number
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="registrationNumber"
              value={form.registrationNumber || regInput}
              onChange={(e) => {
                setRegInput(e.target.value);
                handleChange(e);
              }}
              placeholder="Registration Number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
              type="button"
              onClick={handleVehicleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {location.pathname === "/add-new-sales-agreement"
              ? "Datum"
              : "Purchase Date"}
          </label>
          <input
            type="date"
            name={
              location.pathname === "/add-new-sales-agreement"
                ? "salesDate"
                : "purchaseDate"
            }
            value={
              location.pathname === "/add-new-sales-agreement"
                ? form.salesDate
                : form.purchaseDate
            }
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Customer Type
          </label>
          <select
            name="customerType"
            value={form.customerType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Select customer type</option>
            <option value="company">Company</option>
            <option value="private individual">Private Individual</option>
          </select>
        </div>
        {form.customerType === "company" && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Organization Number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="organizationNumber"
                  placeholder="Organization number"
                  value={form.organizationNumber || orgOrSsn}
                  onChange={(e) => {
                    setOrgOrSsn(e.target.value);
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                  type="button"
                  onClick={handleOrgOrPersonSearch}
                >
                  Search
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-sm mt-1">{error}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                verifierad
              </label>
              <select
                name="verification"
                value={form.verification}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Select verification</option>
                <option value="passport">Passport</option>
                <option value="drivingLicense">Driver license</option>
                <option value="digitalId">Digital ID</option>
                <option value="id">ID</option>
              </select>
            </div>
          </>
        )}
        {form.customerType === "private individual" && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Social Security Number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="socialSecurityNumber"
                  placeholder="Social Security Number"
                  value={form.socialSecurityNumber || orgOrSsn}
                  onChange={(e) => {
                    setOrgOrSsn(e.target.value);
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                  type="button"
                  onClick={handleOrgOrPersonSearch}
                >
                  Search
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-sm mt-1">{error}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Körkortsnummer</label>
                <input
                  type="text"
                  name="Körkortsnummer"
                  placeholder="Körkortsnummer"
                  value={form.pep || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Giltighetstid Körkort
              </label>
              <input
                  type="text"
                  name="verification"
                  placeholder="Giltighetstid Körkort"
                  value={form.verification || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Telephone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telephone Number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
