import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetRequest } from "../../../api/Api";

interface Agreement {
  id: number;
  registrationNumber: string;
  name: string;
  purchaseDate: string;
  updatedAt: string;
  creditMarking: string;
}

const RecentAgreements = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentAgreements = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await makeGetRequest("agreements/getAllAgreements");

        if (response.data?.success) {
          const recentAgreements = response.data.data
            .sort(
              (a: Agreement, b: Agreement) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 5);

          setAgreements(recentAgreements);
        } else {
          throw new Error(
            response.data?.message || "Failed to fetch agreements"
          );
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching agreements");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAgreements();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-[20px] p-6 dashboard-cards">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#000814] font-plus-jakarta">
          Uthyrda fordon
        </h2>
        {/* <button
          className="text-[#FF8B1F] text-sm font-semibold font-plus-jakarta hover:text-[#e67b15] border-b border-[#FF8B1F] cursor-pointer"
          onClick={() => navigate("/agreements")}
        >
          See More
        </button> */}
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F0F7FF] rounded-lg text-left">
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-l-lg">
                Reg nr
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Kund
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta">
                Upphämtningsdatum
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#5E636B] font-plus-jakarta rounded-r-lg">
                Återlämningsdatum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : agreements.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No agreements found
                </td>
              </tr>
            ) : (
              agreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-[#000814] font-plus-jakarta">
                      {agreement.registrationNumber || `AG-${agreement.id}`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {agreement.name || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {agreement.registrationNumber || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#5E636B] font-plus-jakarta">
                      {formatDate(agreement.updatedAt)}
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

export default RecentAgreements;
