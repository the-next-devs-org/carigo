import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../../api/Api";
import {
  VehicleTotalIcon,
  VehicleSoldIcon,
  VehicleAvgDaysIcon,
} from "../../../../components/utils/Icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => (
  <div className="bg-white rounded-[20px] p-2 pl-4 dashboard-cards">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#5E636B] font-plus-jakarta mt-1">
          {title}
        </p>
        <div className="flex items-end gap-2 mb-1">
          <p
            className={`text-[32px] font-bold font-plus-jakarta text-[#000814] -mb-2`}
          >
            {value}
          </p>
          <p className="text-[12px] font-medium font-plus-jakarta text-[#012F7A]">
            {subtitle}
          </p>
        </div>
      </div>
      <div
        className={`p-3 rounded-lg ${
          color === "text-blue-600"
            ? "bg-blue-50"
            : color === "text-green-600"
            ? "bg-green-50"
            : color === "text-purple-600"
            ? "bg-purple-50"
            : "bg-gray-50"
        }`}
      >
        {icon}
      </div>
    </div>
  </div>
);

interface Vehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
  model: string;
  type: string;
  status: string;
  year: number;
  daysInStock?: number;
}

const VehiclesStats = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("vehicles/getAllVehicles");
        if (response.data && response.data.success) {
          setVehicles(response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch vehicles.");
        }
      } catch (err) {
        setError("An error occurred while fetching vehicles.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Calculate stats from vehicles data
  const calculateStats = () => {
    const totalVehicles = vehicles.length;
    const vehiclesSold = vehicles.filter(
      (v) =>
        v.status &&
        (v.status.toLowerCase() === "sold" ||
          v.status.toLowerCase() === "sold out")
    ).length;

    const availableVehicles = vehicles.filter(
      (v) =>
        v.status &&
        (v.status.toLowerCase() === "available" ||
          v.status.toLowerCase() === "in stock")
    );

    const totalDaysInStock = availableVehicles.reduce(
      (sum, v) => sum + (v.daysInStock || 0),
      0
    );

    const averageInventoryDays =
      availableVehicles.length > 0
        ? Math.round(totalDaysInStock / availableVehicles.length)
        : 0;

    return {
      totalVehicles,
      vehiclesSold,
      averageInventoryDays,
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: "Total Vehicles",
      value: stats.totalVehicles.toString().padStart(2, "0"),
      subtitle: "Vehicles",
      color: "text-green-600",
      icon: <VehicleTotalIcon />,
    },
    {
      title: "Vehicles Sold",
      value: stats.vehiclesSold.toString().padStart(2, "0"),
      subtitle: "Vehicles",
      color: "text-blue-600",
      icon: <VehicleSoldIcon />,
    },
    {
      title: "Average Inventory Days",
      value: stats.averageInventoryDays.toString().padStart(2, "0"),
      subtitle: "Days",
      color: "text-purple-600",
      icon: <VehicleAvgDaysIcon />,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-[20px] p-2 pl-4 dashboard-cards animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="p-3 rounded-lg bg-gray-200 w-12 h-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-center">
            Error loading vehicle statistics: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default VehiclesStats;
