import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";
import Cars from "../../components/LandingPage/Cars";
import CarsHero from "./CarsHero";

const ShowCars = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <CarsHero />
            <Cars />
            <Footer />
        </div>
    );
};

export default ShowCars;
