import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  InvoiceTotalIcon,
  InvoiceOutstandingIcon,
  InvoicePaidIcon,
} from "../../utils/Icons";

interface Invoice {
  id: number;
  amount: number;
  status: string;
  net?: number;
  moms?: number;
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

const InvoiceStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalInvoiced: { count: 0, amount: 0, label: "Total Invoices" },
    outstandingPayments: { amount: 0, count: 0, label: "Outstanding" },
    paidInvoices: { amount: 0, count: 0, label: "Paid Invoices" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoiceStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("invoices/getAllInvoices");
        if (response.data && response.data.success) {
          const invoices: Invoice[] = response.data.invoices;
          const totalCount = invoices.length;
          const totalAmount = invoices.reduce(
            (sum, inv) => sum + inv.amount,
            0
          );

          const paidInvoices = invoices.filter((inv) => inv.status === "Paid");
          const outstandingInvoices = invoices.filter(
            (inv) => inv.status === "Pending" || inv.status === "Overdue"
          );

          const paidAmount = paidInvoices.reduce(
            (sum, inv) => sum + inv.amount,
            0
          );
          const outstandingAmount = outstandingInvoices.reduce(
            (sum, inv) => sum + inv.amount,
            0
          );

          setStats({
            totalInvoiced: {
              count: totalCount,
              amount: totalAmount,
              label: "Total Invoices",
            },
            outstandingPayments: {
              amount: outstandingAmount,
              count: outstandingInvoices.length,
              label: "Outstanding",
            },
            paidInvoices: {
              amount: paidAmount,
              count: paidInvoices.length,
              label: "Paid Invoices",
            },
          });
        } else {
          setError(response.data?.message || "Failed to fetch invoice stats.");
        }
      } catch (err) {
        setError("An error occurred while fetching invoice stats.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceStats();
  }, []);

  const getStatCards = () => {
    if (error) {
      return [
        {
          title: "Total Invoiced",
          value: "00",
          subtitle: "0 kr",
          color: "text-blue-600",
          icon: <InvoiceTotalIcon />,
        },
        {
          title: "Outstanding Payments",
          value: "00",
          subtitle: "0 kr",
          color: "text-green-600",
          icon: <InvoiceOutstandingIcon />,
        },
        {
          title: "Paid Invoices",
          value: "00",
          subtitle: "0 kr",
          color: "text-purple-600",
          icon: <InvoicePaidIcon />,
        },
      ];
    }

    return [
      {
        title: "Total Invoiced",
        value: stats.totalInvoiced.count.toString().padStart(2, "0"),
        subtitle: `${stats.totalInvoiced.amount.toLocaleString()} kr`,
        color: "text-blue-600",
        icon: <InvoiceTotalIcon />,
      },
      {
        title: "Outstanding Payments",
        value: stats.outstandingPayments.count.toString().padStart(2, "0"),
        subtitle: `${stats.outstandingPayments.amount.toLocaleString()} kr`,
        color: "text-green-600",
        icon: <InvoiceOutstandingIcon />,
      },
      {
        title: "Paid Invoices",
        value: stats.paidInvoices.count.toString().padStart(2, "0"),
        subtitle: `${stats.paidInvoices.amount.toLocaleString()} kr`,
        color: "text-purple-600",
        icon: <InvoicePaidIcon />,
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

export default InvoiceStats;
