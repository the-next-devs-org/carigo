const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div>
            <div className="bg-orange-500 text-white px-4 py-2 font-bold text-xl mb-6 inline-block">
              Your Logo
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">SIXT services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Car rental
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Truck rental
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Bus for business
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Help & other</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Rental information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Environmental policy
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition duration-200"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition duration-200"
              >
                <span className="text-sm font-bold">ig</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition duration-200"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition duration-200"
              >
                <span className="text-sm font-bold">X</span>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </div>
                <span className="text-sm text-gray-400">App Store</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                  <span className="text-xs">▶</span>
                </div>
                <span className="text-sm text-gray-400">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition duration-200">
                Contact
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Rental information
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Company information
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Privacy and Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Terms
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Cookie settings
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Accessibility
              </a>
            </div>
            <div className="text-sm text-gray-400">© Sixt 2024</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
