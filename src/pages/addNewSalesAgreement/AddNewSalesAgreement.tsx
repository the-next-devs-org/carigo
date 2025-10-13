import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackArrowIcon } from "../../components/utils/Icons";
import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import { makePostRequest } from "../../api/Api";
import { Loader2 } from "lucide-react";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import { generateRegularSigningLink } from "../../utils/publicSigningUtils";
import toast from "react-hot-toast";
import SalesAgreementPreview from "../../components/Agreements/addNewAgreement/salesAgreement/SalesAgreementPreview";
import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";
import DeliveryInformation from "../../components/Agreements/addNewAgreement/salesAgreement/DeliveryInformation";
// import { createInvoice } from "../../utils/createInvoice";
// import { generateTempInvoiceNumber } from "../../utils/generateTempInvoiceNumber";

type SearchResult = { data?: any[] } | null;

type SearchTradeInVehicle = { data?: any[] } | null;

const AddNewSalesAgreement = () => {
  const [form, setForm] = useState({
    registrationNumber: "",
    purchaseDate: "",
    email: "",
    phone: "",
    salesPriceSEK: "",
    paymentMethod: "",
    vatType: "",
    creditMarking: "",
    mileage: "",
    latestService: "",
    numberOfKeys: "",
    deck: "",
    freeTextMessage: "",
    creditor: "",
    depositor: "",
    creditAmount: "",
    // name: "",
    customerType: "",
    address: "",
    birthDate: "",
    gender: "",
    salesDate: "",
    commissionRate: "",
    commissionAmount: "",
    agencyFee: "",
    insurer: "",
    insuranceType: "",
    warrantyProvider: "",
    warrantyProduct: "",
    socialSecurityNumber: "",
    organizationNumber: "",
    tradeInType: "",
    tradeInRegistrationNumber: "",
    tradeInPurchaseDate: "",
    tradeInPurchasePrice: "",
    tradeInMileage: "",
    tradeInCreditMaking: "",
    tradeInRestAmount: "",
    // financialCompany: "",
    creditAmountSales: "",
    cashStack: "",
    loanPeriod: "",
    deliveryDate: "",
    deliveryLocation: "",
    deliveryTerms: "",
    pep: "",
    verification: "",
    latestServiceDate: "",
    paymentDate: "",
    // payoutDate: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [agreementsData, setAgreementsData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<{
    vehicle: any;
    org: SearchResult;
    person: SearchResult;
  }>({
    vehicle: null,
    org: null,
    person: null,
  });
  const [searchTradeInVehicle, setSearchTradeInVehicle] = useState<{
    vehicle: SearchTradeInVehicle;
  }>({
    vehicle: null,
  });
  const [formErrors, setFormErrors] = useState({
    registrationNumber: false,
  });
  const [createdAgreementData, setCreatedAgreementData] = useState<any>(null);
  const navigate = useNavigate();

  const preview = {
    ...form,
    ...(searchResults.vehicle?.data?.[0] || {}),
    ...(searchTradeInVehicle.vehicle?.data?.[0] || {}),
    contractInfo: {
      ...(searchResults.org?.data || searchResults.person?.data || {}),
      customerType: form.customerType,
    },
  };

  console.log(formErrors, createdAgreementData, agreementsData);

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

  const handlePrint = async () => {
    await handleCreateAndSignAgreement(true);
  };

  const validateForm = () => {
    const errors = {
      registrationNumber: !(form.registrationNumber || "").trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
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

  const handleSearchTradeVehicle = async (type: "VEHICLE", query: string) => {
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

      setSearchTradeInVehicle((prev) => ({
        ...prev,
        [type.toLowerCase()]: data || null,
      }));
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchTradeInVehicle((prev) => ({
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
          model: `${
            searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand ?? ""
          } ${searchResults.vehicle?.data?.[0]?.detail?.vehicleModelRaw ?? ""}`,
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
        }
      }

      const payload = {
        registrationNumber: form.registrationNumber || null,
        status: "created",
        type: "Sales Agreement",
        purchaseDate: form.purchaseDate || null,
        email: form.email || null,
        phone: form.phone || null,
        salesPriceSEK: form.salesPriceSEK.replace(/[^0-9.]/g, "") || "0",
        paymentMethod: form.paymentMethod || null,
        vatType: form.vatType || null,
        creditMarking: form.creditMarking || null,
        mileage: form.mileage || null,
        latestService: form.latestService || null,
        numberOfKeys: form.numberOfKeys || null,
        deck: form.deck || null,
        freeTextMessage: form.freeTextMessage || null,
        creditor: form.creditor || null,
        depositor: form.depositor || null,
        creditAmount: form.creditAmount || "0",
        customerType: form.customerType || null,
        birthDate: form.birthDate || null,
        gender: form.gender || null,
        salesDate: form.salesDate || null,
        commissionRate: form.commissionRate || null,
        commissionAmount: form.commissionAmount || 0.0,
        agencyFee: form.agencyFee || null,
        insurer: form.insurer || null,
        insuranceType: form.insuranceType || null,
        warrantyProvider: form.warrantyProvider || null,
        warrantyProduct: form.warrantyProduct || null,
        socialSecurityNumber: form.socialSecurityNumber || null,
        organizationNumber: form.organizationNumber || null,
        tradeInType: form.tradeInType || null,
        tradeInRegistrationNumber: form.tradeInRegistrationNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: form.tradeInMileage || null,
        tradeInCreditMaking: form.tradeInCreditMaking || null,
        tradeInRestAmount: form.tradeInRestAmount || null,
        vehicleBrand: searchResults.vehicle?.data[0]?.detail?.vehicleBrand,
        vehicleModel: searchResults.vehicle?.data[0]?.detail?.vehicleModel,

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
          searchResults.vehicle?.data?.[0]?.origin?.directImport || false,
        emissionClass:
          searchResults.vehicle?.data?.[0]?.environmental?.emissionClass ||
          null,
        inspectionDateUpToAndIncluding:
          searchResults.vehicle?.data?.[0]?.inspection
            ?.inspectionDateUpToAndIncluding || null,
        deliveryDate: form.deliveryDate || null,
        deliveryLocation: form.deliveryLocation || null,
        deliveryTerms: form.deliveryTerms || null,
        latestServiceDate: form.latestServiceDate || null,
        pep: form.pep === "yes" ? true : false,
        verification: form.verification || null,
        name:
          searchResults.org?.data?.[0]?.orgName?.name ||
          searchResults.person?.data?.[0]?.name?.names[0] ||
          null,
        address: searchResults.org?.data?.[0]?.addresses?.[0]
          ? `${searchResults.org.data[0].addresses[0].street} ${searchResults.org.data[0].addresses[0].number}`
          : searchResults.person?.data?.[0]?.addresses?.[0]
          ? `${searchResults.person.data[0].addresses[0].street} ${searchResults.person.data[0].addresses[0].number}`
          : null,
        paymentDate: form.paymentDate || null,
        // financialCompany: form.financialCompany || null,
        creditAmountSales: form.creditAmountSales || null,
        cashStack: form.cashStack || null,
        loanPeriod: form.loanPeriod || null,
      };
     
      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );

      if (response.data.success) {
        toast.success("Agreement Created Successfully.");
        setCreatedAgreementData(response.data);
      }
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
          model: `${
            searchResults.vehicle?.data?.[0]?.detail?.vehicleBrand ?? ""
          } ${searchResults.vehicle?.data?.[0]?.detail?.vehicleModelRaw ?? ""}`,
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
        }
      }

      const payload = {
        registrationNumber: form.registrationNumber || null,
        status: "created",
        type: "Sales Agreement",
        purchaseDate: form.purchaseDate || null,
        email: form.email || null,
        phone: form.phone || null,
        salesPriceSEK: form.salesPriceSEK.replace(/[^0-9.]/g, "") || "0",
        paymentMethod: form.paymentMethod || null,
        vatType: form.vatType || null,
        creditMarking: form.creditMarking || null,
        mileage: form.mileage || null,
        latestService: form.latestService || null,
        numberOfKeys: form.numberOfKeys || null,
        deck: form.deck || null,
        freeTextMessage: form.freeTextMessage || null,
        creditor: form.creditor || null,
        depositor: form.depositor || null,
        creditAmount: form.creditAmount || "0",
        customerType: form.customerType || null,
        birthDate: form.birthDate || null,
        gender: form.gender || null,
        salesDate: form.salesDate || null,
        commissionRate: form.commissionRate || null,
        commissionAmount: form.commissionAmount || 0.0,
        agencyFee: form.agencyFee || null,
        insurer: form.insurer || null,
        insuranceType: form.insuranceType || null,
        warrantyProvider: form.warrantyProvider || null,
        warrantyProduct: form.warrantyProduct || null,
        socialSecurityNumber: form.socialSecurityNumber || null,
        organizationNumber: form.organizationNumber || null,
        tradeInType: form.tradeInType || null,
        tradeInRegistrationNumber: form.tradeInRegistrationNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: form.tradeInMileage || null,
        tradeInCreditMaking: form.tradeInCreditMaking || null,
        tradeInRestAmount: form.tradeInRestAmount || null,
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
          searchResults.vehicle?.data?.[0]?.origin?.directImport || false,
        emissionClass:
          searchResults.vehicle?.data?.[0]?.environmental?.emissionClass ||
          null,
        inspectionDateUpToAndIncluding:
          searchResults.vehicle?.data?.[0]?.inspection
            ?.inspectionDateUpToAndIncluding || null,
        deliveryDate: form.deliveryDate || null,
        deliveryLocation: form.deliveryLocation || null,
        deliveryTerms: form.deliveryTerms || null,
        latestServiceDate: form.latestServiceDate || null,
        pep: form.pep === "yes" ? true : false,
        verification: form.verification || null,
        name:
          searchResults.org?.data?.[0]?.orgName?.name ||
          searchResults.person?.data?.[0]?.name?.names[0] ||
          null,
        address: searchResults.org?.data?.[0]?.addresses?.[0]
          ? `${searchResults.org.data[0].addresses[0].street} ${searchResults.org.data[0].addresses[0].number}`
          : searchResults.person?.data?.[0]?.addresses?.[0]
          ? `${searchResults.person.data[0].addresses[0].street} ${searchResults.person.data[0].addresses[0].number}`
          : null,
        // financialCompany: form.financialCompany || null,
        creditAmountSales: form.creditAmountSales || null,
        cashStack: form.cashStack || null,
        loanPeriod: form.loanPeriod || null,
      };

      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );
      console.log(response);

      if (response.data.success) {
        toast.success("Agreement Created Successfully.");
        setCreatedAgreementData(response.data);

        if (isPrintFlow) {
          navigate(generateRegularSigningLink(response.data.data.agreement.id));
        } else {
          navigate(generateRegularSigningLink(response.data.data.agreement.id));
        }
      }
    } catch (error) {
      console.error("Error creating agreement:", error);
      toast.error("Failed to create agreement");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="lg:p-6 p-4 font-plus-jakarta">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={() => navigate("/agreements")}
        >
          <BackArrowIcon />
          <span className="ml-2">Create Sales Agreement</span>
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
            onSearch={handleSearchTradeVehicle}
          />
          <SalesInformation form={form} handleChange={handleChange} />
          <VehicleInformation form={form} handleChange={handleChange} />
          <DeliveryInformation form={form} handleChange={handleChange} />
          <PaymentInformation form={form} handleChange={handleChange} />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-blue-900 text-blue-900 rounded-lg cursor-pointer hover:bg-blue-50 flex items-center justify-center"
              onClick={handleCreateAgreement}
              disabled={isCreating}
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
              className="px-6 py-2 bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-lg cursor-pointer hover:bg-blue-800"
              onClick={() => handleCreateAndSignAgreement(false)}
              disabled={isCreating}
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
          <SalesAgreementPreview
            preview={preview}
            handlePrint={handlePrint}
            isCreating={isCreating}
            form={form}
            searchResults={searchResults}
            searchTradeInVehicle={searchTradeInVehicle}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSalesAgreement;
