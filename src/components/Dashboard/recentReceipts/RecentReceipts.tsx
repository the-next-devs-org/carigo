import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetRequest } from "../../../api/Api";

interface Invoice {
  id: string;
  invoiceNumber: string;
  receiptNumber: string;
  agreementID: string;
  amount: number;
  updatedAt: string;
  orgNumber: string;
}

const RecentReceipts = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("invoices/getAllInvoices");
        if (response.data && response.data.success) {
          const sortedInvoices = response.data.invoices
            .sort(
              (a: Invoice, b: Invoice) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 5);
          setInvoices(sortedInvoices);
        } else {
          setError(response.data?.message || "Failed to fetch receipts");
        }
      } catch (err) {
        setError("An error occurred while fetching receipts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 dashboard-cards">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#000814] font-plus-jakarta">
          Recent Receipts
        </h2>
        <button
          className="text-[#FF8B1F] text-sm font-semibold font-plus-jakarta hover:text-[#e67b15] border-b border-[#FF8B1F] cursor-pointer"
          onClick={() => navigate("/invoices")}
        >
          See More
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F0F7FF] rounded-lg text-left">
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-l-lg">
                Receipt ID
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Organization Number
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Amount
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-r-lg">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No receipts found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-[#000814] font-plus-jakarta">
                      {invoice.receiptNumber || invoice.invoiceNumber || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {invoice.orgNumber || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      SEK {invoice.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {new Date(invoice.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReceipts;
