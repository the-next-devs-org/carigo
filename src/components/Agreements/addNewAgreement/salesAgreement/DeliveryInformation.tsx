type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function DeliveryInformation({ form, handleChange }: Props) {
  return (
    <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
      <h2 className="text-blue-900 font-semibold mb-4">Delivery Information</h2>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            leveransdatum
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={form.deliveryDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            leveransort
          </label>
          <input
            type="text"
            name="deliveryLocation"
            value={form.deliveryLocation}
            placeholder="Enter delivery location"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            leveransvillkor
          </label>
          <select
            name="deliveryTerms"
            value={form.deliveryTerms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Select delevery terms</option>
            <option value="inStore">In store</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>
    </div>
  );
}
