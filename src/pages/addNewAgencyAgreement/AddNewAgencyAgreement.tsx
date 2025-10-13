import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackArrowIcon,
  AgreementPreviewIcon,
} from "../../components/utils/Icons";
import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import AgencyInformation from "../../components/Agreements/addNewAgreement/AgencyInformation";
import { makePostRequest } from "../../api/Api";
import { Loader2 } from "lucide-react";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import { generateRegularSigningLink } from "../../utils/publicSigningUtils";
import toast from "react-hot-toast";
import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";

type SearchResult = { data?: any[] } | null;

const AddNewAgencyAgreement = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    registrationNumber: "",
    purchaseDate: "",
    customerType: "",
    socialSecurityNumber: "",
    organizationNumber: "",
    email: "",
    phone: "",
    tradeInVehicle: "",
    latestService: "",
    salesPriceSEK: "",
    paymentMethod: "",
    vatType: "",
    mileage: "",
    numberOfKeys: "",
    tires: "",
    deck: "",
    insurer: "",
    insuranceType: "",
    warrantyProvider: "",
    warrantyProduct: "",
    notes: "",
    tradeInRegNumber: "",
    tradeInPurchaseDate: "",
    tradeInPurchasePrice: "",
    tradeInMileage: "",
    tradeInCreditMarking: "",
    purchasePrice: "",
    creditMarking: "",
    creditorName: "",
    creditAmount: "",
    depositor: "",
    commissionRate: "",
    commissionAmount: "",
    agencyFee: "",
    settlementDate: "",
    bank: "",
    accountNumber: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [agreementsData, setAgreementsData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<{
    vehicle: SearchResult;
    org: SearchResult;
    person: SearchResult;
  }>({
    vehicle: null,
    org: null,
    person: null,
  });
  const [formErrors, setFormErrors] = useState({
    registrationNumber: false,
  });
  const [createdAgreementData, setCreatedAgreementData] = useState<any>(null);

  console.log("createdAgreementData", createdAgreementData);

  console.log("agreementsData", agreementsData);

  const validateForm = () => {
    const errors = {
      registrationNumber: !form.registrationNumber.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  useEffect(() => {
    fetch("/src/assets/data/AllAgreements.json")
      .then((res) => res.json())
      .then((data) => setAgreementsData(data.agreements || []));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (
    type: "VEHICLE" | "ORG" | "PERSON",
    query: string
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50X2lkIjoiMDAwMDA5M2UyNDY5YjNhOGJmMTQ4NGVmODA5MWEyM2MiLCJ1c2VyX25hbWUiOiIwMDA1Y2ViN2I0ZmJjNmI1YjRlMzNjMTdlNGM4NDAzZiIsImRlcGFydG1lbnRfbmFtZSI6IlZhbGl0aXZlIENyZWRpdCIsImF1dGhvcml0aWVzIjpbIlZMVFZfQ1JFRElUX1NFQVJDSF9ETyIsIlZBTElUSVZFX0FQSV9BQ0NFU1MiXSwiY2xpZW50X2lkIjoiSU5TX1BBUlRORVIiLCJhdWQiOlsiVkFMSVRJVkUiXSwidXNlcl9pZCI6IjAwMDVjZWI3YjRmYmM2YjViNGUzM2MxN2U0Yzg0MDNmIiwidXNlcl9yZWFsX25hbWUiOiJTYW1pciBLYXNzZW0iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUi",
          },
          body: JSON.stringify({
            type,
            query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setSearchResults((prev) => ({
        ...prev,
        [type.toLowerCase()]: data || null,
      }));
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchResults((prev) => ({
        ...prev,
        [type.toLowerCase()]: null,
      }));
    }
  };

  const handleCreateAgreement = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsCreating(true);

    try {
      // Check if vehicle exists
      const vehicle = await getVehicle(form.registrationNumber);
      if (!vehicle) {
        // create a new vehicle if it doesn't exist
        const resp = await createVehicle({
          registrationNumber: form.registrationNumber,
          model: searchResults.vehicle?.data?.[0]?.detail?.vehicleModel || "",
          vehicleName:
            searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand || "",
          year: searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || "",
          chassisNumber:
            searchResults.vehicle?.data?.[0]?.detail?.chassisNumber || "",
          color: searchResults.vehicle?.data?.[0]?.detail?.color || "",
          fuelType:
            searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
              ", "
            ) || "",
          gearbox:
            searchResults.vehicle?.data?.[0]?.technicalData?.gearbox || "",
        });
        if (!resp) {
          toast.error(
            "Failed to create agreement because vehicle does not exist. And could not be created"
          );
          setIsCreating(false);
          return;
        }
      }

      const payload = {
        registrationNumber: form.registrationNumber || null,
        status: "created",
        type: "Agency Agreement",
        purchaseDate: form.purchaseDate || null,
        email: form.email || null,
        phone: form.phone || null,
        purchasePrice: form.purchasePrice.replace(/[^0-9.]/g, "") || "0",
        paymentMethod: form.paymentMethod || null,
        vatType: form.vatType || null,
        creditMarking: form.creditMarking || null,
        latestService: form.latestService || null,
        mileage: form.mileage || null,
        numberOfKeys: form.numberOfKeys || null,
        deck: form.deck || null,
        notes: form.notes || null,
        creditor: form.creditorName || null,
        depositor: form.depositor || null,
        creditAmount: form.creditAmount || "0",
        customerType: form.customerType || null,
        insurer: form.insurer || null,
        warrantyProvider: form.warrantyProvider || null,
        warrantyProduct: form.warrantyProduct || null,
        socialSecurityNumber: form.socialSecurityNumber || null,
        organizationNumber: form.organizationNumber || null,
        tradeInType: form.tradeInVehicle || null,
        tradeInRegistrationNumber: form.tradeInRegNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: form.tradeInMileage || null,
        tradeInCreditMaking: form.tradeInCreditMarking || null,
        commissionRate: form.commissionRate || null,
        commissionAmount: form.commissionAmount || null,
        agencyFee: form.agencyFee || null,
        vehicleModel:
          searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand &&
          searchResults.vehicle?.data?.[0]?.detail?.vehicleModelRaw
            ? `${searchResults.vehicle.data[0].detail.vehicleBrand} ${searchResults.vehicle.data[0].detail.vehicleModelRaw}`
            : null,
        chassisNumber:
          searchResults.vehicle?.data?.[0]?.detail?.chassisNumber || null,
        color: searchResults.vehicle?.data?.[0]?.detail?.color || null,
        vehicleYear:
          searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || null,
        fuelType:
          searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
            ", "
          ) || null,
        gearbox:
          searchResults.vehicle?.data?.[0]?.technicalData?.gearbox || null,
        directImport:
          searchResults.vehicle?.data?.[0]?.origin?.directImport || null,
        emissionClass:
          searchResults.vehicle?.data?.[0]?.environmental?.emissionClass ||
          null,
        inspectionDateUpToAndIncluding:
          searchResults.vehicle?.data?.[0]?.inspection
            ?.inspectionDateUpToAndIncluding || null,
        salesPriceSEK: form.salesPriceSEK || null,
        name:
          searchResults.org?.data?.[0]?.orgName?.name ||
          searchResults.person?.data?.[0]?.name?.names[0] ||
          null,
        address: searchResults.org?.data?.[0]?.addresses?.[0]
          ? `${searchResults.org.data[0].addresses[0].street} ${searchResults.org.data[0].addresses[0].number}`
          : searchResults.person?.data?.[0]?.addresses?.[0]
          ? `${searchResults.person.data[0].addresses[0].street} ${searchResults.person.data[0].addresses[0].number}`
          : null,
        settlementDate: form.settlementDate || null,
        bank: form.bank || null,
        accountNumber: form.accountNumber || null,
      };

      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );

      toast.success("Agreement Created Successfully.");
      console.log("Agreement created successfully:", response.data);
    } catch (error) {
      console.error("Error creating agreement:", error);
      toast.error("Failed to create agreement");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateAndSignAgreement = async (isPrintFlow = false) => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsCreating(true);

    try {
      // Check if vehicle exists
      const vehicle = await getVehicle(form.registrationNumber);
      if (!vehicle) {
        // create a new vehicle if it doesn't exist
        const resp = await createVehicle({
          registrationNumber: form.registrationNumber,
          model: searchResults.vehicle?.data?.[0]?.detail?.vehicleModel || "",
          vehicleName:
            searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand || "",
          year: searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || "",
          chassisNumber:
            searchResults.vehicle?.data?.[0]?.detail?.chassisNumber || "",
          color: searchResults.vehicle?.data?.[0]?.detail?.color || "",
          fuelType:
            searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
              ", "
            ) || "",
          gearbox:
            searchResults.vehicle?.data?.[0]?.technicalData?.gearbox || "",
        });
        if (!resp) {
          toast.error(
            "Failed to create agreement because vehicle does not exist. And could not be created"
          );
          setIsCreating(false);
          return;
        }
      }

      const payload = {
        registrationNumber: form.registrationNumber || null,
        status: "signed",
        type: "Agency Agreement",
        purchaseDate: form.purchaseDate || null,
        email: form.email || null,
        phone: form.phone || null,
        purchasePrice: form.purchasePrice.replace(/[^0-9.]/g, "") || "0",
        paymentMethod: form.paymentMethod || null,
        vatType: form.vatType || null,
        creditMarking: form.creditMarking || null,
        latestService: form.latestService || null,
        mileage: form.mileage || null,
        numberOfKeys: form.numberOfKeys || null,
        deck: form.deck || null,
        notes: form.notes || null,
        creditor: form.creditorName || null,
        depositor: form.depositor || null,
        creditAmount: form.creditAmount || "0",
        customerType: form.customerType || null,
        insurer: form.insurer || null,
        warrantyProvider: form.warrantyProvider || null,
        warrantyProduct: form.warrantyProduct || null,
        socialSecurityNumber: form.socialSecurityNumber || null,
        organizationNumber: form.organizationNumber || null,
        tradeInType: form.tradeInVehicle || null,
        tradeInRegistrationNumber: form.tradeInRegNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: form.tradeInMileage || null,
        tradeInCreditMaking: form.tradeInCreditMarking || null,
        commissionRate: form.commissionRate || null,
        commissionAmount: form.commissionAmount || null,
        agencyFee: form.agencyFee || null,
        vehicleModel:
          searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand &&
          searchResults.vehicle?.data?.[0]?.detail?.vehicleModelRaw
            ? `${searchResults.vehicle.data[0].detail.vehicleBrand} ${searchResults.vehicle.data[0].detail.vehicleModelRaw}`
            : null,
        chassisNumber:
          searchResults.vehicle?.data?.[0]?.detail?.chassisNumber || null,
        color: searchResults.vehicle?.data?.[0]?.detail?.color || null,
        vehicleYear:
          searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || null,
        fuelType:
          searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
            ", "
          ) || null,
        gearbox:
          searchResults.vehicle?.data?.[0]?.technicalData?.gearbox || null,
        directImport:
          searchResults.vehicle?.data?.[0]?.origin?.directImport || null,
        emissionClass:
          searchResults.vehicle?.data?.[0]?.environmental?.emissionClass ||
          null,
        inspectionDateUpToAndIncluding:
          searchResults.vehicle?.data?.[0]?.inspection
            ?.inspectionDateUpToAndIncluding || null,
        salesPriceSEK: form.salesPriceSEK || null,
        name:
          searchResults.org?.data?.[0]?.orgName?.name ||
          searchResults.person?.data?.[0]?.name?.names[0] ||
          null,
        address: searchResults.org?.data?.[0]?.addresses?.[0]
          ? `${searchResults.org.data[0].addresses[0].street} ${searchResults.org.data[0].addresses[0].number}`
          : searchResults.person?.data?.[0]?.addresses?.[0]
          ? `${searchResults.person.data[0].addresses[0].street} ${searchResults.person.data[0].addresses[0].number}`
          : null,
        settlementDate: form.settlementDate || null,
        bank: form.bank || null,
        accountNumber: form.accountNumber || null,
      };

      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );

      if (response.data.success) {
        toast.success("Agency Agreement Created Successfully.");
        setCreatedAgreementData(response.data);

        if (isPrintFlow) {
          navigate(generateRegularSigningLink(response.data.data.agreement.id));
        } else {
          navigate(generateRegularSigningLink(response.data.data.agreement.id));
        }
      }
    } catch (error) {
      console.error("Error creating agency agreement:", error);
      toast.error("Failed to create agency agreement");
    } finally {
      setIsCreating(false);
    }
  };

  const handlePrint = async () => {
    await handleCreateAndSignAgreement(true);
  };

  return (
    <div className="lg:p-6 p-4 font-plus-jakarta">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={() => navigate("/agreements")}
        >
          <BackArrowIcon />
          <span className="ml-2">Create Agency Agreement</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <BasicInformation
            form={form}
            handleChange={handleChange}
            onSearch={handleSearch}
          />
          <TradeVehicle
            form={form}
            handleChange={handleChange}
            onSearch={handleSearch}
          />
          <SalesInformation form={form} handleChange={handleChange} />
          <VehicleInformation form={form} handleChange={handleChange} />
          <PaymentInformation form={form} handleChange={handleChange} />
          <AgencyInformation form={form} handleChange={handleChange} />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <button
              type="button"
              className={`px-6 py-2 border border-blue-900 text-blue-900 rounded-lg cursor-pointer hover:bg-blue-50 flex items-center justify-center ${
                formErrors.registrationNumber
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleCreateAgreement}
              disabled={isCreating || formErrors.registrationNumber}
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                "Create Agreement"
              )}
            </button>
            <button
              type="button"
              className={`px-6 py-2 bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-lg cursor-pointer hover:bg-blue-800 ${
                formErrors.registrationNumber
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleCreateAndSignAgreement(false)}
              disabled={isCreating || formErrors.registrationNumber}
            >
              {isCreating ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating...
                </div>
              ) : (
                "Create & Sign Agreement"
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] text-gray-700">
                Agency Agreement{" "}
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
                    Vehicle Model
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {searchResults.vehicle?.data?.[0]?.detail?.vehicleModel ||
                      "N/A"}
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
                    {searchResults.vehicle?.data?.[0]?.detail?.vehicleYear ||
                      "N/A"}
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
                    Agency Date
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.purchaseDate || "N/A"}
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
                          {searchResults.org?.data?.[0]?.addresses?.[0]
                            ?.street &&
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
                          {searchResults.org?.data?.[0]?.phones?.[0]?.number ||
                            "N/A"}
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
                          searchResults.person?.data?.[0]?.addresses?.[0]
                            ?.number
                            ? `${searchResults.person?.data?.[0]?.addresses?.[0]?.street} ${searchResults.person?.data?.[0]?.addresses?.[0]?.number}`
                            : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#91959A]">
                          Postal Code
                        </div>
                        <div className="text-[16px] font-normal text-[#2E343E]">
                          {searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                            ? searchResults.person?.data?.[0]?.addresses?.[0]
                                ?.zip
                            : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#91959A]">
                          City
                        </div>
                        <div className="text-[16px] font-normal text-[#2E343E]">
                          {searchResults.person?.data?.[0]?.addresses?.[0]?.city
                            ? searchResults.person?.data?.[0]?.addresses?.[0]
                                ?.city
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
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                Vehicle Specification
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
                    Mileage (km)
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.mileage || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Latest Service
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.latestService || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Keys
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.numberOfKeys || "N/A"}
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
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                Agency Information
              </h3>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Sales Price
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.salesPriceSEK || "N/A"}
                  </div>
                </div>
                {/* <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Commission Rate
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.commissionRate || "N/A"}
                  </div>
                </div> */}
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Commission Amount
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.commissionAmount || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Agency Costs
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.agencyFee || "N/A"}
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
                    Bank
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.bank || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Account Number
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.accountNumber || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Credit Making
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.creditMarking || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Creditor Name
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.creditorName || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Credit Amount
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.creditAmount || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Settlement Date
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.settlementDate || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                Notes
              </h3>
              <div className="grid grid-cols-1 gap-y-3">
                <div className="text-[14px] font-medium text-[#91959A]">
                  Free Text Message
                </div>
                <div className="text-[16px] font-normal text-[#2E343E]">
                  {form.notes || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAgencyAgreement;
