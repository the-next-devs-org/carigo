import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  ArrowCollapseIcon,
  EditAgreementIcon,
  ViewAgreementIcon,
  EnvelopeAgreementIcon,
  SignAgreementIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
} from "../../utils/Icons";
import DeletePopup from "../../models/DeletePopup";
import { makeGetRequest, makeDeleteRequest } from "../../../api/Api";
import { generateRegularSigningLink } from "../../../utils/publicSigningUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface Agreement {
  id: number;
  registrationNumber: string;
  type: string;
  purchaseDate: string;
  email: string;
  phone: string;
  purchasePrice: string;
  paymentMethod: string;
  vatType: string;
  creditMarking: string;
  mileage: number;
  latestService: string;
  numberOfKeys: number;
  deck: string;
  notes: string;
  creditor: string;
  depositor: string;
  creditAmount: string;
  name: string;
  customerType: string;
  address: string;
  birthDate: string;
  gender: string;
  salesDate: string | null;
  commissionRate: string | null;
  commissionAmount: string | null;
  agencyFee: string | null;
  insurer: string | null;
  insurerType: string | null;
  warrantyProvider: string | null;
  warrantyProduct: string | null;
  socialSecurityNumber: string | null;
  organizationNumber: string | null;
  tradeInType: string | null;
  tradeInRegistrationNumber: string | null;
  tradeInPurchaseDate: string | null;
  tradeInPurchasePrice: string | null;
  tradeInMileage: number | null;
  tradeInCreditMaking: string | null;
  tradeInRestAmount: string | null;
  // Vehicle fields
  vehicleModel: string | null;
  chassisNumber: string | null;
  color: string | null;
  vehicleYear: string | null;
  fuelType: string | null;
  gearbox: string | null;
  // Sales specific fields
  salesPriceSEK: string | null;
  insuranceType: string | null;
  freeTextMessage: string | null;
  // Delivery fields
  deliveryDate: string | null;
  deliveryLocation: string | null;
  deliveryTerms: string | null;
  latestServiceDate: string | null;
  // Customer fields
  pep: boolean | null;
  verification: string | null;
  // Payment fields
  paymentDate: string | null;
  financialCompany: string | null;
  creditAmountSales: string | null;
  cashStack: string | null;
  loanPeriod: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AgreementsTableProps {
  search: string;
  expandedId: string | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | null>>;
  filters: {
    status?: string;
    agreementType?: string;
    fromDate?: string;
    toDate?: string;
    minAmount?: string;
    maxAmount?: string;
    sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
  };
  setFilteredCount: (count: number) => void;
}

