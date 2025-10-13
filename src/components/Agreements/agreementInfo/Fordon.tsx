export default function Fordon({ agreementData }: any) {
  if (agreementData.type === "Sales Agreement") {
    return (
      <>
        <div className="mt-3 overflow-x-auto">
          <p>Fordon</p>
          <div>
            <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Märke/Modell
                    <p>{agreementData.vehicleModel || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Registernummer
                    <p>{agreementData.registrationNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Chassisnummer
                    <p>{agreementData.chassisNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Försäljningsdatum{" "}
                    <p>
                      {agreementData.type === "Sales Agreement"
                        ? agreementData.salesDate
                        : agreementData.purchaseDate}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Momsstatus
                    <p>{agreementData.vatType || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Mätarställning
                    <p>{agreementData.mileage || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Besiktning . t.o.m{" "}
                    <p>
                      {agreementData.inspectionDateUpToAndIncluding || "N/A"}
                    </p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Senast Service-datum{" "}
                    <p>{agreementData.latestServiceDate || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Finansbolag /kreditgivare{" "}
                    <p>{agreementData.creditor || "N/A"}</p>
                  </td> */}
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Importerad används
                    <p>{agreementData.diretImport ? "JA" : "Nej"}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Däck
                    <p>{agreementData.deck || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Årsmodell
                    <p>{agreementData.vehicleYear || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Färg
                    <p>{agreementData.color || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Nycklar <p>{agreementData.numberOfKeys || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Utsläppsklass
                    <p>{agreementData.emissionClass || "N/A"}</p>
                  </td> */}
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Effekt kW <p>N/A</p>
                  </td> */}
                </tr>
              </tbody>
            </table>

            {/* <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Leveransdatum
                    <p>{agreementData.salesDate || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    kreditskuld SEK
                    <p>{agreementData.creditAmount || "0.00"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    moms SEK <p>N/A</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Pris inkl. moms SEK{" "}
                    <p>{agreementData.purchasePrice || "0.00"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Utbetalningsbelopp SEK <p>N/A</p>
                  </td>
                </tr>
              </tbody> 
            </table> */}
            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Tillägsinformation
                    <p>
                      {agreementData.freeTextMessage ||
                        agreementData.notes ||
                        "N/A"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <p>Inbytesbil</p>
          <div>
            <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Märke/Modell
                    <p>{agreementData.vehicleModel || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Registernummer
                    <p>{agreementData.registrationNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Chassisnummer
                    <p>{agreementData.chassisNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Försäljningsdatum{" "}
                    <p>
                      {agreementData.type === "Sales Agreement"
                        ? agreementData.salesDate || "N/A"
                        : agreementData.purchaseDate || "N/A"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Momsstatus
                    <p>{agreementData.vatType || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Mätarställning
                    <p>{agreementData.mileage || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Besiktning . t.o.m{" "}
                    <p>
                      {agreementData.inspectionDateUpToAndIncluding || "N/A"}
                    </p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Senast Service-datum{" "}
                    <p>{agreementData.latestServiceDate || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Finansbolag /kreditgivare{" "}
                    <p>{agreementData.creditor || "N/A"}</p>
                  </td> */}
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Importerad används
                    <p>{agreementData.diretImport ? "JA" : "Nej"}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mt-3 overflow-x-auto">
      <p>Fordon</p>
      <div>
        <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Märke/Modell
                <p>{agreementData.vehicleModel || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Registernummer
                <p>{agreementData.registrationNumber || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Chassisnummer
                <p>{agreementData.chassisNumber || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Försäljningsdatum{" "}
                <p>
                  {agreementData.type === "Sales Agreement"
                    ? agreementData.salesDate || "N/A"
                    : agreementData.purchaseDate || "N/A"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Momsstatus
                <p>{agreementData.vatType || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Mätarställning
                <p>{agreementData.mileage || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Besiktning . t.o.m{" "}
                <p>{agreementData.inspectionDateUpToAndIncluding || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Senast Service-datum{" "}
                <p>{agreementData.latestServiceDate || "N/A"}</p>
              </td>
              {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Finansbolag /kreditgivare{" "}
                <p>{agreementData.creditor || "N/A"}</p>
              </td> */}
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Importerad används
                <p>{agreementData.diretImport ? "JA" : "Nej"}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Däck
                <p>{agreementData.deck || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Årsmodell
                <p>{agreementData.vehicleYear || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Färg
                <p>{agreementData.color || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Nycklar <p>{agreementData.numberOfKeys || "N/A"}</p>
              </td>
              {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Utsläppsklass
                <p>{agreementData.emissionClass || "N/A"}</p>
              </td> */}
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Effekt kW <p>N/A</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Leveransdatum
                <p>{agreementData.salesDate || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                kreditskuld SEK
                <p>{agreementData.creditAmount || "0.00"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                moms SEK <p>N/A</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Pris inkl. moms SEK{" "}
                <p>{agreementData.purchasePrice || "0.00"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Utbetalningsbelopp SEK <p>N/A</p>
              </td>
            </tr>
          </tbody>
        </table> */}
        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Tillägsinformation
                <p>
                  {agreementData.freeTextMessage ||
                    agreementData.notes ||
                    "N/A"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
