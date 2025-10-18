import { useRecentPayments } from "../../../hooks/useRecentUsers";

const RecentPayments = () => {
  const { payments, loading, error } = useRecentPayments();

  return (
    <div className="bg-white rounded-[20px] p-6 dashboard-cards">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#000814] font-plus-jakarta">
          Inkommande förfrågningar
        </h2>
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => {
                const paymentDate = new Date(
                  payment.createdAt
                ).toLocaleDateString();

                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-[#000814] font-plus-jakarta">
                        {payment.customer_name}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-[#5E636B] font-plus-jakarta">
                        ${payment.total_amount}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-plus-jakarta ${
                          payment.payment_category === "PENDING"
                            ? "bg-[#FEF3F2] text-[#B42318]"
                            : "bg-[#ECFDF3] text-[#027A48]"
                        }`}
                      >
                        {payment.payment_category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-[#5E636B] font-plus-jakarta">
                        {paymentDate}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayments;
