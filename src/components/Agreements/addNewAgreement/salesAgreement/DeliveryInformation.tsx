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
      <h2 className="text-blue-900 font-semibold mb-4">Betalningslänk </h2>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Kund
          </label>
          <input
            type="text"
            name="Kund"
            value={form.deliveryDate}
            onChange={handleChange}
            placeholder="Kund"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Personnummer
          </label>
          <input
            type="text"
            name="Personnummer"
            value={form.deliveryDate}
            onChange={handleChange}
            placeholder="Personnummer"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Telefonnummer 
          </label>
          <input
            type="text"
            name="Telefonnummer "
            value={form.deliveryDate}
            onChange={handleChange}
            placeholder="Telefonnummer "
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Mejladress  
          </label>
          <input
            type="text"
            name="Mejladress"
            value={form.deliveryDate}
            onChange={handleChange}
            placeholder="Mejladress"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

         <div>
          <label className="block text-sm text-gray-600 mb-1">
            Belopp  
          </label>
          <input
            disabled
            type="text"
            name="Belopp"
            value={form.deliveryDate}
            onChange={handleChange}
            placeholder="Belopp"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
      </div>
    </div>
  );
}
