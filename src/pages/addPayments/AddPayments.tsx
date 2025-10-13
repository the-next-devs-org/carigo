import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetRequest, makePostRequest } from "../../api/Api";
import { Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUserProfile } from "../../utils/useUserProfile";
import {
  InfoCircleIcon,
  RemoveLineAltIcon,
  PaymentReceiptIcon,
  AddPaymentsBackArrowIcon,
} from "../../components/utils/Icons";
import { BACKEND_API_ENDPOINT } from "../../api/config";

interface AmountRow {
  amount: string;
  description: string;
}

const initialAmount: AmountRow = { amount: "", description: "" };

type SearchResult = { data?: any[] } | null;

const AddPayments = () => {
  const { user, loading: profileLoading } = useUserProfile();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPrintView, setShowPrintView] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<{
    person: SearchResult;
  }>({
    person: null,
  });
  console.log(companyLoading, profileLoading);
  const [form, setForm] = useState({
    reference: "",
    name: "",
    customerNumber: "",
    email: "",
    category: "",
    ssn: "",
    telephone: "",
    description: "",
    amounts: [{ ...initialAmount }],
  });

  useEffect(() => {
    const savedForm = sessionStorage.getItem("paymentFormData");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
      sessionStorage.removeItem("paymentFormData");
    }
  }, []);


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    // if (!form.name?.trim()) {
    //   newErrors.name = "Name is required";
    // }

    // SSN validation
    if (!form.ssn?.trim()) {
      newErrors.ssn = "SSN is required";
    }

    // Telephone validation
    if (!form.telephone?.trim()) {
      newErrors.telephone = "Telephone number is required";
    } else if (form.telephone.trim().length < 6) {
      newErrors.telephone = "Please enter a valid phone number";
    }

    // Amount validation
    let hasValidAmount = false;
    form.amounts.forEach((amount, index) => {
      const amountValue = parseFloat(amount.amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        if (!newErrors.amounts) {
          newErrors.amounts = `Amount ${index + 1} must be greater than 0`;
        }
      } else {
        hasValidAmount = true;
      }
    });

    if (!hasValidAmount && !newErrors.amounts) {
      newErrors.amounts = "At least one valid amount is required";
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Debugging line
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async (type: "PERSON", query: string) => {
    if (!query.trim()) {
      toast.error("Please enter a valid SSN to search");
      return;
    }

    setIsSearching(true);
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

      // Update form with search results if found
      if (data?.data?.[0]) {
        const person = data.data[0];
        setForm((prevForm) => ({
          ...prevForm,
          name: person.name?.givenName || prevForm.name,
          telephone: person.telephone || prevForm.telephone,
          email: person.email || prevForm.email,
        }));

        // Clear any previous errors for these fields
        setErrors((prev) => ({
          ...prev,
          name: "",
          telephone: "",
          ssn: "",
        }));

        toast.success("Customer information retrieved successfully");
      } else {
        toast.error("No customer found with this SSN");
        setErrors((prev) => ({
          ...prev,
          ssn: "No customer found with this SSN",
        }));
      }
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      toast.error("Failed to search customer information");
      setSearchResults((prev) => ({
        ...prev,
        [type.toLowerCase()]: null,
      }));
      setErrors((prev) => ({
        ...prev,
        ssn: "Error searching customer information",
      }));
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAmountChange = (
    idx: number,
    field: keyof AmountRow,
    value: string
  ) => {
    const updated = [...form.amounts];
    updated[idx][field] = value;
    setForm({ ...form, amounts: updated });

    if (errors.amounts) {
      setErrors((prev) => ({
        ...prev,
        amounts: "",
      }));
    }
  };

  // const handleSSNSearch = async () => {
  //   if (!form.ssn.trim()) {
  //     toast.error("Please enter a SSN to search");
  //     return;
  //   }

  //   setIsSearching(true);
  //   try {
  //     const response = await makeGetRequest(
  //       `payments/getCustomerContactInfo/${form.ssn}`
  //     );

  //     if (response.data.success) {
  //       const { customer_name, telephone_number } = response.data.data;
  //       setForm({
  //         ...form,
  //         name: customer_name || "",
  //         customerNumber: telephone_number || "",
  //       });
  //       toast.success("Customer information retrieved successfully");
  //     } else {
  //       toast.error(response.data.message || "No customer found with this SSN");
  //     }
  //   } catch (error: any) {
  //     console.error("Error searching SSN:", error);
  //     toast.error(
  //       error.response?.data?.message || "Failed to search customer information"
  //     );
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

  // const handleSSNSearch = async () => {
  //   if (!form.ssn.trim()) {
  //     toast.error("Please enter a SSN to search");
  //     setErrors((prev) => ({ ...prev, ssn: "SSN is required" }));
  //     return;
  //   }

  //   setIsSearching(true);
  //   try {
  //     const response = await makeGetRequest(
  //       `payments/getCustomerContactInfo/${form.ssn}`
  //     );

  //     if (response.data.success) {
  //       const { customer_name, telephone_number, email, customer_reference } =
  //         response.data.data;
  //       setForm({
  //         ...form,
  //         name: customer_name || "",
  //         telephone: telephone_number || "",
  //         email: email || form.email, // Keep existing if not provided
  //         reference: customer_reference || form.reference, // Keep existing if not provided
  //       });
  //       // Clear any previous errors for these fields
  //       setErrors((prev) => ({
  //         ...prev,
  //         name: "",
  //         telephone: "",
  //         ssn: "",
  //       }));
  //       toast.success("Customer information retrieved successfully");
  //     } else {
  //       toast.error(response.data.message || "No customer found with this SSN");
  //       setErrors((prev) => ({
  //         ...prev,
  //         ssn: "No customer found with this SSN",
  //       }));
  //     }
  //   } catch (error: any) {
  //     console.error("Error searching SSN:", error);
  //     toast.error(
  //       error.response?.data?.message || "Failed to search customer information"
  //     );
  //     setErrors((prev) => ({
  //       ...prev,
  //       ssn: "Error searching customer information",
  //     }));
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

  const addAmountRow = () => {
    setForm({ ...form, amounts: [...form.amounts, { ...initialAmount }] });
  };

  const removeAmountRow = (idx: number) => {
    setForm({ ...form, amounts: form.amounts.filter((_, i) => i !== idx) });
  };

  const total = form.amounts.reduce(
    (sum, a) => sum + (parseFloat(a.amount) || 0),
    0
  );

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const firstDescription = form.amounts[0]?.description || "Payment";

      const payload = {
        customer_reference: firstDescription,
        customer_name:
          searchResults.person?.data?.[0]?.name?.givenName ||
          form.name ||
          "Unknown Customer",
        payment_category: form.category,
        description: form.description,
        email: form.email,
        social_security_number: form.ssn,
        telephone_number: form.telephone,
        amount_items: form.amounts
          .filter((amount) => amount.amount && parseFloat(amount.amount) > 0)
          .map((amount) => ({
            amount: parseFloat(amount.amount),
            description: amount.description || "Payment item",
          })),
        total_amount: total,
      };

      const response = await makePostRequest("payments/createPayment", payload);

      if (response.data && response.data.success) {
        toast.success("Payment registered successfully!");
        navigate(-1);
      } else {
        toast.error(response.data?.message || "Failed to register payment");
      }
    } catch (error: any) {
      console.error("Error registering payment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to register payment";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await makeGetRequest("companyDetail/getCompanyDetailByUser");
        setCompany(response.data.data); // assume backend se company object aa raha hai
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
              <h1 className="text-2xl font-bold text-[#332f2f]">
                Swish kvitto
              </h1>
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

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-[#332f2f] mb-2">
                  Betalare
                </h2>
                <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Company: </p>
                    <p className="text-xs">
                      {company.company_name || "N/A"}
                    </p>

                    <p className="w-20 text-xs">ORG NO: </p>
                    <p className="text-xs">{company.registrationNumber || "asdf/A"}</p>

                    <p className="w-20 text-xs">Telephone:</p>
                    <p className="text-xs">{company.phoneNumber || "adsf/A"}</p>

                    <p className="w-20 text-xs">Email: </p>
                    <p className="text-xs">{user?.email || "fads/A"}</p>

                    <p className="w-20 text-xs">Address: </p>
                    <p className="text-xs">
                      {company.mailingAddress || "hello worl/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-[#332f2f] mb-2">
                  Mottagare
                </h2>
                <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Name: </p>
                    <p className="text-xs">
                      {searchResults.person?.data?.[0]?.name?.givenName ||
                        form.name ||
                        "N/A"}
                    </p>

                    <p className="w-20 text-xs">SSN: </p>
                    <p className="text-xs">{form.ssn || "N/A"}</p>

                    <p className="w-20 text-xs">Telephone:</p>
                    <p className="text-xs">{form.telephone || "N/A"}</p>

                    <p className="w-20 text-xs">Email: </p>
                    <p className="text-xs">{form.email || "N/A"}</p>

                    <p className="w-20 text-xs">Address: </p>
                    <p className="text-xs">
                      {searchResults.person?.data?.[0]?.addresses?.[0]
                        ?.street &&
                        searchResults.person?.data?.[0]?.addresses?.[0]?.number
                        ? `${searchResults.person?.data?.[0]?.addresses?.[0]?.street} ${searchResults.person?.data?.[0]?.addresses?.[0]?.number}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-white py-2 rounded text-sm flex justify-between">
                <span className="font-semibold text-xl text-[#332f2f]">
                  Referens
                </span>
                <span className="font-semibold text-xl text-[#332f2f]">
                  Belopp
                </span>
              </div>
              <div className="mb-2 border border-gray-300 rounded-md max-h-[40vh] min-h-[40vh] flex flex-col justify-between p-2 py-1">
                <div>
                  {form.amounts.map((a, idx) => (
                    <div key={idx} className="flex justify-between mt-1">
                      <span>{a.description || "-"}</span>
                      <span>{a.amount ? `${a.amount} kr` : "0 kr"}</span>
                    </div>
                  ))}
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
        <div className="flex flex-col lg:gap-8 gap-4 w-full items-start justify-center bg-[#F6F8FB] lg:p-6 p-4 font-plus-jakarta">
          <div>
            {isLoading ? (
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                <AddPaymentsBackArrowIcon className="w-6 h-6" />
                <span className="ml-2">Add Payment</span>
              </button>
            ) : (
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <AddPaymentsBackArrowIcon className="w-6 h-6" />
                <span className="ml-2">Add Payment</span>
              </button>
            )}
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E6EAF0] lg:p-8 p-4 flex-1 w-full no-print">
              <div className="bg-[#F4F8FF] border border-[#C7E0FF] text-[#012F7A] rounded-lg px-4 py-3 mb-7 flex items-center gap-2 text-sm">
                <InfoCircleIcon />
                If you have a limit per transaction, you can make several
                transactions at once instead of creating a new payment for each
                one."
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* <div>
                  <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                    Customer Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${
                      errors.name ? "border-red-500" : "border-[#E6EAF0]"
                    }`}
                    placeholder="Enter customer name..."
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div> */}

                {/* SSN Field - Update this section */}
                {/* <div className="relative">
                    <input
                      name="ssn"
                      value={form.ssn}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${
                        errors.ssn ? "border-red-500" : "border-[#E6EAF0]"
                      }`}
                      placeholder="Enter SSN..."
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 left-[85%] z-50 pl-3 flex items-center cursor-pointer">
                      <Search className="h-4 w-4 text-blue-600" />
                    </div>
                  </div> */}
                {/* <div className="flex items-center gap-2">
                    <input
                      name="ssn"
                      placeholder="Enter SSN..."
                      value={form.ssn}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer"
                      type="button"
                      // onClick={handleOrgOrPersonSearch}
                    >
                      Search
                    </button>
                  </div>
                  {errors.ssn && (
                    <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>
                  )}
                            
                </div> */}

                {/* SSN Field - Update this section */}
                <div>
                  <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                    Social Security Number (SSN) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      name="ssn"
                      placeholder="Enter SSN..."
                      value={form.ssn}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.ssn ? "border-red-500" : "border-[#E6EAF0]"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      className="rounded-lg bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white px-4 py-2 cursor-pointer flex items-center justify-center min-w-[100px]"
                      type="button"
                      onClick={() => handleSearch("PERSON", form.ssn)}
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </button>
                  </div>
                  {errors.ssn && (
                    <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>
                  )}
                </div>
                {/* Telephone Field - Update this section */}
                <div>
                  <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                    Telephone Number *
                  </label>
                  <input
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${errors.telephone ? "border-red-500" : "border-[#E6EAF0]"
                      }`}
                    placeholder="Enter telephone number..."
                    disabled={isLoading}
                  />
                  {errors.telephone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.telephone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${errors.email ? "border-red-500" : "border-[#E6EAF0]"
                      }`}
                    placeholder="Enter email address..."
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                    Payment Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${errors.category ? "border-red-500" : "border-[#E6EAF0]"
                      }`}
                    disabled={isLoading}
                  >
                    <option value="">Select payment category...</option>
                    <option value="CarPurchase">Car Purchase</option>
                    <option value="TirePurchase">Tire Purchase</option>
                    <option value="Service&Workshop">Service & Workshop</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Expenses">Expenses</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-[#E6EAF0] rounded-lg px-3 py-2 text-[13px] bg-[#F9FAFB] min-h-[60px] focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  placeholder="Enter any specific details or comments here..."
                  disabled={isLoading}
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E6EAF0] p-6 pt-0 mb-6 min-h-[230px] max-h-[230px] overflow-y-auto">
                <div className="font-semibold text-[#23272E] mb-4 text-[15px] sticky top-0 z-50 bg-white pt-5">
                  Amount *
                </div>
                {errors.amounts && (
                  <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-red-600 text-xs">{errors.amounts}</p>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  {form.amounts.map((a, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border border-[#E6EAF0] rounded-lg p-4 relative bg-[#F9FAFB]"
                    >
                      <div>
                        <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                          Amount (kr)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          name="amount"
                          value={a.amount}
                          onChange={(e) =>
                            handleAmountChange(idx, "amount", e.target.value)
                          }
                          className="w-full border border-[#E6EAF0] rounded-lg px-3 py-2 text-[13px] bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                          placeholder="Enter amount..."
                          disabled={isLoading}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="w-full">
                          <label className="block text-[13px] text-[#23272E] mb-1 font-medium">
                            Reference
                          </label>
                          <input
                            name="description"
                            value={a.description}
                            onChange={(e) =>
                              handleAmountChange(
                                idx,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full border border-[#E6EAF0] rounded-lg px-3 py-2 text-[13px] bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            placeholder="Enter description..."
                            disabled={isLoading}
                          />
                        </div>
                        {form.amounts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAmountRow(idx)}
                            className="text-red-500 hover:text-red-700 p-2 flex items-center justify-center cursor-pointer"
                            tabIndex={-1}
                            disabled={isLoading}
                          >
                            <RemoveLineAltIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addAmountRow}
                  className="flex items-center justify-center gap-1 text-[#012F7A] font-semibold mt-6 hover:underline w-full cursor-pointer"
                  disabled={isLoading}
                >
                  <span className="text-lg leading-none mb-1">+</span> Add
                  Another Amount
                </button>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 border border-[#012F7A] text-[#012F7A] rounded-lg py-2 font-semibold hover:bg-[#F4F8FF] transition cursor-pointer"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-[#012F7A] text-white rounded-lg py-2 font-semibold hover:bg-[#012F7A]/90 transition flex items-center justify-center gap-2 cursor-pointer"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Registering...
                    </>
                  ) : (
                    "Register Payment"
                  )}
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E6EAF0] lg:p-8 p-4 flex-1 w-full flex flex-col printable-area">
              <div className="flex items-center justify-between mb-6 no-print">
                <div className="text-lg font-semibold text-gray-900 flex lg:flex-row flex-col lg:items-center lg:gap-2 gap-1">
                  Payment Receipt{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (Preview in real time)
                  </span>
                </div>
                <button
                  onClick={handlePrint}
                  className="text-[#012F7A] hover:text-blue-700 cursor-pointer no-print"
                >
                  <PaymentReceiptIcon />
                </button>
              </div>
              <div className="no-print">
                <div className="grid grid-cols-2 gap-4 mb-4 text-[13px]">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Category</div>
                    <div className="text-gray-900 font-medium">
                      {form.category || "N/A"}
                    </div>

                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Date</div>
                    <div className="text-gray-900 font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="font-semibold text-[#23272E] mb-2 text-[14px]">
                    Payment recipient
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        Customer Name
                      </div>
                      <div className="text-gray-900 font-medium">
                        {searchResults.person?.data?.[0]?.name?.givenName ||
                          form.name ||
                          "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        Social Security Number (SSN)
                      </div>
                      <div className="text-gray-900 font-medium">
                        {form.ssn || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        Telephone
                      </div>
                      <div className="text-gray-900 font-medium">
                        {form.telephone || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <div className="text-gray-900 font-medium">
                        {form.email || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Address</div>
                      <div className="text-gray-900 font-medium">
                        {" "}
                        {searchResults.person?.data?.[0]?.addresses?.[0]
                          ?.street &&
                          searchResults.person?.data?.[0]?.addresses?.[0]?.number
                          ? `${searchResults.person?.data?.[0]?.addresses?.[0]?.street} ${searchResults.person?.data?.[0]?.addresses?.[0]?.number}`
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        Postal Code
                      </div>
                      <div className="text-gray-900 font-medium">
                        {" "}
                        {searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                          ? searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">City</div>
                      <div className="text-gray-900 font-medium">
                        {" "}
                        {searchResults.person?.data?.[0]?.addresses?.[0]?.city
                          ? searchResults.person?.data?.[0]?.addresses?.[0]
                            ?.city
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="font-semibold text-[#23272E] mb-2 text-[14px]">
                    Description
                  </div>
                  <div className="text-[13px] text-gray-900 font-medium">
                    {form.description || "N/A"}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-[#23272E] mb-2 text-[14px]">
                    Payment Information
                  </div>
                  <div className="text-[13px] text-gray-900 font-medium">
                    {form.amounts.map((a, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{a.description || "-"}</span>
                        <span>{a.amount ? `${a.amount} kr` : "0 kr"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 text-base border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>{total} kr</span>
                </div>
                {/* <div className="mt-8 text-xs text-gray-400 leading-5 text-center">
                  Org.nr: 556789-1234 Helsingborgsvägen 123, 252 31 Helsingborg
                  <br />
                  Tel: 042-12 34 56 | info@lindstrommobil.se
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPayments;
