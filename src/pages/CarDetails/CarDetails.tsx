interface Car {
    id: number;
    user_id: number;
    name: string;
    brand: string;
    category: string;
    year: number;
    color: string;
    registration_number: string;
    price_per_day: number;
    available: boolean;
    description: string;
    image: string;
    status: string;
    origin_market: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    image_url: string;
}
import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Zap, Navigation, Gauge } from "lucide-react";
import Header from "../../components/LandingPage/Header";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_ENDPOINT } from "../../api/config";


interface Car {
    id: number;
    user_id: number;
    name: string;
    brand: string;
    category: string;
    year: number;
    color: string;
    registration_number: string;
    price_per_day: number;
    available: boolean;
    description: string;
    image: string;
    status: string;
    origin_market: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    image_url: string;
}

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [relatedCars, setRelatedCars] = useState<Car[]>([]);
    useEffect(() => {
        if (id) {
            fetch(`${BACKEND_API_ENDPOINT}singlevehical/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.data) {
                        setCar(data.data);
                    }
                });
        }
    }, [id]);

    useEffect(() => {
        fetch(`${BACKEND_API_ENDPOINT}getAllVehicles`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.data)) {
                    // Filter out the current car from suggestions
                    setRelatedCars(
                        car
                            ? data.data.filter((c: Car) => c.id !== car.id)
                            : data.data
                    );
                }
            });
    }, [car]);

    const faqs = [
        "Vad är Tesla Model 3 och vad använder du bilen till?",
        "Vad innehåller Tesla Model 3?",
        "Vad skiljer mellan olika versioner av Tesla Model 3?",
    ];

    // relatedCars is now dynamic from API

    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    // ...existing code...
    return (
        <div className="min-h-screen bg-gray-50 bg-[#00786f]" >
            {/* Hero Section */}
            <div className="relative z-30">
                <Header />
            </div>

            {/* Add larger top margin to create clear gap below header */}
            <div className="bg-[#F2F2F7] text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-6">
                    {car ? (
                        <div className="grid grid-cols-2 gap-8 items-center">
                            {/* Left - Car Image */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={car.image_url}
                                    alt={car.name}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>

                            {/* Right - Car Info */}
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-black">{car.name}</h1>
                                <p className="text-xl   mb-6 text-black">{car.brand} {car.category}</p>

                                <div className="grid grid-cols-3 gap-4 mb-8 bg-teal-600 p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm text-teal-100">Model</p>
                                        <p className="font-semibold ">{car.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-100">Year</p>
                                        <p className="font-semibold">{car.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-100">Color</p>
                                        <p className="font-semibold">{car.color}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-100">Reg #</p>
                                        <p className="font-semibold">{car.registration_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-100">Status</p>
                                        <p className="font-semibold">{car.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-100">Market</p>
                                        <p className="font-semibold">{car.origin_market}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div>
                                        <p className="text-sm text-black ">Kampanjpris</p>
                                        <p className="text-3xl font-bold text-black">Fr {car.price_per_day} kr/dag</p>
                                        <p className="text-sm text-black">{car.description}</p>
                                    </div>
                                    <button className="ml-auto bg-[#0B153C] text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2">
                                        Boka bil <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">Loading...</div>
                    )}
                </div>
            </div>

            {/* Specs Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <button className="pb-4 font-semibold text-[#0B153C] border-b-2 border-[#0B153C]">
                        Prestandadata
                    </button>
                    <button className="pb-4 text-gray-600">Designval</button>
                    <button className="pb-4 text-gray-600">Display</button>
                    <button className="pb-4 text-gray-600">Säkerhet Mode</button>
                </div>

                {/* Performance Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Zap className="text-[#0B153C]" size={24} />
                        <div>
                            <p className="text-sm text-gray-600">Brand</p>
                            <p className="font-semibold">{car ? car.brand : ""}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Gauge className="text-[#0B153C]" size={24} />
                        <div>
                            <p className="text-sm text-gray-600">Year</p>
                            <p className="font-semibold">{car ? car.year : ""}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Navigation className="text-[#0B153C]" size={24} />
                        <div>
                            <p className="text-sm text-gray-600">Category</p>
                            <p className="font-semibold">{car ? car.category : ""}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Zap className="text-[#0B153C]" size={24} />
                        <div>
                            <p className="text-sm text-gray-600">Color</p>
                            <p className="font-semibold">{car ? car.color : ""}</p>
                        </div>
                    </div>
                </div>

                <button className="border border-[#0B153C] text-[#0B153C] px-4 py-2 rounded-full font-semibold">
                    Visa fler egenskaper +
                </button>
            </div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-8">
                    Vanliga frågor och svar om {car ? car.name : "Bilen"}
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setExpandedFAQ(expandedFAQ === index ? null : index)
                                }
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                            >
                                <span className="font-semibold text-gray-900">{faq}</span>
                                {expandedFAQ === index ? (
                                    <ChevronUp className="text-gray-400" />
                                ) : (
                                    <ChevronDown className="text-gray-400" />
                                )}
                            </button>
                            {expandedFAQ === index && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700">
                                    Detailed answer about {faq}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button className="mt-6 border border-[#0B153C] text-[#0B153C] px-4 py-2 rounded-full font-semibold">
                    Visa fler frågor och svar
                </button>
            </div>

            {/* Related Cars Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-8">Liknande bilar</h2>

                <div className="flex gap-6 items-end">
                    {relatedCars.map((relCar) => (
                        <div key={relCar.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 flex-1">
                            <div className="bg-gray-100 h-40 flex items-center justify-center overflow-hidden">
                                <img
                                    src={relCar.image_url}
                                    alt={relCar.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600">{relCar.name}</p>
                                <h3 className="font-semibold text-gray-900 mb-3">{relCar.brand} {relCar.category}</h3>
                                <p className="text-red-500 font-bold mb-3">Fr {relCar.price_per_day} kr/dag</p>
                                <div className="flex gap-2">
                                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {relCar.status}
                                    </span>
                                    <button className="ml-auto text-[#0B153C] hover:text-teal-800">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col items-center justify-center text-[#0B153C] font-semibold gap-2 flex-1">
                        <Link to="/show-cars" className="flex flex-col items-center justify-center">
                            <ArrowRight size={24} />
                            <span className="text-sm">Visa alla bilar</span>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;