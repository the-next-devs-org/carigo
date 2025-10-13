import React from "react";
import { useLocation } from "react-router-dom";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const PaymentInformation: React.FC<Props> = ({ form, handleChange }) => {
  const location = useLocation();

  if (
    location.pathname === "/add-new-sales-agreement" ||
    location.pathname === "/add-new-purchase-agreement"
  ) {
    return (
      <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
        <h2 className="text-blue-900 font-semibold mb-4">
          {location.pathname === "/add-new-sales-agreement"
            ? "Tillägsinformation"
            : "Purchase Information"}
        </h2>
        {location.pathname === "/add-new-purchase-agreement" && (
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Purchase Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={form.purchasePrice || ""}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="swish">Swish</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Credit Marking <span className="text-red-500">*</span>
                </label>
                <select
                  name="creditMarking"
                  value={form.creditMarking || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {form.creditMarking === "yes" && (
                <>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Creditor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="creditorName"
                      value={form.creditorName || ""}
                      onChange={handleChange}
                      placeholder="Creditor name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Credit Amount (SEK){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="creditAmount"
                      value={form.creditAmount || ""}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Settlement Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="settlementDate"
                      value={form.settlementDate || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Payout date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="payoutDate"
                  value={form.payoutDate || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>


              {form.paymentMethod === "bank_transfer" && (
                <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Bank <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bank"
                  value={form.bank || ""}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Account number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber || ""}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              </>
              )}
              {form.paymentMethod === "swish" && (
               <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Swish Nummer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="swishNumber"
                    value={form.swishNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter swish nummer"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

             

                
            </div>
            {/* <div className="mt-4"> */}
          </div>
          // </div>
        )}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1">
            {location.pathname === "/add-new-sales-agreement"
              ? "Free Text Message (Payment)"
              : "Notes"}
          </label>
          <textarea
            name="freeTextMessage"
            value={form.freeTextMessage}
            onChange={handleChange}
            placeholder={
              location.pathname === "/add-new-sales-agreement"
                ? "Enter any specific details or comments here"
                : "Additional Notes"
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>
      </div>
    );
  }
};

export default PaymentInformation;
