import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  ArrowCollapseIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
  EditAgreementIcon,
  ViewAgreementIcon,
  EnvelopeAgreementIcon,
  SwishaAgreementIcon,
  SignAgreementIcon,
} from "../../utils/Icons";
import DeletePopup from "../../models/DeletePopup";
import { makeGetRequest, makeDeleteRequest } from "../../../api/Api";
import toast from "react-hot-toast";

interface InvoiceItem {
  productName: string;
  quantity: number;
  price: number;
  lineTotal: number;
  description: string;
  unit?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerType: string;
  amount: number;
  invoiceDate: string;
  dueDate: string;
  status: string;
  items: InvoiceItem[];
  net?: number;
  moms?: number;
  currency?: string;
}

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface InvoiceTableProps {
  search: string;
  expandedId: string | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | null>>;
  filters: InvoiceFilters;
  setFilteredCount: (count: number) => void;
}

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-100 text-gray-700",
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [page, setPage] = useState(1);
  const [deletePopupId, setDeletePopupId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("invoices/getAllInvoices");
        if (response.data && response.data.success) {
          setInvoices(response.data.invoices);
        } else {
          setError(response.data?.message || "Failed to fetch invoices");
        }
      } catch (err) {
        setError("An error occurred while fetching invoices");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const filtered = invoices.filter((inv) => {
    const searchMatch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());

    if (!searchMatch) return false;

    if (
      filters.status &&
      inv.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    if (filters.customerType && inv.customerType !== filters.customerType) {
      return false;
    }

    const invoiceDate = new Date(inv.invoiceDate);
    if (filters.fromDate) {
      if (invoiceDate < new Date(filters.fromDate)) return false;
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      if (invoiceDate > toDate) return false;
    }

    if (filters.minAmount && inv.amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && inv.amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "date-desc":
        return (
          new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()
        );
      case "date-asc":
        return (
          new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime()
        );
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  useEffect(() => {
    setFilteredCount(sorted.length);
  }, [sorted, setFilteredCount]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, sorted.length]);

  useEffect(() => {
    if ((page - 1) * pageSize >= sorted.length) {
      setPage(1);
    }
  }, [page, pageSize, sorted.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeleteInvoice = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);
    try {
      const response = await makeDeleteRequest(
        `invoices/delete/${deletePopupId}`
      );
      if (response.data && response.data.success) {
        setInvoices(
          invoices.filter((inv) => inv.id.toString() !== deletePopupId)
        );
        toast.success("Invoice deleted successfully!");
        setDeletePopupId(null);
      } else {
        toast.error(response.data?.message || "Failed to delete invoice");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the invoice");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };
  console.log(SwishaAgreementIcon,SignAgreementIcon);

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Invoice"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteInvoice}
          isDeleting={isDeleting}
        />
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[500px] min-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Invoice Number
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Customer
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Amount
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Issue Date
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Due Date
              </th>

              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              paginated.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  <tr
                    className={`hover:bg-gray-50 ${
                      expandedId === invoice.id ? "bg-[#E9EEF640]" : ""
                    }`}
                  >
                    <td className="md:py-4 py-1.5 md:px-4 px-2 flex items-center">
                      <button
                        onClick={() => handleExpand(invoice.id)}
                        className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                      >
                        <span
                          className={`text-gray-400 text-xs transition-transform ${
                            expandedId === invoice.id ? "rotate-180" : ""
                          }`}
                        >
                          <ArrowCollapseIcon className="rotate-270" />
                        </span>
                      </button>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-mediu">
                        {invoice.invoiceNumber.startsWith("INV")
                          ? "Invoice"
                          : "Receipt"}
                      </span>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 font-semibold text-blue-900">
                      {invoice.invoiceNumber || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {invoice.customerName || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {invoice.currency || "N/A"}{" "}
                      {typeof invoice.amount === "number"
                        ? invoice.amount.toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {new Date(invoice.invoiceDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      ) || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) || "N/A"}
                    </td>

                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                        onClick={() => setDeletePopupId(invoice.id.toString())}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {expandedId === invoice.id && (
                    <tr>
                      <td
                        colSpan={8}
                        className="bg-[#E9EEF640] border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex flex-col gap-6">
                            <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <h3 className="bg-[#F0F7FF] px-6 py-4">
                                Invoice Details
                              </h3>
                              <div className="p-6 grid grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Invoice Number
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.invoiceNumber || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Customer
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.customerName || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Net Amount
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.net?.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    VAT (Moms)
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.moms?.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Total Amount
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.amount.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Status
                                  </div>
                                  <span
                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                      statusColors[invoice.status] ||
                                      "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {invoice.status || "N/A"}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Issue Date
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      invoice.invoiceDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }) || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Due Date
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      invoice.dueDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }) || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Items
                              </h3>
                              <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Product
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Quantity
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Unit Price
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoice.items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {item.productName || "N/Assssss"}
                                        <div className="text-xs text-gray-500">
                                          {item.description || "N/A"}
                                        </div>
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {item.quantity || "N/A"}{" "}
                                        {item.unit || "N/A"}
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {invoice.currency || "N/A"}{" "}
                                        {typeof item.price === "number"
                                          ? item.price.toLocaleString()
                                          : "N/A"}
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {invoice.currency || "N/A"}{" "}
                                        {typeof item.lineTotal === "number"
                                          ? item.lineTotal.toLocaleString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">
                                  Documents
                                </h2>
                              </div>
                              <div className="p-6">
                                <div className="space-y-3">
                                  <div className="text-gray-500">
                                    No documents for this vehicle yet.
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end items-center gap-3 mt-4">
                              {/* <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <EditAgreementIcon />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <ViewAgreementIcon />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <EnvelopeAgreementIcon />
                              </button> */}
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <EditAgreementIcon />
                                Edit
                              </button>
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <ViewAgreementIcon />
                                Download
                              </button>
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <EnvelopeAgreementIcon />
                                Email
                              </button>




                              {/* <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <SwishaAgreementIcon />
                                Swisha
                              </button>
                              <button className="px-4 py-2 text-white bg-[#012F7A] rounded-lg hover:bg-[#012F7A]/90 flex items-center gap-2 cursor-pointer">
                                <SignAgreementIcon />
                                Sign Agreement
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && !error && filtered.length > 0 && (
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start mt-6 md:gap-0 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
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
            <span>entries of {sorted.length} entries</span>
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
                  className={`px-3 py-2 text-sm border rounded-md cursor-pointer ${
                    page === pageNum
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

export default InvoiceTable;
