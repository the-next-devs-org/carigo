import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  PurchasingAgreementIcon,
  SalesAgreementIcon,
  BrokerageAgreementIcon,
} from "../../utils/Icons";

interface Agreement {
  id: number;
  type: string;
  purchasePrice?: number;
  salesPrice?: number;
  status: string;
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

const AgreementStats = () => {
  const [stats, setStats] = useState({
    totalPurchasingAgreement: {
      count: 0,
      amount: 0,
      label: "Inköpta fordon",
    },
    totalSalesAgreement: { count: 0, amount: 0, label: "Sålda fordon" },
    totalBrokerageAgreement: {
      count: 0,
      amount: 0,
      label: "Förmedlade fordon",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgreementStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("agreements/getAllAgreements");
        if (response.data && response.data.success) {
          const agreements: Agreement[] = response.data.data;

          const purchasingAgreements = agreements.filter(
            (agreement) => agreement.type === "Purchase Agreement"
          );
          const salesAgreements = agreements.filter(
            (agreement) => agreement.type === "Sales Agreement"
          );
          const brokerageAgreements = agreements.filter(
            (agreement) => agreement.type === "Agency Agreement"
          );

          const purchasingAmount = purchasingAgreements.reduce(
            (sum, agreement) => sum + (agreement.purchasePrice || 0),
            0
          );
          const salesAmount = salesAgreements.reduce(
            (sum, agreement) => sum + (agreement.salesPrice || 0),
            0
          );
          const brokerageAmount = brokerageAgreements.reduce(
            (sum, agreement) => sum + (agreement.salesPrice || 0),
            0
          );

          setStats({
            totalPurchasingAgreement: {
              count: purchasingAgreements.length,
              amount: purchasingAmount,
              label: "Inköpta fordon",
            },
            totalSalesAgreement: {
              count: salesAgreements.length,
              amount: salesAmount,
              label: "Sålda fordon",
            },
            totalBrokerageAgreement: {
              count: brokerageAgreements.length,
              amount: brokerageAmount,
              label: "Förmedlade fordon",
            },
          });
        } else {
          setError(
            response.data?.message || "Misslyckades med att hämta avtalsstatistik."
          );
        }
      } catch (err) {
        setError("Ett fel uppstod vid hämtning av avtalsstatistik.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgreementStats();
  }, []);

  const getStatCards = () => {
    if (error) {
      return [
        {
          title: "Totalt inköpsavtal",
          value: "00",
          subtitle: "0 kr",
          color: "text-green-600",
          icon: <PurchasingAgreementIcon />,
        },
        {
          title: "Totalt försäljningsavtal",
          value: "00",
          subtitle: "0 kr",
          color: "text-blue-600",
          icon: <SalesAgreementIcon />,
        },
        {
          title: "Totalt förmedlingsavtal",
          value: "00",
          subtitle: "0 kr",
          color: "text-purple-600",
          icon: <BrokerageAgreementIcon />,
        },
      ];
    }

    return [
      {
        title: "Totalt inköpsavtal",
        value: stats.totalPurchasingAgreement.count.toString().padStart(2, "0"),
        subtitle: `${stats.totalPurchasingAgreement.amount.toLocaleString()} kr`,
        color: "text-green-600",
        icon: <PurchasingAgreementIcon />,
      },
      {
        title: "Totalt försäljningsavtal",
        value: stats.totalSalesAgreement.count.toString().padStart(2, "0"),
        subtitle: `${stats.totalSalesAgreement.amount.toLocaleString()} kr`,
        color: "text-blue-600",
        icon: <SalesAgreementIcon />,
      },
      {
        title: "Totalt förmedlingsavtal",
        value: stats.totalBrokerageAgreement.count.toString().padStart(2, "0"),
        subtitle: `${stats.totalBrokerageAgreement.amount.toLocaleString()} kr`,
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {getStatCards().map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default AgreementStats;
