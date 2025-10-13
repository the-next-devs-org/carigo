// types/profileTypes.ts
export interface UserProfile {
  user_id: number;
  first: string;
  last: string;
  email: string;
  phone: string;
  user_type: string;
  is_active: boolean;
  role: {
    role_id: number;
    name: string;
    description: string;
  };
  // Add all your additional fields here
  company_name?: string;
  registration_number?: string;
  legal_entity_type?: string;
  date_of_registration?: string;
  vat_number?: string;
  f_tax_status?: boolean;
  visiting_address?: string;
  mailing_address?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  // Add all other fields from your sections
}
