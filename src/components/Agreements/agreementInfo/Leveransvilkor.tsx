export default function Leveransvilkor({ agreementData }: any) {
  return (
    <div className="mt-3 overflow-x-auto">
      <p>Leveransvilkor</p>
      <div>
        <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-[1px] pb-1.5 text-[9px]">
                Leveransdag
                <p>{agreementData.deliveryDate || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-3 py-[1px] pb-1.5 text-[9px]">
                Leveransort
                <p>{agreementData.deliveryLocation || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-3 py-[1px] pb-1.5 text-[9px]">
                Leveransvilkor <p>{agreementData.deliveryTerms || "N/A"}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