const statusColors: Record<string, string> = {
  Created: "bg-yellow-100 text-yellow-700",
  Signed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

// Move EmailModal here, before AgreementsTable
const EmailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Send Email</h2>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              onSend(email);
              onClose();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const AgreementsTable: React.FC<AgreementsTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [page, setPage] = useState(1);
  const [deletePopupId, setDeletePopupId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [agreements, setAgreements] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgreements = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("agreements/getAllAgreements");
        if (response.data && response.data.success) {
          setAgreements(response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch agreements");
        }
      } catch (err) {
        setError("An error occurred while fetching agreements");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  const filtered = [...agreements].reverse().filter((agreement) => {
    const registrationNumber =
      agreement.registrationNumber?.toLowerCase() || "";
    const name = agreement.name?.toLowerCase() || "";
    const email = agreement.email?.toLowerCase() || "";
    const phone = agreement.phone?.toLowerCase() || "";

    const searchLower = search.toLowerCase();
    const searchMatch =
      registrationNumber.includes(searchLower) ||
      name.includes(searchLower) ||
      email.includes(searchLower) ||
      phone.includes(searchLower);

    if (!searchMatch) return false;

    if (
      filters.status &&
      (agreement.creditMarking === "Yes"
        ? "Created"
        : "Signed"
      ).toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    if (filters.agreementType) {
      if (agreement.customerType !== filters.agreementType) {
        return false;
      }
    }

    const agreementDate = new Date(agreement.purchaseDate);
    if (filters.fromDate) {
      if (agreementDate < new Date(filters.fromDate)) return false;
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      if (agreementDate > toDate) return false;
    }

    const amount = parseFloat(agreement.purchasePrice || "0");
    if (filters.minAmount && amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "date-desc":
        return (
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime()
        );
      case "date-asc":
        return (
          new Date(a.purchaseDate).getTime() -
          new Date(b.purchaseDate).getTime()
        );
      case "amount-desc":
        return (
          parseFloat(b.purchasePrice || "0") -
          parseFloat(a.purchasePrice || "0")
        );
      case "amount-asc":
        return (
          parseFloat(a.purchasePrice || "0") -
          parseFloat(b.purchasePrice || "0")
        );
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  useEffect(() => {
    setFilteredCount(sorted.length);
  }, [sorted, setFilteredCount]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filtered.length]);

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id.toString() ? null : id.toString());
  };

  const handleDeleteAgreement = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);
    try {
      const response = await makeDeleteRequest(
        `agreements/deleteAgreement/${deletePopupId}`
      );
      if (response.data && response.data.success) {
        setAgreements(
          agreements.filter(
            (agreement: any) => agreement.id.toString() !== deletePopupId
          )
        );
        toast.success("Agreement deleted successfully!");
        setDeletePopupId(null);
      } else {
        toast.error(response.data?.message || "Failed to delete agreement");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the agreement");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Agreement"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteAgreement}
          isDeleting={isDeleting}
        />
      )}
      <EmailModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={() => {
          alert("button clicked");
        }}
      />
      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[500px] min-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Registreringsnummer
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Bil
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Typ
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Datum
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Inga avtal hittades
                </td>
              </tr>
            ) : (
              paginated.map(
                (agreement) => (
                  console.log("agreement", agreement),
                  (
                    <React.Fragment key={agreement.id}>
                      {/* Main Agreement Row */}
                      <tr
                        className={`hover:bg-gray-50 ${expandedId === agreement.id.toString() ? "bg-[#E9EEF640]" : ""
                          }`}
                      >
                        {/* ...main row cells... */}
                        <td className="md:py-4 py-1.5 md:px-4 px-2">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleExpand(agreement.id)}
                              className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                            >
                              <span
                                className={`text-gray-400 text-xs transition-transform ${expandedId === agreement.id.toString() ? "rotate-180" : ""
                                  }`}
                              >
                                <ArrowCollapseIcon className="rotate-270" />
                              </span>
                            </button>
                            <span className="inline-flex items-center gap-2 border border-[rgb(232,234,238)] rounded pr-1">
                              <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-tl rounded-bl px-2 py-2 text-xs font-bold">
                                {agreement.type === "Sales Agreement"
                                  ? "S"
                                  : agreement.type === "Purchase Agreement"
                                    ? "P"
                                    : agreement.type === "Agency Agreement"
                                      ? "A"
                                      : ".."}
                              </span>
                              <span className="font-medium text-gray-900">
                                {agreement.registrationNumber || "N/A"}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                          {agreement.vehicleModel || "N/A"}
                        </td>
                        <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                          {agreement.type || "N/A"}
                        </td>
                        <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                          {new Date(
                            agreement.purchaseDate || agreement.salesDate || ""
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }) || "N/A"}
                        </td>

                        <td className="md:py-4 py-1.5 md:px-4 px-2">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[
                              agreement.creditMarking === "Yes"
                                ? "Created"
                                : "Signed"
                              ] || "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {agreement.creditMarking === "Yes"
                              ? "Created"
                              : "Signed"}
                          </span>
                        </td>
                        <td className="md:py-4 py-1.5 md:px-4 px-2">
                          <button
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                            onClick={() =>
                              setDeletePopupId(agreement.id.toString())
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Main Agreement Expandable Row */}
                      {expandedId === agreement.id.toString() && (
                        <tr>
                          <td colSpan={7} className="bg-[#E9EEF640] border-t border-gray-200">
                            <div className="p-6">
                              <div className="flex flex-col gap-6">
                                <div className="flex justify-end items-center gap-3 mt-4">
                                  <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                    <EditAgreementIcon />
                                    Redigera
                                  </button>
                                  <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                    <ViewAgreementIcon />
                                    Ladda ner
                                  </button>
                                  <button
                                    onClick={() => setShowEmailModal(true)}
                                    className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                    <EnvelopeAgreementIcon />
                                    E-post
                                  </button>
                                  <button
                                    className="px-4 py-2 text-white bg-[#012F7A] rounded-lg hover:bg-[#012F7A]/90 flex items-center gap-2 cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        generateRegularSigningLink(agreement.id)
                                      )
                                    }
                                  >
                                    <SignAgreementIcon />
                                    Signera avtal
                                  </button>
                                </div>
                                {/* Sales Agreement Detailed Information */}
                                {agreement.type === "Sales Agreement" && (
                                  <>
                                    {/* Vehicle Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Fordonsinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.registrationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Registreringsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.registrationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleModel && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bilmodell
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleModel || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.color && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Färg
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.color || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.chassisNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Chassinummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.chassisNumber || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleYear && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Fordonsår
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleYear || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.gearbox && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Växellåda
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.gearbox || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.fuelType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bränsletyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.fuelType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.salesDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäljningsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.salesDate || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Customer Details Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between">
                                        <h3 className="text-base font-semibold text-gray-900">
                                          Kunduppgifter
                                        </h3>
                                        {agreement?.customerType && (
                                          <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${agreement.customerType ===
                                                "company"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-green-100 text-green-800"
                                              }`}
                                          >
                                            {agreement.customerType ===
                                              "company"
                                              ? "Företag"
                                              : "Privatperson"}
                                          </span>
                                        )}
                                      </div>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.name && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Företagsnamn"
                                                : "Namn"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.name || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.email && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              E-post
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.email || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.phone && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Telefon
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.phone || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.address && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Adress
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.address || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.socialSecurityNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Organisationsnummer"
                                                : "Personnummer"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.socialSecurityNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.organizationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Organisationsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.organizationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.birthDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Födelsedatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.birthDate || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.gender && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kön
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.gender || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.pep && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              PEP
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.pep ? "Ja" : "Nej"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.verification && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Verifiering
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.verification || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Trade-in Vehicle Information */}
                                    {agreement?.tradeInRegistrationNumber && (
                                      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <h3 className="bg-[#F0F7FF] px-6 py-4">
                                          Inbytesfordonsinformation
                                        </h3>
                                        <div className="p-6 grid grid-cols-2 gap-6">
                                          {agreement?.tradeInRegistrationNumber && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Registreringsnummer
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInRegistrationNumber ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.tradeInPurchaseDate && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Inköpsdatum
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInPurchaseDate ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.tradeInPurchasePrice && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Inköpspris
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInPurchasePrice ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.tradeInMileage && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Miltal
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInMileage ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.tradeInCreditMaking && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Kreditmarkering
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInCreditMaking ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.tradeInRestAmount && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Restbelopp
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.tradeInRestAmount ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Sales Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Försäljningsinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.salesPriceSEK && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäljningspris (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.salesPriceSEK || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.paymentMethod && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Betalningsmetod
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.paymentMethod || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.paymentDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Betalningsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {new Date(
                                                agreement.paymentDate
                                              ).toLocaleDateString() || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.financialCompany && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Finansiellt företag
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.financialCompany ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.creditAmountSales && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kreditbelopp Försäljning
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.creditAmountSales ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.cashStack && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kontantinsats
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.cashStack || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.loanPeriod && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Låneperiod
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.loanPeriod || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Vehicle Specifications Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Fordonsspecifikationer
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.vatType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Moms typ
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vatType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.mileage && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Miltal (km)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.mileage || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.numberOfKeys && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Nycklar
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.numberOfKeys || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.deck && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Däck
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deck || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.insurer && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringsbolag
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insurer || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.insuranceType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringstyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insuranceType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProvider && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiutfärdare
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProvider ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProduct && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiprodukt
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProduct ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.latestServiceDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Senaste service
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.latestServiceDate ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Delivery Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Leveransinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.deliveryDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Leveransdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deliveryDate || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.deliveryLocation && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Leveransplats
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deliveryLocation ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.deliveryTerms && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Leveransvillkor
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deliveryTerms || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Payment Information Section */}
                                    {agreement?.freeTextMessage && (
                                      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <h3 className="bg-[#F0F7FF] px-6 py-4">
                                          Betalningsinformation
                                        </h3>
                                        <div className="p-6 grid grid-cols-2 gap-6">
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Meddelande (Betalning)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.freeTextMessage ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}

                                {/* Agency Agreement Detailed Information */}
                                {agreement.type === "Agency Agreement" && (
                                  <>
                                    {/* Vehicle Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Fordonsinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.registrationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Registreringsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.registrationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleModel && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bilmodell
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleModel || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.color && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Färg
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.color || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.chassisNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Chassinummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.chassisNumber || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleYear && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Fordonsår
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleYear || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.gearbox && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Växellåda
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.gearbox || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.fuelType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bränsletyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.fuelType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.mileage && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Miltal (km)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.mileage || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.numberOfKeys && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Nycklar
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.numberOfKeys || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.deck && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Däck
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deck || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.latestService && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Senaste service
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.latestService || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vatType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Moms typ
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vatType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Customer Details Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-base font-semibold text-gray-900">
                                          Kunduppgifter
                                        </h3>
                                        {agreement?.customerType && (
                                          <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${agreement.customerType ===
                                                "company"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-green-100 text-green-800"
                                              }`}
                                          >
                                            {agreement.customerType ===
                                              "company"
                                              ? "Företag"
                                              : "Privatperson"}
                                          </span>
                                        )}
                                      </div>
                                      <div className="grid grid-cols-4 gap-6">
                                        {agreement?.name && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Företagsnamn"
                                                : "Namn"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.name || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.email && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              E-post
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.email || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.phone && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Telefon
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.phone || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.address && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Adress
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.address || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.socialSecurityNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Organisationsnummer"
                                                : "Personnummer"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.socialSecurityNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.organizationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Organisationsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.organizationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Agency Information Section */}
                                    <div className="mb-6">
                                      <h3 className="text-base font-semibold text-gray-900 mb-4">
                                        Byråinformation
                                      </h3>
                                      <div className="grid grid-cols-4 gap-6">
                                        {agreement?.purchasePrice && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäljningspris (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.purchasePrice || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.commissionRate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Provision
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.commissionRate ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.commissionAmount && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Provisionsbelopp (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.commissionAmount ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.agencyFee && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Byråavgift (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.agencyFee || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.paymentMethod && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Betalningsmetod
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.paymentMethod || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.bank && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bank
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.bank || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.accountNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kontonummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.accountNumber || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.settlementDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Avräkningsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {new Date(
                                                agreement.settlementDate
                                              ).toLocaleDateString() || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Insurance & Warranty Information */}
                                    <div className="mb-6">
                                      <h3 className="text-base font-semibold text-gray-900 mb-4">
                                        Försäkrings- & garantinformation
                                      </h3>
                                      <div className="grid grid-cols-4 gap-6">
                                        {agreement?.insurer && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringsbolag
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insurer || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.insuranceType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringstyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insuranceType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProvider && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiutfärdare
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProvider ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProduct && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiprodukt
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProduct ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Additional Notes */}
                                    {agreement?.notes && (
                                      <div className="mb-6">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                                          Ytterligare anteckningar
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6">
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Anteckningar
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.notes || "N/A"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}

                                {/* Purchase Agreement Detailed Information */}
                                {agreement.type === "Purchase Agreement" && (
                                  <>
                                    {/* Vehicle Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Fordonsinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.registrationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Registreringsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.registrationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleModel && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bilmodell
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleModel || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.color && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Färg
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.color || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.chassisNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Chassinummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.chassisNumber || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vehicleYear && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Fordonsår
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vehicleYear || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.gearbox && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Växellåda
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.gearbox || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.fuelType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bränsletyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.fuelType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.mileage && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Miltal (km)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.mileage || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.numberOfKeys && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Nycklar
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.numberOfKeys || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.deck && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Däck
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.deck || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.vatType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Moms typ
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.vatType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.purchaseDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Inköpsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.purchaseDate || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Customer Details Section */}
                                    <div className="mb-6  bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between">
                                        <h3 className="">
                                          Kunduppgifter
                                        </h3>
                                        {agreement?.customerType && (
                                          <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${agreement.customerType ===
                                                "company"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-green-100 text-green-800"
                                              }`}
                                          >
                                            {agreement.customerType ===
                                              "company"
                                              ? "Företag"
                                              : "Privatperson"}
                                          </span>
                                        )}
                                      </div>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.name && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Företagsnamn"
                                                : "Namn"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.name || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.email && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              E-post
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.email || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.phone && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Telefon
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.phone || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.address && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Adress
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.address || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.socialSecurityNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              {agreement.customerType ===
                                                "company"
                                                ? "Organisationsnummer"
                                                : "Personnummer"}
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.socialSecurityNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.organizationNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Organisationsnummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.organizationNumber ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Purchase Information Section */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Köpinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.purchasePrice && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Köpesumma (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.purchasePrice || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.paymentMethod && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Betalningsmetod
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.paymentMethod || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.creditMarking && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kreditmarkering
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.creditMarking || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.creditor && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kreditgivares namn
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.creditor || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.creditAmount && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kreditbelopp (SEK)
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.creditAmount || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.depositor && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Insättare
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.depositor || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.bank && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Bank
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.bank || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.accountNumber && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Kontonummer
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.accountNumber || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.settlementDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Avräkningsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {new Date(
                                                agreement.settlementDate
                                              ).toLocaleDateString() || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.payoutDate && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Utbetalningsdatum
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {new Date(
                                                agreement.payoutDate
                                              ).toLocaleDateString() || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Insurance & Warranty Information */}
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Försäkrings- & garantinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        {agreement?.insurer && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringsbolag
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insurer || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.insuranceType && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Försäkringstyp
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.insuranceType || "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProvider && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiutfärdare
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProvider ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                        {agreement?.warrantyProduct && (
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Garantiprodukt
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.warrantyProduct ||
                                                "N/A"}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Additional Notes */}
                                    {agreement?.notes && (
                                      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <h3 className="bg-[#F0F7FF] px-6 py-4">
                                          Ytterligare anteckningar
                                        </h3>
                                        <div className="p-6 grid grid-cols-2 gap-6">
                                          <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                              Anteckningar
                                            </div>
                                            <div className="text-sm text-gray-900">
                                              {agreement.notes || "N/A"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                                <div>
                                  {/* <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Customer Information
                                  </h3> */}
                                  {/* Default/Fallback for non-Sales, non-Agency, and non-Purchase Agreements */}
                                  {/* {agreement.type !== "Sales Agreement" &&
                                    agreement.type !== "Agency Agreement" &&
                                    agreement.type !== "Purchase Agreement" && (
                                      <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                                          Customer Information
                                        </h3>
                                        <div className="grid grid-cols-4 gap-6">
                                          {agreement?.name && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Name
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.name || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.email && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Email
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.email || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.phone && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Phone
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.phone || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.address && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Address
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.address || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.customerType && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Customer Type
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.customerType ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.birthDate && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Birth Date
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.birthDate || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.gender && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Gender
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.gender || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.socialSecurityNumber && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Social Security Number
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.socialSecurityNumber ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.organizationNumber && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Organization Number
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.organizationNumber ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )} */}

                                  {/* Vehicle Information for non-Sales, non-Agency, and non-Purchase Agreements */}
                                  {agreement.type !== "Sales Agreement" &&
                                    (agreement?.registrationNumber ||
                                      agreement?.salesPriceSEK ||
                                      agreement?.purchaseDate ||
                                      agreement?.purchasePrice ||
                                      agreement?.paymentMethod ||
                                      agreement?.vatType ||
                                      agreement?.creditMarking ||
                                      agreement?.mileage ||
                                      agreement?.latestService ||
                                      agreement?.numberOfKeys ||
                                      agreement?.deck ||
                                      agreement?.notes) && (
                                      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <h3 className="bg-[#F0F7FF] px-6 py-4">
                                          Fordonsinformation
                                        </h3>
                                        <div className="p-6 grid grid-cols-2 gap-6">
                                          {agreement?.registrationNumber && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Registreringsnummer
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.registrationNumber ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {(agreement?.salesPriceSEK ||
                                            agreement?.purchaseDate) && (
                                              <div>
                                                <div className="text-sm text-gray-500 mb-1">
                                                  {agreement.type ===
                                                    "Sales Agreement"
                                                    ? "Försäljning"
                                                    : "Köp"}{" "}
                                                  Datum
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                  {(agreement.type ===
                                                    "Sales Agreement"
                                                    ? agreement.salesPriceSEK
                                                    : agreement.purchaseDate) ||
                                                    "N/A"}
                                                </div>
                                              </div>
                                            )}
                                          {agreement?.purchasePrice && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                {agreement.type ===
                                                  "Sales Agreement" ||
                                                  agreement.type ===
                                                  "Agency Agreement"
                                                  ? "Försäljnings"
                                                  : "Köps"}{" "}
                                                Pris
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.purchasePrice ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.paymentMethod && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Betalningsmetod
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.paymentMethod ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.vatType && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Moms typ
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.vatType || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement.type ===
                                            "Purchase Agreement" &&
                                            agreement?.creditMarking && (
                                              <div>
                                                <div className="text-sm text-gray-500 mb-1">
                                                  Kreditmarkering
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                  {agreement.creditMarking ||
                                                    "N/A"}
                                                </div>
                                              </div>
                                            )}
                                          {agreement?.mileage && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Miltal
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.mileage || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement.type ===
                                            "Agency Agreement" &&
                                            agreement?.latestService && (
                                              <div>
                                                <div className="text-sm text-gray-500 mb-1">
                                                  Senaste service
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                  {agreement.latestService ||
                                                    "N/A"}
                                                </div>
                                              </div>
                                            )}
                                          {agreement?.numberOfKeys && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Antal nycklar
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.numberOfKeys ||
                                                  "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.deck && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                Däck
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.deck || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                          {agreement?.notes && (
                                            <div>
                                              <div className="text-sm text-gray-500 mb-1">
                                                {agreement.type ===
                                                  "Sales Agreement"
                                                  ? "Betalningsinformation"
                                                  : "Anteckningar"}
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {agreement.notes || "N/A"}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {agreement.type === "Agency Agreement" ? (
                                    <div>
                                      <h3 className="text-base font-semibold text-gray-900 mb-4">
                                        Ekonomisk information
                                      </h3>
                                      <div className="grid grid-cols-4 gap-6">
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Provision
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.commissionRate || "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Provisionsbelopp
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.commissionAmount ||
                                              "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Byråavgift
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.agencyFee || "N/A"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {agreement.type === "Sales Agreement" ? (
                                    <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <h3 className="bg-[#F0F7FF] px-6 py-4">
                                        Inbytesinformation
                                      </h3>
                                      <div className="p-6 grid grid-cols-2 gap-6">
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInRegistrationNumber
                                              ? "Ja"
                                              : "Nej"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Registreringsnummer för inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInRegistrationNumber ||
                                              "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Inköpsdatum för inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInPurchaseDate ||
                                              "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Inköpspris för inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInPurchasePrice ||
                                              "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Miltal för inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInMileage || "N/A"}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-500 mb-1">
                                            Kreditmarkering för inbyte
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {agreement.tradeInCreditMaking ||
                                              "N/A"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
                                      <h2 className="text-lg font-semibold text-gray-900">
                                        Dokument
                                      </h2>
                                    </div>
                                    <div className="p-6">
                                      <div className="space-y-3">
                                        <div className="text-gray-500">
                                          Inga dokument för detta fordon ännu.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Trade-in Row */}
                      {agreement.tradeInRegistrationNumber && (
                        <tr
                          className={`hover:bg-gray-50 ${expandedId === `${agreement.id}-tradein` ? "bg-[#E9EEF640]" : ""
                            }`}
                        >
                          <td className="md:py-4 py-1.5 md:px-4 px-2">
                           
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setExpandedId(expandedId === `${agreement.id}-tradein` ? null : `${agreement.id}-tradein`)}
                                className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                              >
                                <span
                                  className={`text-gray-400 text-xs transition-transform ${expandedId === `${agreement.id}-tradein` ? "rotate-180" : ""}`}
                                >
                                  <ArrowCollapseIcon className="rotate-270" />
                                </span>
                              </button>
                              <span className="inline-flex items-center gap-2 border border-[rgb(232,234,238)] rounded pr-1">
                                <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-tl rounded-bl px-2 py-2 text-xs font-bold">
                                  S
                                </span>
                                <span className="font-medium text-gray-900">
                                  {agreement.tradeInRegistrationNumber || "N/A"}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                            {agreement.tradeInVehicleModel || "N/A"}
                          </td>
                          <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                            Trade-in
                          </td>
                          <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                            {agreement.tradeInPurchaseDate
                              ? new Date(agreement.tradeInPurchaseDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </td>
                          <td className="md:py-4 py-1.5 md:px-4 px-2">
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {agreement.tradeInPurchasePrice || "N/A"}
                            </span>
                          </td>
                          <td className="md:py-4 py-1.5 md:px-4 px-2">
                            <button
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                              onClick={() => setDeletePopupId(agreement.id.toString())}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )}

                      {/* Trade-in Expandable Row */}
                      {agreement.tradeInRegistrationNumber && expandedId === `${agreement.id}-tradein` && (
                        <tr>
                          <td colSpan={7} className="bg-[#E9EEF640] border-t border-gray-200">
                            {/* Trade-in expanded content */}
                            <div className="p-6">
                              <div className="flex flex-col gap-6">
                                <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <h3 className="bg-[#F0F7FF] px-6 py-4">Trade-in Vehicle Details</h3>
                                  <div className="p-6 grid grid-cols-2 gap-6">
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Registration Number</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInRegistrationNumber || "N/A"}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Purchase Date</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInPurchaseDate || "N/A"}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Purchase Price</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInPurchasePrice || "N/A"}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Mileage</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInMileage || "N/A"}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Credit Marking</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInCreditMaking || "N/A"}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">Rest Amount</div>
                                      <div className="text-sm text-gray-900">{agreement.tradeInRestAmount || "N/A"}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                )
              )
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && !error && filtered.length > 0 && (
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start md:gap-0 gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Visa</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>poster av {filtered.length} poster</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              <ArrowLeftIcon className="w-[6px] h-[10px]" />
            </button>
            {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
              let pageNum = i + 1;
              if (page > 3 && totalPages > 5) {
                pageNum = page - 2 + i;
              }
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 text-sm border rounded-md cursor-pointer ${page === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && page < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            {totalPages > 1 && page < totalPages - 1 && totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              <ArrowLeftDoubleIcon className="w-[6px] h-[10px] rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgreementsTable;
