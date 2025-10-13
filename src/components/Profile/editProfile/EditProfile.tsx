import { useState, useEffect } from "react";
import { useUserProfile } from "../../../utils/useUserProfile";
import { makeGetRequest, makePutRequest } from "../../../api/Api";
import { Loader2, Search } from "lucide-react";
import toast from "react-hot-toast";
import ChangePasswordModal from "../../models/ChangePasswordModal";
import { BACKEND_API_ENDPOINT } from "../../../api/config";
import Select from "react-select";


export type SectionKey =
  | "company_information"
  | "address_details"
  | "contact_information"
  | "payment_settings"
  | "invoice_settings"
  | "contract_settings";
// | "other_settings";

interface EditProfileProps {
  onUpdateSuccess?: () => void;
  section: SectionKey;
}

interface OrgSearchResponse {
  success: boolean;
  type: "ORG";
  keyword: string;
  count: number;
  data: {
    _type: "SE_ORG";
    id: string;
    country: string;
    legalId: string;
    addresses: [
      {
        _type: string;
        kind: string;
        country: string;
        street: string;
        number: string;
        zip: string;
        city: string;
        county: string;
        municipality: string;
      },
      {
        _type: string;
        kind: string;
        country: string;
        street: string;
        number: string;
        zip: string;
        city: string;
        county: string;
        municipality: string;
      }
    ];
    phones: {
      _type: string;
      number: string;
      areaCode: string;
      kind: string;
      registeredSince: string;
    }[];
    orgName: {
      name: string;
      rawName: string;
    };
    lifecycle: {
      status: {
        value: string;
      };
      establishedInYear: number;
      establishedOn: string;
    };
    primaryBusinessCategory: {
      code: string;
      description: string;
    };
    taxInfo: {
      vatNumber: string;
      fskattPayer: boolean;
      vatPayer: boolean;
      employer: boolean;
    };
    legalForm: {
      code: string;
      name: string;
    };
  }[];
}

const sectionTitles = {
  company_information: "Company Information",
  // address_details: "Address Details",
  contact_information: "Contact Information",
  payment_settings: "Payment Settings",
  invoice_settings: "Invoice Settings",
  contract_settings: "Contract Settings",
  // other_settings: "Other Settings",
};

const sectionFields = {
  company_information: [
    { name: "company_name", label: "Company Name", type: "text" },
    { name: "registration_number", label: "Organisation Number", type: "text" },
    { name: "company_mailadress", label: "Company Mailadress", type: "text" },
    { name: "company_phone_number", label: "Company Phone Number", type: "text" },
    { name: "legal_entity_type", label: "Legal Entity Type", type: "text" },
    {
      name: "date_of_registration",
      label: "Date of Registration",
      type: "date",
    },
    { name: "vat_number", label: "VAT Number", type: "text" },
    { name: "industry_code", label: "Industry Code", type: "text" },
    { name: "visiting_address", label: "Visiting Address", type: "text" },
    { name: "mailing_address", label: "Mailing Address", type: "text" },
    { name: "postal_code", label: "Postal Code", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "country", label: "Country", type: "text" },
    {
      name: "business_description",
      label: "Business Description",
      type: "textarea",
    },
    { name: "upload_logo", label: "Upload Logo", type: "file" },
    {
      name: "system_language",
      label: "System Language",
      type: "select0",
      multiple: true,
      options: [
        { value: "Svenska", label: "Svenska" },
        { value: "Engelska", label: "Engelska" },
      ]
    },





    // { name: "f_tax_status", label: "F-tax Status", type: "checkbox" },
  ],
  address_details: [
    // { name: "visiting_address", label: "Visiting Address", type: "text" },
    // { name: "mailing_address", label: "Mailing Address", type: "text" },
    // { name: "postal_code", label: "Postal Code", type: "text" },
    // { name: "city", label: "City", type: "text" },
    // { name: "country", label: "Country", type: "text" },
  ],
  contact_information: [
    { name: "first", label: "First Name", type: "text" },
    { name: "last", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "role", label: "Role/Title", type: "text" },
  ],
  payment_settings: [
    { name: "bank_account_number", label: "Bank Account", type: "text" },
    { name: "iban", label: "IBAN", type: "text" },
    { name: "bic_swift", label: "BIC/SWIFT", type: "text" },
    { name: "swish_number", label: "Swish Number", type: "text" },

  ],
  invoice_settings: [
    {
      name: "invoice_number_prefix",
      label: "Invoice Number Prefix",
      type: "text",
    },
    { name: "invoice_counter", label: "Invoice Counter", type: "number" },
    { name: "payment_terms", label: "Invoice Payment Terms", type: "text" },
    {
      name: "late_payment_interest_rate",
      label: "Invoice Late Payment Interest",
      type: "number",
    },
    { name: "invoice_fee", label: "Invoice Fee", type: "number" },
    { name: "currency", label: "Currency", type: "text" },
    { name: "invoice_language", label: "Language", type: "text" },
    { name: "reference_person", label: "Reference Person", type: "text" },
  ],
  contract_settings: [
    {
      name: "default_invoice_message",
      label: "Default Invoice Message",
      type: "textarea",
    },
    {
      name: "default_contract_duration",
      label: "Contract Duration (months)",
      type: "number",
    },
    { name: "signing_method", label: "Signing Method", type: "text" },
    {
      name: "contract_version_control",
      label: "Contract Version Control",
      type: "text",
    },
    {
      name: "contract_contact_person",
      label: "Contract Contact Person",
      type: "text",
    },
    {
      name: "contract_terms",
      label: "Contract Terms",
      type: "textarea",
    },
  ],
  // other_settings: [
  // { name: "api_keys", label: "API Keys", type: "text" },
  // { name: "tax_settings", label: "Tax Settings", type: "text" },
  // ],
};

