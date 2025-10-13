export default function AuthUserInfo({
  user,
  agreementData,
}: {
  user: any;
  agreementData: any;
}) {
  console.log("Agreement Data in AuthUserInfossss: ", agreementData);
  return (
    <>
      <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Företagets namn
              <p>
                {user?.first || user?.last
                  ? `${user?.first ?? ""} ${user?.last ?? ""}`.trim()
                  : "N/A"}
              </p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Organisationsnummer
              {/* This data is not comming from the backend, it will show N/A */}
              <p>{user?.organizationNumber || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Hemsida
              {/* This data is not comming from the backend, it will show N/A */}
              <p>{user?.website || "N/A"}</p>
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Adress
              {/* This data is not comming from the backend, it will show N/A */}
              <p>{agreementData.address || user?.address || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Postnummer
              {/* This data is not comming from the backend, it will show N/A */}
              <p>{user?.potalCode || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Stad
              {/* This data is not comming from the backend, it will show N/A */}
              <p>{user?.city || "N/A"}</p>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Säljarens namn
              <p>{agreementData.name || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              E-postadress
              <p>{user?.email || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Telefonnummer
              <p>{user?.phone || "N/A"}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
