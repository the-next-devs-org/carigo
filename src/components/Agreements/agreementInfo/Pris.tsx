export default function Pris({ agreementData }: any) {
  return (
    <div className="mt-3 overflow-x-auto">
      <p>Pris- och betalningsinformation</p>
      <div>
        <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
          <tbody className="grid grid-cols-4">
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Kreditgivare</p>
                  <p>{agreementData.creditor || "N/A"}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Kreditmarkering</p>
                  <p>{agreementData.creditMarking || "N/A"}</p>
                </>
              ) : (
                <>
                  <p>Kreditmarkering</p>
                  <p>{agreementData.creditMarking || "N/A"}</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Kreditbelopp</p>
                  <p>{agreementData.creditAmount || "N/A"}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Kreditgivare</p>
                  <p>{agreementData.creditor || "N/A"}</p>
                </>
              ) : (
                <>
                  <p>Kreditgivare</p>
                  <p>{agreementData.creditor || "N/A"}</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>kontantinsats</p>
                  <p>{agreementData.cashStack || "N/A"}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Kreditskuld</p>
                  <p>{agreementData.creditAmount || "N/A"}</p>
                </>
              ) : (
                <>
                  <p>Kreditskuld</p>
                  <p>{agreementData.creditAmount || "N/A"}</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>lånetid</p>
                  <p>{agreementData.loanPeriod}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Inlösendatum</p>
                  <p>{agreementData.settlementDate}</p>
                </>
              ) : (
                <>
                  <p>Inlösendatum</p>
                  <p>{agreementData.settlementDate}</p>
                </>
              )}
            </tr>
          </tbody>
          <tbody className="grid grid-cols-4">
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Inbytespris</p>
                  <p>{agreementData.tradeInPurchasePrice}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Moms</p>
                  <p>N/A</p>
                </>
              ) : (
                <>
                  <p>Commision amount </p>
                  <p>{agreementData.commissionAmount}</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>inbytesfordon kreditgivare</p>
                  <p>N/A</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Betaldatum</p>
                  <p>{agreementData.payoutDate}</p>
                </>
              ) : (
                <>
                  <p>Agency costs</p>
                  <p>{agreementData.agencyFee}</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>inbytesfordon restskuld</p>
                  <p>{agreementData.tradeInRestAmount || "N/A"}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Betalsätt</p>
                  <p>{agreementData.paymentMethod || "N/A"}</p>
                </>
              ) : (
                <>
                  <p>Moms</p>
                  <p>N/A</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Inbytesavdrag</p>
                  <p>N/A</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? null : (
                <>
                  <p>Betalsätt</p>
                  <p>{agreementData.paymentMethod}</p>
                </>
              )}
            </tr>
          </tbody>
          <tbody className="grid grid-cols-4">
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Betalsätt</p>
                  <p>{agreementData.paymentMethod}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Inköpspris</p>
                  <p>{agreementData.tradeInPurchasePrice}</p>
                </>
              ) : (
                <>
                  <p>Avräkning kreditskuld</p>
                  <p>N/A</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Moms</p>
                  <p>N/A</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Avräkning kreditskuld</p>
                  <p>N/A</p>
                </>
              ) : (
                <>
                  <p>Avräkning commision amount</p>
                  <p>N/A</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Försäljningspris</p>
                  <p>{agreementData.salesPriceSEK || "N/A"}</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? (
                <>
                  <p>Belopp till kund</p>
                  <p>N/A</p>
                </>
              ) : (
                <>
                  <p>Belopp till kund</p>
                  <p>N/A</p>
                </>
              )}
            </tr>
            <tr className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px] flex-col">
              {agreementData.type === "Sales Agreement" ? (
                <>
                  <p>Summa att betala</p>
                  <p>N/A</p>
                </>
              ) : agreementData.type === "Purchase Agreement" ? null : null}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
