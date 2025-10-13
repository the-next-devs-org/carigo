import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { makeGetRequest, makePostRequest } from "../../api/Api";
import {
  BackArrowIcon,
  RemoveLineIcon,
  InvoicePreviewIcon,
} from "../../components/utils/Icons";
import { BACKEND_API_ENDPOINT } from "../../api/config";

interface ProductLine {
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  vatRate: number;
  description: string;
  lineTotal?: number;
}

const defaultProductLine = (): ProductLine => ({
  productName: "",
  quantity: 1,
  unit: "hr",
  price: 0,
  vatRate: 25,
  description: "",
});

interface InvoiceForm {
  invoiceNumber: string;
  customerType: string;
  invoiceDate: string;
  dueDate: string;
  inReference: string;
  ourReference: string;
  email: string;
  telephone: string;
  customerName: string;
  orgNumber: string;
  socialSecurityNumber: string;
  currency: string;
  language: string;
}

interface PersonName {
  country: string;
  names: string[];
  lastName: string;
  givenName: string;
}

interface Address {
  _type: string;
  kind: string;
  country: string;
  street: string;
  number?: string;
  numberSuffix?: string;
  flat?: string;
  zip: string;
  city: string;
  county?: string;
  municipality?: string;
  id?: string;
}

interface OrgName {
  name: string;
  rawName: string;
}

interface Phone {
  _type: string;
  number: string;
  areaCode: string;
  kind: string;
  registeredSince: string;
}

interface SearchResponse {
  success: boolean;
  type: "PERSON" | "ORG";
  keyword: string;
  count: number;
  data: PersonData[] | OrgData[];
}

interface PersonData {
  _type: "SE_PERSON";
  id: string;
  country: string;
  legalId: string;
  birthDate: string;
  gender: string;
  name: PersonName;
  addresses: Address[];
  addressHistory: {
    addresses: Array<{
      address: Address;
      actualTo: string;
    }>;
    officialAddressChangeCount: number;
    foreignAddressChangeCount: number;
  };
  phones: Phone[];
  registrationStatus: string;
}

interface OrgData {
  _type: "SE_ORG";
  id: string;
  country: string;
  legalId: string;
  addresses: Address[];
  phones: Phone[];
  orgName: OrgName;
  lifecycle: {
    status: {
      value: string;
    };
    establishedInYear: number;
    establishedOn: string;
  };
  taxInfo: {
    vatNumber: string;
    fskattPayer: boolean;
    vatPayer: boolean;
    employer: boolean;
  };
}

