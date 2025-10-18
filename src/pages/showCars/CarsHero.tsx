import { useState } from "react";
import Header from "../../components/LandingPage/Header";

const CarsHero = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50">
            <section
                className="relative h-[95vh] bg-cover bg-center flex flex-col justify-center"
                style={{ backgroundImage: "url('/carsPage.png')" }}
            >
                {/* text content (centered vertically) */}
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-xl">
                        Hyr din lösning hos oss
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 drop-shadow-sm">
                        Boka snabbt. Kör säkert. Alltid utan dolda avgifter.
                    </p>
                </div>

                {/* bottom-left card */}
                <div className="absolute bottom-8 left-30 bg-white rounded-[24px] p-6 max-w-sm shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Our fleet of electric car models
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Explore electric cars from top brands like Tesla, KIA and Volkswagen. Taxes, insurance, service, and tire changes are always included. Ready for pick-up within 48 hours.
                    </p>
                </div>

                {/* booking form (bottom) */}

            </section>
        </div>
    );
};

export default CarsHero;
