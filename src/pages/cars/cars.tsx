import React, { useState } from "react";
import Header from "../../components/LandingPage/Header";

const Cars = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with required props */}
      <Header  />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Our Cars
        </h1>
        <p className="text-lg md:text-xl text-gray-700 text-center mb-12">
          Explore our wide range of vehicles available for rent. From compact cars to luxury SUVs, we have something for everyone. Book online and enjoy a smooth and reliable car rental experience.
        </p>
      </main>
    </div>
  );
};

export default Cars;
