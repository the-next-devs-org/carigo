import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  UsersIcon,
  VehiclesIcon,
  RevenueIcon,
  AgreementsIcon,
} from "../../../components/utils/Icons";

interface Vehicle {
  status: string;
}

interface Payment {
  total_amount: number;
  createdAt: string;
}

interface User {
  id: number;
  is_active: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  error?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  error = false,
}) => (
  <div
    className={`bg-white rounded-[20px] p-2 pl-4 dashboard-cards flex items-center ${
      error ? "border border-red-200" : ""
    }`}
  >
    <div className="w-full flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#5E636B] font-plus-jakarta mt-1">
          {title}
        </p>
        {error ? (
          <p className="text-red-500 text-sm mt-1">Failed to load</p>
        ) : (
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
        )}
      </div>
      <div
        className={`p-3 rounded-lg ${
          error
            ? "bg-red-50"
            : color === "text-blue-600"
            ? "bg-blue-50"
            : color === "text-green-600"
            ? "bg-green-50"
            : color === "text-purple-600"
            ? "bg-purple-50"
            : "bg-gray-50"
        }`}
      >
        {error ? <UsersIcon className="w-6 h-6 text-red-500" /> : icon}
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Users",
      value: "0",
      subtitle: "0% Active",
      color: "text-blue-600",
      icon: <UsersIcon className="w-6 h-6 text-blue-600" />,
      loading: true,
      error: false,
      key: "users",
    },
    {
      title: "Total Vehicles",
      value: "0",
      subtitle: "0% Active",
      color: "text-green-600",
      icon: <VehiclesIcon className="w-6 h-6 text-green-600" />,
      loading: true,
      error: false,
      key: "vehicles",
    },
    {
      title: "Total Revenue",
      value: "0",
      subtitle: "(kr) This Month",
      color: "text-purple-600",
      icon: <RevenueIcon className="w-6 h-6 text-purple-600" />,
      loading: true,
      error: false,
      key: "revenue",
    },
    {
      title: "Pending Agreements",
      value: "0",
      subtitle: "Awaiting Action",
      color: "text-gray-600",
      icon: <AgreementsIcon className="w-6 h-6 text-gray-600" />,
      loading: true,
      error: false,
      key: "agreements",
    },
  ]);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [overallError, setOverallError] = useState<string | null>(null);

  console.log("overallError", overallError);

  console.log("setOverallError", setOverallError);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, vehiclesRes, paymentsRes, agreementsRes] =
          await Promise.allSettled([
            makeGetRequest("user/getRecentUsers"),
            makeGetRequest("vehicles/getAllVehicles"),
            makeGetRequest("payments/getAllPayments"),
            makeGetRequest("banksign/getallagreementstatus"),
          ]);

        if (usersRes.status === "fulfilled" && usersRes.value.data?.success) {
          const users: User[] = usersRes.value.data.data || [];
          const totalUsers = users.length;
          const activeUsers = users.filter((u) => u.is_active).length;
          const activePercentage =
            totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "users"
                ? {
                    ...stat,
                    value: totalUsers.toString(),
                    subtitle: `${activePercentage}% Active`,
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "users"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        if (
          vehiclesRes.status === "fulfilled" &&
          vehiclesRes.value.data?.success
        ) {
          const vehicles: Vehicle[] = vehiclesRes.value.data.data;
          const totalVehicles = vehicles.length;
          const availableVehicles = vehicles.filter(
            (v) => v.status === "Available"
          ).length;
          const activePercentage =
            totalVehicles > 0
              ? Math.round((availableVehicles / totalVehicles) * 100)
              : 0;

          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "vehicles"
                ? {
                    ...stat,
                    value: totalVehicles.toString(),
                    subtitle: `${activePercentage}% Active`,
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "vehicles"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        if (
          paymentsRes.status === "fulfilled" &&
          paymentsRes.value.data?.success
        ) {
          const payments: Payment[] = paymentsRes.value.data.data;
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          const monthlyTotal = payments
            .filter((p) => {
              const paymentDate = new Date(p.createdAt);
              return (
                paymentDate.getMonth() === currentMonth &&
                paymentDate.getFullYear() === currentYear
              );
            })
            .reduce((sum, p) => sum + p.total_amount, 0);

          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "revenue"
                ? {
                    ...stat,
                    value: `${Math.round(monthlyTotal).toLocaleString()}`,
                    subtitle: "(kr) This Month",
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "revenue"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        if (agreementsRes.status === "fulfilled") {
          const pendingAgreements =
            agreementsRes.value.data.grouped.pending.length;

          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "agreements"
                ? {
                    ...stat,
                    value: pendingAgreements.toString(),
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((prev) =>
            prev.map((stat) =>
              stat.key === "agreements"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }
      } catch (err) {
        console.error("Error in dashboard stats:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-[20px] p-6 dashboard-cards animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.error ? "-" : stat.value}
          subtitle={stat.error ? "" : stat.subtitle}
          icon={stat.icon}
          color={stat.color}
          error={stat.error}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
