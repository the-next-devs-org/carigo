const locations = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
  "Lund",
  "Umeå",
  "Gävle",
  "Borås",
  "Eskilstuna",
];

const Faqs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Side Heading */}
          <div className="lg:col-span-2">
            <h2 className="text-5xl font-black mb-8 leading-tight">
              RENT A CAR<br />WORLDWIDE
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to SIXT rental cars! SIXT is one of the leading global car rental providers. 
              Whether you need to book a premium car, SUV, minibus, sports car, truck or any vehicle you want.
            </p>
          </div>

          {/* Right Side Locations */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {locations.map((location, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
                >
                  {location}
                </a>
              ))}
              <a
                href="#"
                className="text-blue-600 hover:underline font-semibold"
              >
                Alla orter i Sverige
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
