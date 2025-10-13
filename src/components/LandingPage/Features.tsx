const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-black mb-16">MORE FROM SIXT</h2>

        <div className="max-w-sm mx-auto">
          <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
            {/* Content */}
            <div className="p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">SIXT BUSINESS</h3>
              <p className="mb-8 text-gray-300">
                Become a corporate customer at SIXT
              </p>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition duration-300 font-semibold">
                Request log in
              </button>
            </div>

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://img.sixt.com/400/81451aba-068f-4d67-984f-a215847520f9.jpg"
                alt="Business man with car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
