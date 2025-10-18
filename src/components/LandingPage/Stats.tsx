
const Stats = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug text-gray-900">
            Join 10k+ happy drivers <br /> enjoying our car rentals worldwide
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="relative rounded-xl overflow-hidden h-80 flex items-end p-6 text-white"
            style={{
              backgroundImage: "url('/stats1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold">98%</h3>
              <p className="text-lg font-medium">Konverteringsfrekvens</p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="relative rounded-xl overflow-hidden h-80 flex items-end p-6 text-white"
            style={{
              backgroundImage: "url('/stats1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold">20 sekunder</h3>
              <p className="text-lg font-medium">Genomsnittlig betalningstid</p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="relative rounded-xl overflow-hidden h-80 flex items-end p-6 text-white"
            style={{
              backgroundImage: "url('/stats1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold">100%</h3>
              <p className="text-lg font-medium">Omedelbar avräkning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
