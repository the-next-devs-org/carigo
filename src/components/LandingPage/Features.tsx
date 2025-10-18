import React from "react";
import {
  Car,
  Home,
  Shield,
  BatteryCharging,
  Gauge,
  AlertTriangle,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Gauge className="w-10 h-10 mx-auto mb-4" />,
      title: "Real-time Mileage",
      text: "Keep track of your trips and monitor distance driven easily.",
    },
    {
      icon: <Car className="w-10 h-10 mx-auto mb-4" />,
      title: "Unlimited Miles",
      text: "Drive as far as you want without worrying about mileage limits.",
    },
    {
      icon: <Shield className="w-10 h-10 mx-auto mb-4" />,
      title: "Insurance Coverage",
      text: "Enjoy additional protection and peace of mind while driving.",
    },
    {
      icon: <Home className="w-10 h-10 mx-auto mb-4" />,
      title: "Home Charging",
      text: "Conveniently charge your car at home whenever needed.",
    },
    {
      icon: <AlertTriangle className="w-10 h-10 mx-auto mb-4" />,
      title: "Accident Protection",
      text: "Get maximum coverage in case of unforeseen incidents.",
    },
    {
      icon: <BatteryCharging className="w-10 h-10 mx-auto mb-4" />,
      title: "Charging Management",
      text: "Use public charging stations across Europe with costs tracked and managed for you.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Enhance Your Ride with Smart Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center items-center mb-6 text-black">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
