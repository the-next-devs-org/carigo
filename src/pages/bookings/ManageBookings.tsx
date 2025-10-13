import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const ManageBookings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-black py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">S</span>
            <span className="text-orange-500">i</span>
            <span className="text-white">XT</span>
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow px-4 py-12 flex flex-col items-center text-center">
        <Car className="h-12 w-12 text-orange-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Manage My Bookings
        </h1>
        <p className="text-gray-600 max-w-lg mb-8">
          Here you can view, update, or cancel your bookings.  
          Please log in to access your reservation details.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
        >
          Log in to continue
        </Link>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 text-center text-sm">
        © Sixt 2025 – All rights reserved.
      </footer>
    </div>
  );
};

export default ManageBookings;
    