const EditProfile = ({ onUpdateSuccess, section }: EditProfileProps) => {
  const { user, loading: profileLoading } = useUserProfile();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoPreviewUrl(URL.createObjectURL(file));
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setFormData({
  //       ...user,
  //       // Initialize any missing fields with empty values
  //       // company_name: user.company_name || "",
  //       // registration_number: user.registration_number || "",
  //       // Initialize all other fields similarly
  //     });
  //   }
  // }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOrgSearch = async () => {
    const orgNumber = formData.registration_number;


    if (!orgNumber) {
      setSearchError("Organization number is required");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    try {
      console.log("Attempting to search organization with number:", orgNumber);
      console.log(
        "Using endpoint:",
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`
      ); // Debug log

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
            type: "ORG",
            query: orgNumber,
          }),
        }
      );

      console.log("API response status:", response.status);


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData); // Debug log
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data: OrgSearchResponse = await response.json();
      console.log("API success response:", data); // Debug log

      if (data.success && data.count > 0) {
        const orgData = data.data[0];
        console.log("Organization data:", orgData); // Debug log

        // Get primary address (VISIT or first available)
        const primaryAddress =
          orgData.addresses.find((a) => a.kind === "VISIT") ||
          orgData.addresses[0];
        console.log("Primary address:", primaryAddress); // Debug log

        // Get primary phone (OFFICIAL or first available)
        const primaryPhone =
          orgData.phones.find((p) => p.kind === "OFFICIAL") ||
          orgData.phones[0];
        console.log("Primary phone:", primaryPhone); // Debug log

        const formatAddress = (addr: any) => {
          if (!addr) return "";
          return `${addr.street} ${addr.number}, ${addr.zip} ${addr.city}`;
        };

        const visitingAddress = orgData.addresses.find((a) => a.kind === "VISIT");
        const mailingAddress = orgData.addresses.find((a) => a.kind === "MAIL");



        const updatedData = {
          company_name: orgData.orgName.name,
          registration_number: orgData.legalId,
          vat_number: orgData.taxInfo.vatNumber,
          legal_entity_type: orgData.legalForm?.name || "",
          date_of_registration: orgData.lifecycle.establishedOn,
          industry_code: orgData.primaryBusinessCategory.code,
          business_description: orgData.primaryBusinessCategory.description,

          // 👇 ab full address string jaegi inputs me
          visiting_address: formatAddress(visitingAddress),
          mailing_address: formatAddress(mailingAddress),

          postal_code: visitingAddress?.zip || "",
          city: visitingAddress?.city || "",
          country: visitingAddress?.country || "",

          phone: primaryPhone?.number || "",
        };

        console.log("Updating form with:", updatedData);
        setFormData((prev) => ({ ...prev, ...updatedData }));

        toast.success("Organization details loaded successfully");
      } else {
        setSearchError("No organization found with this number");
      }
    } catch (error) {
      console.error("Error searching organization:", error);
      setSearchError("Failed to search organization. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const response = await makeGetRequest(
        "companyDetail/getCompanyDetailByUser"
      );
      console.log("Company details response:", response);

      if (response.data.success) {
        const company = response.data.data;



        let visiting: any = {};
        let mailing: any = {};

        console.log(visiting, mailing);

        if (company.visitingAddress) {
          try {
            visiting = JSON.parse(company.visitingAddress);
          } catch {
            visiting = { address: company.visitingAddress };
          }
        }

        if (company.mailingAddress) {
          try {
            mailing = JSON.parse(company.mailingAddress);
          } catch {
            mailing = { address: company.mailingAddress };
          }
        }


        const flattened = {
          company_name: company.company_name || "",
          registration_number: company.registrationNumber || "",
          legal_entity_type: company.legalEntityType || "",
          date_of_registration: company.dateOfRegistration?.split("T")[0] || "",
          vat_number: company.vatNumber || "",
          industry_code: company.industry_code || "",
          business_description: company.business_description || "",
          system_language: company.preferred_language || "",
          country: company.country || "",
          city: company.city || "",
          postal_code: company.postalCode || "",

          // 👇 direct backend se string use karo
          visiting_address: company.visitingAddress || "",
          mailing_address: company.mailingAddress || "",
          company_mailadress: company.company_mailaddress || "",
          company_phone_number: company.company_phonenumber || "",



          first: company.first || "",
          last: company.last || "",
          email: company.emailAddress || "",
          phone: company.phoneNumber || "",
          role: company.roleTitle || "",

          bank_account_number: company.bankAccountNumber || "",
          iban: company.iban_Bic || "",
          swish_number: company.swish_Number || "",
          bic_swift: company.bicSwift || "",
          payment_terms: company.payment_Terms || "",
          late_payment_interest_rate: company.late_payment_interest_rate || "",
          invoice_fee: company.invoice_Fee || "",

          invoice_number_prefix: company.invoice_number_prefix || "",
          invoice_counter: company.invoice_number_counter || "",
          currency: company.currency || "",
          invoice_language: company.invoice_language || "",
          reference_person: company.reference_person || "",

          default_invoice_message: company.default_invoice_message || "",
          default_contract_duration: company.contract_duration || "",
          signing_method: company.signing_method || "",
          contract_version_control: company.contract_version_control || "",
          contract_contact_person: company.contract_contact_person || "",
          contract_terms: company.contract_terms || "",
        };



        setFormData(flattened);

        if (company.attachments) {
          setLogoPreviewUrl(company.attachments);
        }
      } else {
        toast.error(response.data.message || "Failed to fetch company details");
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> | Event
  ) => {
    event.preventDefault();
    if (!user) return;

    setIsUpdating(true);

    try {
      let updateData: Record<string, any> = {};

      switch (section) {
        case "company_information":
          updateData = {
            type: "Company Information",
            company_name: formData.company_name,
            registrationNumber: formData.registration_number,
            legalEntityType: formData.legal_entity_type,
            dateOfRegistration: formData.date_of_registration,
            vatNumber: formData.vat_number,
            industry_code: formData.industry_code,
            preferred_language: formData.system_language,
            business_description: formData.business_description,
            system_language: formData.system_language,
            visiting_address: formData.visiting_address,
            mailing_address: formData.mailing_address,
            postalCode: formData.postal_code,
            city: formData.city,
            country: formData.country,
            company_mailadress: formData.company_mailadress,
            company_phone_number: formData.company_phone_number,
          };
          break;

        // case "address_details":
        //   updateData = {
        //     type: "Address Details",
        //     visitingAddress: {
        //         street: formData.visiting_address,
        //         floor: formData.floor || "N/A",
        //         door: formData.door || "N/A",
        //       },
        //       mailingAddress: {
        //         street: formData.mailing_address,
        //         city: formData.city,
        //       },

        //     postalCode: formData.postal_code,
        //     city: formData.city,
        //     country: formData.country,
        //   };
        //   break;


        case "contact_information":
          updateData = {
            type: "Contact Information",
            first: formData.first,
            last: formData.last,
            emailAddress: formData.email,
            phoneNumber: formData.phone,
            user: formData.role,
          };
          break;

        case "payment_settings":
          updateData = {
            type: "Payment Settings",
            bankAccountNumber: formData.bank_account_number,
            iban_Bic: formData.iban,
            bicSwift: formData.bic_swift,
            swish_Number: formData.swish_number,
            payment_Terms: formData.payment_terms,
            late_payment_interest_rate: formData.late_payment_interest_rate,
            invoice_Fee: formData.invoice_fee,
          };
          break;

        case "invoice_settings":
          updateData = {
            type: "Invoice Settings",
            invoice_number_counter: formData.invoice_counter,
            currency: formData.currency,
            invoice_language: formData.invoice_language,
            reference_person: formData.reference_person,
            invoice_number_prefix: formData.invoice_number_prefix,
          };
          break;

        case "contract_settings":
          updateData = {
            type: "Contract Settings",
            default_invoice_message: formData.default_invoice_message,
            contract_duration: formData.default_contract_duration,
            signing_method: formData.signing_method,
            contract_version_control: formData.contract_version_control,
            contract_contact_person: formData.contract_contact_person,
            contract_terms: formData.contract_terms,
          };
          break;

        default:
          throw new Error("Invalid section");
      }

      // ✅ Create FormData and append the fields
      const formDataToSend = new FormData();

      // Append logo file if exists
      if (logoFile) {
        formDataToSend.append("file", logoFile);
      }

      // Append all keys from updateData
      for (const [key, value] of Object.entries(updateData)) {
        if (typeof value === "object") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      }
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);

      }


      if (section === "company_information") {
        const response = await makePutRequest(
          `companyDetail/update`,
          formDataToSend,
          "multipart/form-data"
        );


        if (response.data.success) {
          toast.success(`${sectionTitles[section]} updated successfully`);
          if (onUpdateSuccess) onUpdateSuccess();
        } else {
          throw new Error(response.data.message || "Failed to update profile");
        }
      } else {
        const response = await makePutRequest(
          `companyDetail/update`,
          updateData
        );
        if (response.data.success) {
          toast.success(`${sectionTitles[section]} updated successfully`);
          if (onUpdateSuccess) onUpdateSuccess();
        } else {
          throw new Error(response.data.message || "Failed to update profile");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (section === "address_details") {
    return null;
  }
  if (section === "contract_settings") {
    return null;
  }


  console.log("-------------------------------------------------------");
  console.log("Rendering form with data:", formData);
  console.log("-------------------------------------------------------");





  return (
    <div className="bg-white rounded-2xl p-6 mb-6 dashboard-cards font-plus-jakarta">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {sectionTitles[section]}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {sectionFields[section].map((field) => (
          <div
            key={field.name}
            className={
              field.type === "textarea" || field.name === "registration_number"
                ? "md:col-span-1"
                : ""
            }
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>

            {/* Special UI for registration_number field */}
            {field.name === "registration_number" ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleOrgSearch}
                    disabled={isSearching || !formData.registration_number}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {searchError && (
                  <p className="mt-1 text-sm text-red-600">{searchError}</p>
                )}
              </div>
            ) : field.type === "select0" ? (
              <Select
                name={sectionFields.company_information[15].name}
                options={sectionFields.company_information[15].options?.map((opt: any) =>
                  typeof opt === "string"
                    ? { value: opt.toLowerCase().replace(/\s+/g, "_"), label: opt }
                    : opt
                )}
                onChange={(selectedOption) => {
                  // Handle both single and multiple selections
                  if (Array.isArray(selectedOption)) {
                    setFormData((prev) => ({
                      ...prev,
                      [sectionFields.company_information[15].name]: selectedOption.map(opt => opt.value),
                    }));
                  }
                  else {
                    setFormData((prev) => ({
                      ...prev,
                      [sectionFields.company_information[15].name]: selectedOption ? selectedOption.value : "",
                    }));
                  }
                }}
                value={
                  sectionFields.company_information[15].multiple
                    ? (sectionFields.company_information[15].options?.filter((opt: any) =>
                      formData[sectionFields.company_information[15].name]?.includes(opt.value)
                    ) || [])
                    : sectionFields.company_information[15].options?.find((opt: any) =>
                      opt.value === formData[sectionFields.company_information[15].name]
                    ) || null
                }
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder={sectionFields.company_information[15].label}
              />
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            ) : field.name === "upload_logo" ? (
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="upload-logo"
                />
                <label htmlFor="upload-logo" className="cursor-pointer block">
                  {logoPreviewUrl ? (
                    <img
                      src={logoPreviewUrl}
                      alt="Preview"
                      className="mx-auto h-24 object-contain mb-2"
                    />
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        Drag and drop your logo here
                      </p>
                      <p className="text-sm text-blue-600 underline">
                        or click to upload
                      </p>
                    </>
                  )}
                </label>
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => console.log("Field4:", field.name, "Value:", formData[field.name])}
              />
            )}
          </div>
        ))}
      </form>
      <div className="flex flex-col md:flex-row gap-3 justify-end mb-4 w-full">

        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="w-fit border border-blue-700 text-[#012F7A] px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors cursor-pointer"
        >
          Change Password
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(new Event("submit") as any)}
          disabled={isUpdating}
          className="w-fit bg-[#012F7A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isUpdating ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-lg leading-none mb-1">+</span> Save Changes
            </span>
          )}
        </button>
      </div>
      {user?.user_id && (
        <ChangePasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          userId={user.user_id}
        />
      )}
    </div>

  );
};

export default EditProfile;
