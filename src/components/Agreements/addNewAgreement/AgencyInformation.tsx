type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const AgencyInformation = ({ form, handleChange }: Props) => {
  return (
    <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
      <h2 className="text-blue-900 font-semibold mb-4">Agency Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Sales Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="salesPrice"
            value={form.salesPrice || ""}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Commission Amount (SEK) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="commissionAmount"
            value={form.commissionAmount || ""}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Agency Costs (SEK) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="agencyFee"
            value={form.agencyFee || ""}
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
            <option value="">Select payment method</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="swish">Swish</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>
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
                Credit Amount (SEK) <span className="text-red-500">*</span>
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
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder=""
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
        />
      </div>
    </div>
  );
};

export default AgencyInformation;
