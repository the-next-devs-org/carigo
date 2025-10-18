import { Link } from "react-router-dom";
import { Car } from "lucide-react";

import Header from "../../components/LandingPage/Header";

const ManageBookings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER */}
      <Header />


      {/* MAIN */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-12 mt-24">

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
        © Carigo 2025 – All rights reserved.
      </footer>
    </div>
  );
};

export default ManageBookings;
    