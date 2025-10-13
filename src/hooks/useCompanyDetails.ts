import { useState, useEffect } from "react";
import { makeGetRequest, makePutRequest } from "../api/Api";
import toast from "react-hot-toast";

export interface CompanyDetails {
  company_name: string;
  registrationNumber: string;
  legalEntityType: string;
  dateOfRegistration: string;
  vatNumber: string;
  industry_code: string;
  business_description: string;
  preferred_language: string;
  
  // Address details
  visitingAddress: string | object;
  mailingAddress: string | object;
  postalCode: string;
  city: string;
  country: string;
  
  // Contact information
  contactPerson: string;
  emailAddress: string;
  phoneNumber: string;
  roleTitle: string;
  
  // Payment settings
  bankAccountNumber: string;
  iban_Bic: string;
  swish_Number: string;
  payment_Terms: string;
  late_payment_interest_rate: string | number;
  invoice_Fee: string | number;
  
  // Invoice settings
  invoice_number_counter: string | number;
  invoice_number_prefix: string;
  currency: string;
  invoice_language: string;
  reference_person: string;
  
  // Contract settings
  default_invoice_message: string;
  contract_duration: string | number;
  signing_method: string;
  contract_version_control: string;
  contract_contact_person: string;
  contract_terms: string;
  
  // Logo
  upload_logo?: string;
}

export type CompanyUpdateType = 
  | "Company Information"
  | "Address Details"
  | "Contact Information"
  | "Payment Settings"
  | "Invoice Settings"
  | "Contract Settings";

export interface CompanyUpdateData {
  type: CompanyUpdateType;
  [key: string]: any;
}

export const useCompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeGetRequest("companyDetail/getCompanyDetailByUser");
      
      if (response.data.success) {
        setCompanyDetails(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch company details");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching company details");
      console.error("Error fetching company details:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyDetails = async (
    updateData: CompanyUpdateData,
    logoFile?: File
  ): Promise<boolean> => {
    try {
      setError(null);

      // Create FormData for handling file uploads
      const formDataToSend = new FormData();

      // Append logo file if exists
      if (logoFile) {
        formDataToSend.append("upload_logo", logoFile);
      }

      // Append all keys from updateData
      for (const [key, value] of Object.entries(updateData)) {
        if (typeof value === "object" && value !== null) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      }

      const response = await makePutRequest(
        "companyDetail/update",
        formDataToSend
      );

      if (response.data.success) {
        toast.success(`${updateData.type} updated successfully`);
        // Refetch the updated data
        await fetchCompanyDetails();
        return true;
      } else {
        throw new Error(response.data.message || "Failed to update company details");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while updating company details";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error updating company details:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  return {
    companyDetails,
    loading,
    error,
    refetch: fetchCompanyDetails,
    updateCompanyDetails,
  };
};

// Helper function to create update data for different sections
export const createCompanyUpdateData = {
  companyInformation: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Company Information",
    company_name: formData.company_name,
    registrationNumber: formData.registration_number,
    legalEntityType: formData.legal_entity_type,
    dateOfRegistration: formData.date_of_registration,
    vatNumber: formData.vat_number,
    industry_code: formData.industry_code,
    preferred_language: formData.system_language,
    business_description: formData.business_description,
  }),

  addressDetails: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Address Details",
    visitingAddress: {
      street: formData.visiting_address,
      floor: formData.floor || "N/A",
      door: formData.door || "N/A",
    },
    mailingAddress: {
      street: formData.mailing_address,
      city: formData.city,
    },
    postalCode: formData.postal_code,
    city: formData.city,
    country: formData.country,
  }),

  contactInformation: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Contact Information",
    contactPerson: `${formData.first} ${formData.last}`,
    emailAddress: formData.email,
    phoneNumber: formData.phone,
    roleTitle: formData.role,
  }),

  paymentSettings: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Payment Settings",
    bankAccountNumber: formData.bank_account_number,
    iban_Bic: formData.iban,
    swish_Number: formData.swish_number,
    payment_Terms: formData.payment_terms,
    late_payment_interest_rate: formData.late_payment_interest_rate,
    invoice_Fee: formData.invoice_fee,
  }),

  invoiceSettings: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Invoice Settings",
    invoice_number_counter: formData.invoice_counter,
    currency: formData.currency,
    invoice_language: formData.invoice_language,
    reference_person: formData.reference_person,
    invoice_number_prefix: formData.invoice_number_prefix,
  }),

  contractSettings: (formData: Record<string, any>): CompanyUpdateData => ({
    type: "Contract Settings",
    default_invoice_message: formData.default_invoice_message,
    contract_duration: formData.default_contract_duration,
    signing_method: formData.signing_method,
    contract_version_control: formData.contract_version_control,
    contract_contact_person: formData.contract_contact_person,
    contract_terms: formData.contract_terms,
  }),
};
