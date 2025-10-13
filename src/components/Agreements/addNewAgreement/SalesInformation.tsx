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

const SalesInformation: React.FC<Props> = ({ form, handleChange }) => {
  const location = useLocation();

  if (location.pathname === "/add-new-sales-agreement") {
    return (
      <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
        <h2 className="text-blue-900 font-semibold mb-4">Sales Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Sales Price (SEK)
            </label>
            <input
              type="text"
              name="salesPriceSEK"
              value={form.salesPriceSEK}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="">Select payment method</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="swish">Swish</option>
              <option value="invoice">Invoice</option>
              <option value="financing_down">
                Financing with Down Payment
              </option>
              <option value="financing_no_down">
                Financing without Down Payment
              </option>
              <option value="leasing">Leasing</option>
            </select>
          </div>
          {(form.paymentMethod === "financing_down" ||
            form.paymentMethod === "leasing" ||
            form.paymentMethod === "financing_no_down") && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Kredgivare
                </label>
                <input
                  type="text"
                  name="financialCompany"
                  value={form.financialCompany}
                  onChange={handleChange}
                  placeholder="Bank/finansföretag"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Kreditbelopp
                </label>
                <input
                  type="number"
                  name="creditAmountSales"
                  value={form.creditAmountSales}
                  onChange={handleChange}
                  placeholder="SEK"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {form.paymentMethod !== "financing_no_down" && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Kontantinsats
                  </label>
                  <select
                    name="cashStack"
                    value={form.cashStack}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="0">0 procent</option>
                    <option value="5">5 procent</option>
                    <option value="10">10 procent</option>
                    <option value="15">15 procent</option>
                    <option value="20">20 procent</option>
                    <option value="25">25 procent</option>
                    <option value="30">30 procent</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Lånetid
                </label>
                <input
                  type="number"
                  name="loanPeriod"
                  value={form.loanPeriod}
                  onChange={handleChange}
                  placeholder="manader"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              name="paymentDate"
              value={form.paymentDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default SalesInformation;
