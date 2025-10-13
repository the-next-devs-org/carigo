import type { CompanyDetails } from "../hooks/useCompanyDetails";
import { BACKEND_API_ENDPOINT } from "../api/config";

export interface FlattenedCompanyDetails {
  // Company Information
  company_name: string;
  registration_number: string;
  legal_entity_type: string;
  date_of_registration: string;
  vat_number: string;
  industry_code: string;
  business_description: string;
  system_language: string;

  // Address Details
  visiting_address: string;
  floor: string;
  door: string;
  mailing_address: string;
  city: string;
  country: string;
  postal_code: string;

  // Contact Information
  first: string;
  last: string;
  email: string;
  phone: string;
  role: string;

  // Payment Settings
  bank_account_number: string;
  iban: string;
  swish_number: string;
  payment_terms: string;
  late_payment_interest_rate: string;
  invoice_fee: string;

  // Invoice Settings
  invoice_number_prefix: string;
  invoice_counter: string;
  currency: string;
  invoice_language: string;
  reference_person: string;

  // Contract Settings
  default_invoice_message: string;
  default_contract_duration: string;
  signing_method: string;
  contract_version_control: string;
  contract_contact_person: string;
  contract_terms: string;

  // Logo
  upload_logo?: string;
}

/**
 * Flattens the company details from the API response format to a format
 * suitable for form fields
 */
export const flattenCompanyDetails = (company: CompanyDetails): FlattenedCompanyDetails => {
  // Parse JSON strings safely
  let visiting: any = {};
  let mailing: any = {};
  
  try {
    visiting = typeof company.visitingAddress === 'string' 
      ? JSON.parse(company.visitingAddress || "{}")
      : company.visitingAddress || {};
  } catch (e) {
    console.warn("Failed to parse visiting address:", e);
  }
  
  try {
    mailing = typeof company.mailingAddress === 'string'
      ? JSON.parse(company.mailingAddress || "{}")
      : company.mailingAddress || {};
  } catch (e) {
    console.warn("Failed to parse mailing address:", e);
  }

  return {
    // Company Information
    company_name: company.company_name || "",
    registration_number: company.registrationNumber || "",
    legal_entity_type: company.legalEntityType || "",
    date_of_registration: company.dateOfRegistration?.split("T")[0] || "",
    vat_number: company.vatNumber || "",
    industry_code: company.industry_code || "",
    business_description: company.business_description || "",
    system_language: company.preferred_language || "",

    // Address Details
    visiting_address: visiting.street || "",
    floor: visiting.floor || "",
    door: visiting.door || "",
    mailing_address: mailing.street || "",
    city: mailing.city || company.city || "",
    country: company.country || "",
    postal_code: company.postalCode || "",

    // Contact Information
    first: company.contactPerson?.split(" ")[0] || "",
    last: company.contactPerson?.split(" ").slice(1).join(" ") || "",
    email: company.emailAddress || "",
    phone: company.phoneNumber || "",
    role: company.roleTitle || "",

    // Payment Settings
    bank_account_number: company.bankAccountNumber || "",
    iban: company.iban_Bic || "",
    swish_number: company.swish_Number || "",
    payment_terms: company.payment_Terms || "",
    late_payment_interest_rate: company.late_payment_interest_rate?.toString() || "",
    invoice_fee: company.invoice_Fee?.toString() || "",

    // Invoice Settings
    invoice_number_prefix: company.invoice_number_prefix || "",
    invoice_counter: company.invoice_number_counter?.toString() || "",
    currency: company.currency || "",
    invoice_language: company.invoice_language || "",
    reference_person: company.reference_person || "",

    // Contract Settings
    default_invoice_message: company.default_invoice_message || "",
    default_contract_duration: company.contract_duration?.toString() || "",
    signing_method: company.signing_method || "",
    contract_version_control: company.contract_version_control || "",
    contract_contact_person: company.contract_contact_person || "",
    contract_terms: company.contract_terms || "",

    // Logo
    upload_logo: company.upload_logo || "",
  };
};

/**
 * Gets the full URL for a company logo
 */
export const getCompanyLogoUrl = (logoPath?: string): string | null => {
  if (!logoPath) return null;
  return `${BACKEND_API_ENDPOINT}uploads/${logoPath}`;
};

/**
 * Validates company form data based on section
 */
export const validateCompanyData = (
  section: string,
  formData: Partial<FlattenedCompanyDetails>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  switch (section) {
    case "company_information":
      if (!formData.company_name?.trim()) {
        errors.push("Company name is required");
      }
      if (!formData.registration_number?.trim()) {
        errors.push("Registration number is required");
      }
      break;

    case "contact_information":
      if (!formData.email?.trim()) {
        errors.push("Email is required");
      }
      if (formData.email && !isValidEmail(formData.email)) {
        errors.push("Please enter a valid email address");
      }
      break;

    case "payment_settings":
      if (formData.iban && !isValidIBAN(formData.iban)) {
        errors.push("Please enter a valid IBAN");
      }
      break;

    // Add more validation rules as needed
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Simple email validation
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Simple IBAN validation (basic format check)
 */
const isValidIBAN = (iban: string): boolean => {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Basic IBAN format check (2 country code + 2 check digits + up to 30 alphanumeric)
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  return ibanRegex.test(cleanIban);
};
