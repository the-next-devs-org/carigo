import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  PurchasingAgreementIcon,
  SalesAgreementIcon,
  BrokerageAgreementIcon,
} from "../../utils/Icons";

interface Customer {
  id: number;
  type: string;
  status: string;
  totalSpent: number;
}

interface StatCardProps {
  title: string;
  value: string;
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
            className="text-[32px] font-bold font-plus-jakarta text-[#000814] -mb-2"
            title={value}
          >
            {value.length > 5 ? `${value.slice(0, 7)}...` : value}
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

const CustomerStats = () => {
  const [stats, setStats] = useState({
    totalPurchasingCustomers: 0,
    totalSalesCustomers: 0,
    totalBrokerageClients: 0,
    totalSpentPurchasing: 0,
    totalSpentSales: 0,
    totalSpentBrokerage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("customer/getAllCustomers");
        if (response.data && response.data.success) {
          const { data } = response.data;
          const customers: Customer[] = data || [];

          const purchasingCustomers = customers;
          const salesCustomers = customers.filter((c) => c.type === "Client");
          const brokerageClients = customers.filter((c) => c.type === "Agency");

          setStats({
            totalPurchasingCustomers: purchasingCustomers.length,
            totalSalesCustomers: salesCustomers.length,
            totalBrokerageClients: brokerageClients.length,
            totalSpentPurchasing: purchasingCustomers.reduce(
              (sum, c) => sum + c.totalSpent,
              0
            ),
            totalSpentSales: salesCustomers.reduce(
              (sum, c) => sum + c.totalSpent,
              0
            ),
            totalSpentBrokerage: brokerageClients.reduce(
              (sum, c) => sum + c.totalSpent,
              0
            ),
          });
        } else {
          setError(response.data?.message || "Failed to fetch customer stats.");
        }
      } catch (err) {
        setError("An error occurred while fetching customer stats.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerStats();
  }, []);

  const getStatCards = () => {
    if (error) {
      return [
        {
          title: "Total Purchasing Customers",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-green-600",
          icon: <PurchasingAgreementIcon />,
        },
        {
          title: "Total Sales Customers",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-blue-600",
          icon: <SalesAgreementIcon />,
        },
        {
          title: "Total Brokerage Clients",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-purple-600",
          icon: <BrokerageAgreementIcon />,
        },
      ];
    }

    return [
      {
        title: "Total Purchasing Customers",
        value: stats.totalPurchasingCustomers.toString().padStart(2, "0"),
        subtitle: `${stats.totalSpentPurchasing.toLocaleString()} kr spent`,
        color: "text-green-600",
        icon: <PurchasingAgreementIcon />,
      },
      {
        title: "Total Sales Customers",
        value: stats.totalSalesCustomers.toString().padStart(2, "0"),
        subtitle: `${stats.totalSpentSales.toLocaleString()} kr spent`,
        color: "text-blue-600",
        icon: <SalesAgreementIcon />,
      },
      {
        title: "Total Brokerage Clients",
        value: stats.totalBrokerageClients.toString().padStart(2, "0"),
        subtitle: `${stats.totalSpentBrokerage.toLocaleString()} kr spent`,
        color: "text-purple-600",
        icon: <BrokerageAgreementIcon />,
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
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
    <div className="max-w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {getStatCards().map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CustomerStats;
