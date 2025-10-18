import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

const DualRangeSlider: React.FC<{
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
}> = ({ min, max, minValue, maxValue, onMinChange, onMaxChange }) => {
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="relative w-full pt-2 pb-2">
      <div className="relative h-2 bg-gray-300 rounded-lg">
        <div
          className="absolute h-2 bg-[#0B153C] rounded-lg"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={(e) => {
          const newMin = parseInt(e.target.value);
          if (newMin <= maxValue) {
            onMinChange(newMin);
          }
        }}
        className="absolute w-full top-0 h-2 appearance-none bg-transparent rounded-lg cursor-pointer pointer-events-none"
        style={{
          zIndex: minValue > max - (max - min) / 2 ? 5 : 3,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={(e) => {
          const newMax = parseInt(e.target.value);
          if (newMax >= minValue) {
            onMaxChange(newMax);
          }
        }}
        className="absolute w-full top-0 h-2 appearance-none bg-transparent rounded-lg cursor-pointer pointer-events-none"
        style={{
          zIndex: 4,
        }}
      />

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0B153C;
          cursor: pointer;
          pointer-events: auto;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          margin-top: 12px;
        }

        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0B153C;
          cursor: pointer;
          pointer-events: auto;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
};

const Cars: React.FC = () => {
  const [carsData, setCarsData] = useState<Car[]>([]);
  useEffect(() => {
    fetch("http://localhost:3002/api/getAllVehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setCarsData(data.data);
        }
      });
  }, []);

  const [priceMin, setPriceMin] = useState(5990);
  const [priceMax, setPriceMax] = useState(24990);
  const [rangeMin, setRangeMin] = useState(427);
  const [rangeMax, setRangeMax] = useState(920);

  const filteredCars = useMemo(() => {
    return carsData.filter(
      (car) =>
        car.price_per_day >= priceMin &&
        car.price_per_day <= priceMax
    );
  }, [carsData, priceMin, priceMax]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* LEFT SIDEBAR - FILTERS */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Månadskostnad
                  </label>
                  <span className="text-xs text-gray-500">kr</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="mb-4 text-sm font-semibold text-gray-900">
                    {priceMin} - {priceMax}
                  </div>
                  <DualRangeSlider
                    min={5990}
                    max={24990}
                    minValue={priceMin}
                    maxValue={priceMax}
                    onMinChange={setPriceMin}
                    onMaxChange={setPriceMax}
                  />
                </div>
              </div>

              {/* Range Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Räckvidd
                  </label>
                  <span className="text-xs text-gray-500">km</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="mb-4 text-sm font-semibold text-gray-900">
                    {rangeMin} - {rangeMax}
                  </div>
                  <DualRangeSlider
                    min={427}
                    max={920}
                    minValue={rangeMin}
                    maxValue={rangeMax}
                    onMinChange={setRangeMin}
                    onMaxChange={setRangeMax}
                  />
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-3">
                  Sortera efter
                </label>
                <div className="bg-white border border-gray-200 rounded-lg">
                  <button className="w-full px-4 py-3 flex items-center justify-between text-left text-gray-700 hover:bg-gray-50">
                    <span className="text-sm">Popularitet</span>
                    <ChevronDown size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-3">
                  Märke
                </label>
                <div className="bg-white border border-gray-200 rounded-lg">
                  <button className="w-full px-4 py-3 flex items-center justify-between text-left text-gray-700 hover:bg-gray-50">
                    <span className="text-sm">Alla märken</span>
                    <ChevronDown size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CAR GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Car Image */}
                  <div className="bg-gray-100 h-40 overflow-hidden flex items-center justify-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Car Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {car.name}
                    </h3>
                    <p className="text-red-500 font-bold text-base mb-3">
                      Fr {car.price_per_day} kr/dag
                    </p>

                    {/* Tags and Arrow */}
                    <div className="flex gap-2 items-center flex-wrap">
                      <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {car.brand}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {car.category}
                      </span>
                      <Link
                        to={`/car/${car.id}`}
                        className="ml-auto text-teal-700 hover:text-teal-800 transition"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;