import { AgreementPreviewIcon } from "../../../utils/Icons";
// import { useState } from "react";

export default function SalesAgreementPreview({
  form,
  searchResults,
  searchTradeInVehicle,
  preview,
  isCreating,
  handlePrint,
}: {
  form: any;
  searchResults: {
    vehicle: { data?: any[] } | null;
    person: { data?: any[] } | null;
    org: { data?: any[] } | null;
  };
  searchTradeInVehicle: { vehicle: { data?: any[] } | null };
  preview: { tradeInVehicle?: string };
  isCreating: boolean;
  handlePrint: () => void;
}) {
  // const [formData, setFormData] = useState({
  //   registrationNumber: "",
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  console.log(searchResults);

  return (
    <div>
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] text-gray-700">
            Uthyrningsavtal {" "}
            <span className="text-gray-400 text-sm">
              (Preview in real time)
            </span>
          </h2>
          <button
            className="text-[#012F7A] hover:text-blue-700"
            onClick={handlePrint}
            disabled={isCreating}
          >
            <AgreementPreviewIcon />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Vehicle Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Registration Number
              </div>

              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.registrationData
                  ?.registrationNumber || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Vehicle Brand
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults?.vehicle?.data?.[0]?.detail?.vehicleBrand &&
                searchResults?.vehicle?.data?.[0]?.detail?.vehicleModelRaw
                  ? `${searchResults.vehicle.data[0].detail.vehicleBrand}`
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Vehicle Model
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults?.vehicle?.data?.[0]?.detail?.vehicleBrand &&
                searchResults?.vehicle?.data?.[0]?.detail?.vehicleModelRaw
                  ? `${searchResults.vehicle.data[0].detail.vehicleModel}`
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Color
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.color || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Chassis Number
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.chassisNumber ||
                  "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Vehicle Year
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Gearbox
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.technicalData?.gearbox ||
                  "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Fuel Type
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
                  ", "
                ) || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Uthyrningsdatum 
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.salesDate || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Mileage (km)
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.mileage || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">Keys</div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.numberOfKeys || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {(form.customerType === "company" ||
          form.customerType === "private individual") && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-0">
                Customer Details
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  form.customerType === "company"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {form.customerType === "company"
                  ? "Company"
                  : "Private Individual"}
              </span>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
              {form.customerType === "company" ? (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Customer Type
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Organization Number
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.legalId || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Company Name
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.orgName?.name || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Address
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.street &&
                      searchResults.org?.data?.[0]?.addresses?.[0]?.number
                        ? `${searchResults.org?.data?.[0]?.addresses?.[0]?.street} ${searchResults.org?.data?.[0]?.addresses?.[0]?.number}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Postal Code
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.zip ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      City
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.city
                        ? `${searchResults.org?.data?.[0]?.addresses?.[0]?.zip} ${searchResults.org?.data?.[0]?.addresses?.[0]?.city}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Phone
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.phone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Email Address
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Verification
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.verification || "N/A"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Customer Type
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Name
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.name?.givenName ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Personal Number
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.legalId || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Address
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]
                        ?.street &&
                      searchResults.person?.data?.[0]?.addresses?.[0]?.number
                        ? `${searchResults.person?.data?.[0]?.addresses?.[0]?.street} ${searchResults.person?.data?.[0]?.addresses?.[0]?.number}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Email
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Phone
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.phone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Postal Code
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                        ? searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      City
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]?.city
                        ? searchResults.person?.data?.[0]?.addresses?.[0]?.city
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Email Address
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Körkortsnummer
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.pep || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Giltighetstid Körkort
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.verification || "N/A"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {preview.tradeInVehicle && (
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
              Trade-in Vehicle Information
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
              <div>
                <div className="text-[14px] font-medium text-[#91959A]">
                  Trade-in Vehicle:
                </div>
                <div className="text-[16px] font-normal text-[#2E343E]">
                  {preview.tradeInVehicle === "yes" ? "Yes" : "No"}
                </div>
              </div>
              {preview.tradeInVehicle === "yes" && (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Registration Number:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.registrationData
                        ?.registrationNumber || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Vehical Brand:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.detail?.vehicleBrand || "N/A"}
                    </div>

                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Vehical Modal:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.detail?.vehicleModel || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Purchase Date:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInPurchaseDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Purchase Price:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInPurchasePrice || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Mileage:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInMileage || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Credit Marking:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInCreditMaking || "N/A"}
                    </div>
                  </div>
                  {form.tradeInRestAmount && (
                    <div>
                      <div className="text-[14px] font-medium text-[#91959A]">
                        Rest Amount:
                      </div>
                      <div className="text-[16px] font-normal text-[#2E343E]">
                        {form.tradeInRestAmount || "N/A"}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Sales Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Sales Price (SEK)
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.salesPriceSEK || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Payment Method
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.paymentMethod || "N/A"}
              </div>
            </div>
            {(form.paymentMethod === "financing_down" ||
              form.paymentMethod === "leasing" ||
              form.paymentMethod === "financing_no_down") && (
              <>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Financial Company
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.financialCompany || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Credit Amount Sales
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.creditAmountSales || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Cash Stack
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.cashStack || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Loan Period
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.loanPeriod || "N/A"}
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Payment Date
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.paymentDate || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Vehicle Specifications
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                VAT Type
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.vatType || "N/A"}
              </div>
            </div>
            
            
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Tires
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deck || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Insurer
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.insurer || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Insurance Type
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.insuranceType || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Warranty Provider
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.warrantyProvider || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Warranty Product
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.warrantyProduct || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Latest Service
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.latestServiceDate || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Delivery Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Delivery Information
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryDate || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Delivery Location
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryLocation || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Delivery Terms
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryTerms || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Payment Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div className="text-[14px] font-medium text-[#91959A]">
              Free Text Message (Payment)
            </div>
            <div className="text-[16px] font-normal text-[#2E343E]">
              {form.freeTextMessage || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
