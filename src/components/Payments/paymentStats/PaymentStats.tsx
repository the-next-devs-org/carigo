import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  PaymentTotalIcon,
  PaymentAverageIcon,
  PaymentStatusIcon,
} from "../../utils/Icons";

interface Payment {
  id: number;
  total_amount: number;
  status?: string;
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

const PaymentStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalPayment: { count: 0, label: "Payments" },
    averagePayment: { amount: 0, label: "kr" },
    paymentStatus: { successful: 0, pending: 0, failed: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("payments/getAllPayments");
        if (response.data && response.data.success) {
          const payments: Payment[] = response.data.data;
          const totalCount = payments.length;
          const totalAmount = payments.reduce(
            (sum, p) => sum + p.total_amount,
            0
          );
          const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;
          const successfulCount = payments.filter((p) =>
            p.status ? p.status.toLowerCase() === "completed" : true
          ).length;

          setStats({
            totalPayment: { count: totalCount, label: "Payments" },
            averagePayment: {
              amount: Math.round(averageAmount),
              label: "kr",
            },
            paymentStatus: {
              successful: successfulCount,
              pending: 0,
              failed: 0,
            },
          });
        } else {
          setError(response.data?.message || "Failed to fetch payment stats.");
        }
      } catch (err) {
        setError("An error occurred while fetching payment stats.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStats();
  }, []);

  const getStatCards = () => {
    if (error) {
      return [
        {
          title: "Total Payment",
          value: "00",
          subtitle: "Payments",
          color: "text-blue-600",
          icon: <PaymentTotalIcon />,
        },
        {
          title: "Average Payment",
          value: "00",
          subtitle: "kr",
          color: "text-green-600",
          icon: <PaymentAverageIcon />,
        },
        {
          title: "Payment Status",
          value: "00",
          subtitle: "Successful",
          color: "text-purple-600",
          icon: <PaymentStatusIcon />,
        },
      ];
    }

    return [
      {
        title: "Total Payment",
        value: stats.totalPayment.count.toString().padStart(2, "0"),
        subtitle: stats.totalPayment.label,
        color: "text-blue-600",
        icon: <PaymentTotalIcon />,
      },
      {
        title: "Average Payment",
        value: stats.averagePayment.amount.toString().padStart(2, "0"),
        subtitle: stats.averagePayment.label,
        color: "text-green-600",
        icon: <PaymentAverageIcon />,
      },
      {
        title: "Payment Status",
        value: stats.paymentStatus.successful.toString().padStart(2, "0"),
        subtitle: "Successful",
        color: "text-purple-600",
        icon: <PaymentStatusIcon />,
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {getStatCards().map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default PaymentStats;