const AddReceipt = () => {
  const [form, setForm] = useState<InvoiceForm>({
    invoiceNumber: "",
    customerType: "Business",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    inReference: "",
    ourReference: "",
    email: "",
    telephone: "",
    customerName: "",
    orgNumber: "",
    socialSecurityNumber: "",
    currency: "SEK",
    language: "English",
  });

  const [orgOrSsn, setOrgOrSsn] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [showPrintView, setShowPrintView] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [searchError, setSearchError] = useState("");
  const [company, setCompany] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [productLines, setProductLines] = useState<ProductLine[]>([
    { ...defaultProductLine(), lineTotal: 0 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handlePrint = () => {
    setShowPrintView(true);
  };

  useEffect(() => {
    if (showPrintView) {
      const timer = setTimeout(() => {
        window.print();
        setShowPrintView(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [showPrintView]);

  console.log("searchResult", searchResult);

  console.log("setSearchResult", setSearchResult, companyLoading);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.telephone.trim()) {
      newErrors.telephone = "Telephone number is required";
    }

    if (!form.invoiceDate) {
      newErrors.invoiceDate = "Receipt date is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    let hasValidProduct = false;
    productLines.forEach((line) => {
      if (line.productName.trim() && line.price > 0 && line.quantity > 0) {
        hasValidProduct = true;
      }
    });

    if (!hasValidProduct) {
      newErrors.productLines = "At least one valid product/service is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (type: "ORG" | "PERSON", query: string) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50X2lkIjoiMDAwMDA5M2UyNDY5YjNhOGJmMTQ4NGVmODA5MWEyM2MiLCJ1c2VyX25hbWUiOiIwMDA1Y2ViN2I0ZmJjNmI1YjRlMzNjMTdlNGM4NDAzZiIsImRlcGFydG1lbnRfbmFtZSI6IlZhbGl0aXZlIENyZWRpdCIsImF1dGhvcml0aWVzIjpbIlZMVFZfQ1JFRElUX1NFQVJDSF9ETyIsIlZBTElUSVZFX0FQSV9BQ0NFU1MiXSwiY2xpZW50X2lkIjoiSU5TX1BBUlRORVIiLCJhdWQiOlsiVkFMSVRJVkUiXSwidXNlcl9pZCI6IjAwMDVjZWI3YjRmYmM2YjViNGUzM2MxN2U0Yzg0MDNmIiwidXNlcl9yZWFsX25hbWUiOiJTYW1pciBLYXNzZW0iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUi`,
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

      const data: SearchResponse = await response.json();

      if (data.success && data.count > 0) {
        const result = data.data[0];

        if (type === "PERSON") {
          const personData = result as PersonData;
          const primaryAddress = personData.addresses[0];

          setForm((prev) => ({
            ...prev,
            customerName: `${personData.name.givenName} ${personData.name.lastName}`,
            address: primaryAddress
              ? `${primaryAddress.street} ${primaryAddress.number || ""}${
                  primaryAddress.numberSuffix ? primaryAddress.numberSuffix : ""
                }, ${primaryAddress.zip} ${primaryAddress.city}`
              : "",
            birthDate: personData.birthDate,
            gender: personData.gender,
          }));
        } else if (type === "ORG") {
          const orgData = result as OrgData;
          const primaryAddress =
            orgData.addresses.find((a) => a.kind === "VISIT") ||
            orgData.addresses[0];
          const primaryPhone =
            orgData.phones.find((p) => p.kind === "OFFICIAL") ||
            orgData.phones[0];

          setForm((prev) => ({
            ...prev,
            customerName: orgData.orgName.name,
            address: primaryAddress
              ? `${primaryAddress.street} ${primaryAddress.number || ""}, ${
                  primaryAddress.zip
                } ${primaryAddress.city}`
              : "",
            telephone: primaryPhone?.number || "",
            orgNumber: orgData.legalId,
            vatNumber: orgData.taxInfo.vatNumber,
          }));
        }
      } else {
        setSearchError(
          `No results found for ${
            type === "ORG" ? "organization" : "individual"
          }`
        );
      }
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchError(
        `Failed to search ${type === "ORG" ? "organization" : "individual"}`
      );
    }
  };

  const handleOrgOrPersonSearch = () => {
    if (
      (form.customerType === "Business" && !orgOrSsn) ||
      (form.customerType === "Individual" && !orgOrSsn)
    ) {
      setSearchError(
        form.customerType === "Business"
          ? "Organization number is required"
          : "Social Security number is required"
      );
      return;
    }
    setSearchError("");

    if (form.customerType === "Business") {
      handleFormChange({
        target: {
          name: "orgNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleSearch("ORG", orgOrSsn);
    } else if (form.customerType === "Individual") {
      handleFormChange({
        target: {
          name: "socialSecurityNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleSearch("PERSON", orgOrSsn);
    }
  };

  const generateTempInvoiceNumber = () => {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 1000);
    return `RCP-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${randomNum}`;
  };

  const handleProductLineChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newLines = [...productLines];
    const value =
      e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value;

    newLines[idx] = {
      ...newLines[idx],
      [e.target.name]: value,
    };

    if (e.target.name === "price" || e.target.name === "quantity") {
      newLines[idx].lineTotal =
        newLines[idx].price *
        newLines[idx].quantity *
        (1 + newLines[idx].vatRate / 100);
    }

    setProductLines(newLines);
  };

  const addProductLine = () => {
    setProductLines([
      ...productLines,
      { ...defaultProductLine(), lineTotal: 0 },
    ]);
  };

  const removeProductLine = (idx: number) => {
    if (productLines.length > 1) {
      setProductLines(productLines.filter((_, i) => i !== idx));
    }
  };

  const net = productLines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  );
  const moms = productLines.reduce(
    (sum, line) => sum + (line.price * line.quantity * line.vatRate) / 100,
    0
  );
  const total = net + moms;

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setError({});
    try {
      const invoiceData = {
        ...form,
        invoiceNumber: generateTempInvoiceNumber(),
        telephoneNumber: form.telephone,
        items: productLines.map((line) => ({
          productName: line.productName,
          quantity: line.quantity,
          unit: line.unit,
          price: line.price,
          vatRate: line.vatRate,
          description: line.description,
          lineTotal: line.price * line.quantity * (1 + line.vatRate / 100),
        })),
        net,
        moms,
        amount: total,
        status: "Pending",
        currency: form.currency,
        language: form.language,
      };

      const response = await makePostRequest("invoices/create", invoiceData);

      if (response.data && response.data.success) {
        toast.success("Receipt created successfully");
        navigate(-1);
      } else {
        toast.error(response.data?.message || "Failed to create invoice");
      }
    } catch (err) {
      toast.error("An error occurred while creating the invoice");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await makeGetRequest("companyDetail/getCompanyDetailByUser");
        setCompany(response.data.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <>
      {showPrintView ? (
        <div className="printable-area font-plus-jakarta" ref={receiptRef}>
          <div className="p-6 max-w-full mx-auto bg-white">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-500">Receipt</h1>
              <div className="text-blue-500 font-bold text-xl">
                {company?.attachments ? (
                  <img
                    src={company.attachments}
                    alt="Company Attachment"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">N/A</div>
                )}
              </div>
            </div>

            <p className="text-sm text-black font-medium mb-2">Kvitto nummer</p>

            <div className="grid grid-cols-2 gap-2">
              <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Namn</h2>
                    <p className="font-normal text-[12px]">
                      {form.customerName || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Adress</h2>
                    <p className="font-normal text-[12px]">
                      {form.orgNumber || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Telefonnummer</h2>
                    <p className="font-normal text-[12px]">
                      {form.telephone || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Mail</h2>
                    <p className="font-normal text-[12px]">
                      {form.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Invoice Date</h2>
                    <p className="font-normal text-[12px]">
                      {form.invoiceDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Due Date</h2>
                    <p className="font-normal text-[12px]">
                      {form.dueDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">In Reference</h2>
                    <p className="font-normal text-[12px]">
                      {form.inReference || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Our Reference</h2>
                    <p className="font-normal text-[12px]">
                      {form.ourReference || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 border border-gray-300 rounded-md max-h-[45vh] min-h-[45vh] flex flex-col justify-between p-2 py-1">
              <div>
                <div className="text-white py-2 text-sm grid grid-cols-4">
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Produkt / tjänst
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    À-pris
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Moms
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Belopp
                  </span>
                </div>

                {productLines.map((line, idx) => (
                  <div key={idx} className="grid grid-cols-4">
                    <span className="p-2 border-b border-gray-100">
                      {line.productName || "-"}
                    </span>
                    <span className="p-2 border-b border-gray-100">
                      {line.price}
                    </span>
                    <span className="p-2 border-b border-gray-100">
                      {line.vatRate}
                    </span>
                    <span className="p-2 border-b border-gray-100">
                      {line.lineTotal}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex justify-end">
                  <div className="flex gap-4">
                    <div className="text-left">
                      <p className="font-medium">Netto:</p>
                      <p className="text-sm text-gray-500">
                        Moms %(beräknad på {net.toFixed(2)} kr)
                      </p>
                      <p className="text-sm text-gray-500">Öresutjämning:</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{net.toFixed(2)} kr</p>
                      <p className="text-sm text-gray-500">
                        {moms.toFixed(2)} kr
                      </p>
                      <p className="text-sm text-gray-500">0,00 kr</p>
                    </div>
                  </div>
                </div>

                <div className="text-end border-t border-gray-300 py-3">
                  <p className="text-xl font-bold">
                    Summa att betala: {total.toFixed(2)} kr
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-28 border border-gray-300 rounded-md px-2 py-3">
              <h3 className="text-sm font-semibold">Company information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Address: </p>
                    <p className="text-xs">{company.mailingAddress || "N/A"}</p>

                    <p className="w-20 text-xs">Postal Code:</p>
                    <p className="text-xs">{company.postalCode || "N/A"}</p>

                    <p className="w-20 text-xs">City: </p>
                    <p className="text-xs">{company?.city || "N/A"}</p>


                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Bank: </p>
                    <p className="text-xs">
                      {company.bankAccountNumber || "N/A"}
                    </p>
                    <p className="w-20 text-xs">IBAN: </p>
                    <p className="text-xs">
                      {company.iban_Bic || "N/A"}
                    </p>
                    <p className="w-20 text-xs">BIC/SWIFT: </p>
                    <p className="text-xs">
                      {company.iban_Bic || "N/A"}
                    </p>
                    <p className="w-20 text-xs">Swish: </p>
                    <p className="text-xs">
                      {company.swish_Number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              {/* <h3 className="text-sm font-semibold">Företagets e-post</h3> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:p-8 p-4 font-plus-jakarta bg-[#F6F8FA] min-h-screen">
          <div className="flex items-center mb-8">
            <button
              className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <BackArrowIcon />
              <span className="ml-2 text-lg font-medium">Create Receipt</span>
            </button>
            <button
              className="ml-auto bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-6 py-2 rounded-lg hover:bg-blue-800 cursor-pointer shadow-sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Receipt"}
            </button>
          </div>

          {Object.keys(error).length > 0 && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {Object.values(error).map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-8 border border-gray-100">
              <div className="bg-[#F0F7FF] rounded-lg p-4 mb-2 border-b border-blue-100">
                <h2 className="text-blue-900 font-semibold mb-2 text-base">
                  Customer Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {form.customerType === "Individual" && (
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Social Security Number
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="socialSecurityNumber"
                          placeholder="Social Security Number"
                          value={form.socialSecurityNumber || orgOrSsn}
                          onChange={(e) => {
                            setOrgOrSsn(e.target.value);
                            handleFormChange(e);
                          }}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                          type="button"
                          onClick={handleOrgOrPersonSearch}
                        >
                          Search
                        </button>
                      </div>
                      {searchError && (
                        <div className="text-red-600 text-sm mt-1">
                          {searchError}
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Customer Type
                    </label>
                    <select
                      name="customerType"
                      value={form.customerType}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Business">Business</option>
                      <option value="Individual">Individual</option>
                    </select>
                    
                  </div>
                  {form.customerType === "Business" && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Organization Number
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="orgNumber"
                          placeholder="Organization number"
                          value={form.orgNumber || orgOrSsn}
                          onChange={(e) => {
                            setOrgOrSsn(e.target.value);
                            handleFormChange(e);
                          }}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                          type="button"
                          onClick={handleOrgOrPersonSearch}
                        >
                          Search
                        </button>
                      </div>
                      {searchError && (
                        <div className="text-red-600 text-sm mt-1">
                          {searchError}
                        </div>
                      )}
                    </div>
                  )}
                  
                  
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Receipt Date
                    </label>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={form.invoiceDate}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={form.dueDate}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      In Reference
                    </label>
                    <input
                      type="text"
                      name="inReference"
                      value={form.inReference}
                      onChange={handleFormChange}
                      placeholder="Client reference..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Our Reference
                    </label>
                    <input
                      type="text"
                      name="ourReference"
                      value={form.ourReference}
                      onChange={handleFormChange}
                      placeholder="Our reference..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="Enter email address..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleFormChange}
                      placeholder="Enter telephone number..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-gray-100">
                <h2 className="text-blue-900 font-semibold mb-4 text-base">
                  Amount
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm mb-2 border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-[#F0F7FF] border-b border-blue-100">
                        <th className="p-2 text-start font-medium border-b border-blue-100">
                          Product/Service
                        </th>
                        <th className="p-2 text-start font-medium border-b whitespace-nowrap border-blue-100">
                          Price ({form.currency})
                        </th>
                        <th className="p-2 text-start font-medium border-b border-blue-100 whitespace-nowrap">
                          VAT (%)
                        </th>
                        <th className="p-2 text-start font-medium border-b border-blue-100 whitespace-nowrap">
                          Amount
                        </th>
                        <th className="p-2 text-start font-medium border-b border-blue-100 whitespace-nowrap">
                          Action            
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productLines.map((line, idx) => (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"
                          }
                        >
                          <td className="p-2 border-b border-gray-100">
                            {/* <input
                          type="text"
                          name="productName"
                          value={line.productName}
                          onChange={(e) => handleProductLineChange(idx, e)}
                          className="w-full border border-gray-300 rounded-lg p-1"
                          placeholder="Product name"
                        /> */}
                            <input
                              type="text"
                              name="productName"
                              value={line.productName}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full border border-gray-300 rounded-lg p-1 mt-1"
                              placeholder="Description"
                            />
                          </td>
                          <td className="p-2 border-b border-gray-100">
                            <input
                              type="number"
                              name="price"
                              value={line.price}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full border border-gray-300 rounded-lg p-1"
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2 w-16 border-b border-gray-100">
                            <select
                              name="vatRate"
                              value={line.vatRate}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full border border-gray-300 rounded-lg p-1"
                            >
                              <option value="25">25%</option>
                              <option value="12">12%</option>
                              <option value="6">6%</option>
                              <option value="0">0%</option>
                            </select>
                          </td>
                          <td className="p-2 border-b border-gray-100">
                            {line.lineTotal?.toFixed(2) || "0.00"}
                          </td>
                          <td className="p-2 border-b border-gray-100">
                            <button
                              type="button"
                              onClick={() => removeProductLine(idx)}
                              className="text-red-500 hover:text-red-700"
                              disabled={productLines.length <= 1}
                            >
                              <RemoveLineIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={addProductLine}
                    className="text-blue-700 flex items-center gap-1 mt-2 cursor-pointer border border-blue-100 bg-white px-4 py-1 rounded-lg shadow-sm hover:bg-blue-50"
                  >
                    <span>+</span> Add New Product Line
                  </button>
                </div>
                <div className="mt-6 text-right flex flex-col gap-3">
                  <div className="flex justify-between px-2 py-1 border-b border-gray-100">
                    <span className="text-gray-700">Net:</span>{" "}
                    <span className="font-semibold">
                      {net.toFixed(2)} {form.currency}
                    </span>
                  </div>
                  <div className="flex justify-between px-2 py-1 border-b border-gray-100">
                    <span className="text-gray-700">VAT:</span>{" "}
                    <span className="font-semibold">
                      {moms.toFixed(2)} {form.currency}
                    </span>
                  </div>
                  <div className="flex justify-between px-2 py-2 bg-[#F0F7FF] rounded-lg mt-2">
                    <span className="font-semibold">Total Amount:</span>{" "}
                    <span className="font-bold text-blue-900">
                      {total.toFixed(2)} {form.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col gap-8 printable-area"
              ref={receiptRef}
            >
              <div className="rounded-lg py-4 mb-2 border-b border-blue-100 flex items-center justify-between">
                <h2 className="text-[15px] text-gray-700 font-semibold">
                  Receipt{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (Preview in real time)
                  </span>
                </h2>
                <button
                  className="text-[#012F7A] hover:text-blue-700 cursor-pointer"
                  onClick={handlePrint}
                >
                  <InvoicePreviewIcon />
                </button>
              </div>
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                  Receipt
                </h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Receipt Number
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {generateTempInvoiceNumber()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Customer Type
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                  Receipt Recipient
                </h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Customer Name
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      N/A
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Org. Nr
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      559352-8598
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
                      Telephone Number
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.telephone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      In Reference
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.inReference || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Address
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      N/A
                      {/* {form.address || "N/A"} */}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Postal Code
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {/* {form.postancode || "N/A"} */}
                      N/A
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      City
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {/* {form.postancode || "N/A"} */}
                      N/A
                    </div>
                              
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                  Receipt Information
                </h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Receipt Date
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.invoiceDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Expiration Date
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.dueDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Our Reference
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.ourReference || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Currency
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      SEK
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <table className="min-w-full text-sm mb-2 border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#F0F7FF] border-b border-blue-100">
                      <th className="p-2 text-start font-medium border-b border-blue-100">
                        Description
                      </th>
                      <th className="p-2 text-start font-medium border-b border-blue-100">
                        Price
                      </th>
                      <th className="p-2 text-start font-medium border-b border-blue-100">
                        Moms
                      </th>
                      <th className="p-2 text-start font-medium border-b border-blue-100">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productLines.map((line, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"}
                      >
                        <td className="p-2 border-b border-gray-100">
                          {line.productName || "-"}
                        </td>
                        <td className="p-2 border-b border-gray-100">
                          {line.price}
                        </td>
                        <td className="p-2 border-b border-gray-100">
                          {line.vatRate}
                        </td>
                        <td className="p-2 border-b border-gray-100">
                          {line.lineTotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-2 text-right flex flex-col gap-3">
                <div className="flex justify-between px-2 py-1 border-b border-gray-100">
                  <span className="text-gray-700">Total excl. VAT:</span>{" "}
                  <span className="font-semibold">{net.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-2 py-1 border-b border-gray-100">
                  <span className="text-gray-700">Moms:</span>{" "}
                  <span className="font-semibold">{moms.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-2 py-2 bg-[#F0F7FF] rounded-lg mt-2">
                  <span className="font-semibold">To Pay:</span>{" "}
                  <span className="font-bold text-blue-900">
                    {total.toFixed(2)} {form.currency}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-5 text-center">
                Snyt Pilsnercafé AB • 123 Main Street, City, Zip Code • Tel:
                463133330
                <br />
                Bankgiro: 123–4567 • Org.nr: 559352–8598 • VAT: US123456789001
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReceipt;
