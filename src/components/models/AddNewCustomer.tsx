import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { makePostRequest } from "../../api/Api";

interface AddNewCustomerProps {
  open: boolean;
  onClose: () => void;
  onCustomerCreated: (newCustomer: any) => void;
}

const AddNewCustomer: React.FC<AddNewCustomerProps> = ({
  open,
  onClose,
  onCustomerCreated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    type: "Client",
    address: "",
    socialSecurityNumber: "",
    postalCode: "",
    location: "",
    status: "Active",
    agreementType: "N/A",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  console.log("success", success);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.email || !formData.telephone) {
        throw new Error("Name, email, and telephone are required fields");
      }

      const response = await makePostRequest(
        "customer/createCustomer",
        formData
      );

      if (response.data && response.data.success) {
        setSuccess(true);
        onCustomerCreated(response.data.data);
        setFormData({
          name: "",
          email: "",
          telephone: "",
          type: "Client",
          address: "",
          socialSecurityNumber: "",
          postalCode: "",
          location: "",
          status: "Active",
          agreementType: "N/A",
        });

        toast.success(" Customer created successfully!");
        onClose();
        setSuccess(false);
        window.location.reload();
      } else {
        throw new Error(response.data?.message || "Failed to create customer");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-md h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Customer</h2>

          <button
            className="right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter full name..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter email address..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telephone Number *
            </label>
            <input
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter telephone number..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="Client">Client</option>
              <option value="Owner">Owner</option>
              <option value="Agency">Agency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter customer address..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Security Number
            </label>
            <input
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter social security number..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter postal code..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter customer location..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg mt-4 cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating..." : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCustomer;
