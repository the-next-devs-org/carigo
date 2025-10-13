import React from 'react';
import { useCompanyDetails, createCompanyUpdateData } from '../../hooks/useCompanyDetails';
import { flattenCompanyDetails } from '../../utils/companyDetailsUtils';
import { Loader2 } from 'lucide-react';

/**
 * Example component showing how to use the company details integration
 * This demonstrates fetching and updating company details using the new hooks
 */
const CompanyDetailsExample: React.FC = () => {
  const { companyDetails, loading, error, updateCompanyDetails } = useCompanyDetails();

  // Example function to update company information
  const handleUpdateCompanyInfo = async () => {
    if (!companyDetails) return;

    // Example form data - in a real component this would come from form inputs
    const formData = {
      company_name: 'Updated Company Name',
      registration_number: companyDetails.registrationNumber,
      legal_entity_type: companyDetails.legalEntityType,
      date_of_registration: companyDetails.dateOfRegistration,
      vat_number: companyDetails.vatNumber,
      industry_code: companyDetails.industry_code,
      system_language: companyDetails.preferred_language,
      business_description: companyDetails.business_description,
    };

    const updateData = createCompanyUpdateData.companyInformation(formData);
    const success = await updateCompanyDetails(updateData);
    
    if (success) {
      console.log('Company information updated successfully!');
    }
  };

  // Example function to update contact information
  const handleUpdateContact = async () => {
    if (!companyDetails) return;

    const formData = {
      first: 'John',
      last: 'Doe',
      email: 'john.doe@example.com',
      phone: '+46123456789',
      role: 'CEO',
    };

    const updateData = createCompanyUpdateData.contactInformation(formData);
    const success = await updateCompanyDetails(updateData);
    
    if (success) {
      console.log('Contact information updated successfully!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading company details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-600">No company details found</p>
      </div>
    );
  }

  // Flatten the company details for easier use in forms
  const flattened = flattenCompanyDetails(companyDetails);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Company Details Example</h1>
      
      {/* Display current company information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Current Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Company Name</label>
            <p className="text-gray-900">{flattened.company_name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Registration Number</label>
            <p className="text-gray-900">{flattened.registration_number || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">VAT Number</label>
            <p className="text-gray-900">{flattened.vat_number || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Legal Entity Type</label>
            <p className="text-gray-900">{flattened.legal_entity_type || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Display contact information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-gray-900">{`${flattened.first} ${flattened.last}`.trim() || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{flattened.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900">{flattened.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <p className="text-gray-900">{flattened.role || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Example action buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdateCompanyInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Company Info (Demo)
        </button>
        <button
          onClick={handleUpdateContact}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Update Contact Info (Demo)
        </button>
      </div>

      {/* API Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">API Integration Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>GET API:</strong> <code>GET /api/companyDetail/getCompanyDetailByUser</code></p>
          <p><strong>UPDATE API:</strong> <code>PUT /api/companyDetail/update</code></p>
          <p><strong>Update Types:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• Company Information</li>
            <li>• Address Details</li>
            <li>• Contact Information</li>
            <li>• Payment Settings</li>
            <li>• Invoice Settings</li>
            <li>• Contract Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsExample;
