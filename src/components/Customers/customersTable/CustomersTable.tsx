import React, { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import {
  ArrowCollapseIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
} from "../../utils/Icons";
import DeletePopup from "../../models/DeletePopup";
import { makeGetRequest, makeDeleteRequest } from "../../../api/Api";
import toast from "react-hot-toast";

interface Customer {
  id: number;
  customerId: string;
  corpId: string;
  userId: string;
  name: string;
  telephone: string;
  email: string;
  address: string;
  type: string;
  status: string;
  numberOfOrders: number;
  totalSpent: number;
  latestPurchase: string | null;
  agreementType: string;
  socialSecurityNumber: string;
  createdAt: string;
  updatedAt: string;
  postalCode?: string;
  customerNumber?: string;
  location?: string;
}

interface CustomersTableProps {
  search: string;
  expandedId: number | null;
  setExpandedId: React.Dispatch<React.SetStateAction<number | null>>;
  filters: {
    type?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    agreementType?: string;
  };
  setFilteredCount?: (count: number) => void;
}

const agreementColors: Record<string, string> = {
  Client: "bg-orange-100 text-orange-700",
  Owner: "bg-blue-100 text-blue-700",
  Agency: "bg-green-100 text-green-700",
  "N/A": "bg-gray-100 text-gray-700",
};

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const CustomersTable: React.FC<CustomersTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletePopupId, setDeletePopupId] = useState<number | null>(null);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    privateCustomers: 0,
    companyCustomers: 0,
    totalCustomers: 0,
    purchaseAgreements: 0,
    salesAgreements: 0,
    otherAgreements: 0,
  });

  console.log("stats", stats);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("customer/getAllCustomers");
        if (response.data && response.data.success) {
          setCustomers(response.data.data || []);
          setStats(
            response.data.stats || {
              privateCustomers: 0,
              companyCustomers: 0,
              totalCustomers: 0,
              purchaseAgreements: 0,
              salesAgreements: 0,
              otherAgreements: 0,
            }
          );
        } else {
          setError(response.data?.message || "Failed to fetch customers");
        }
      } catch (err) {
        setError("An error occurred while fetching customers");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filtered = customers.filter((customer) => {
    const searchLower = search.toLowerCase();
    const searchMatch =
      (customer.name?.toLowerCase() || "").includes(searchLower) ||
      (customer.email?.toLowerCase() || "").includes(searchLower) ||
      (customer.address?.toLowerCase() || "").includes(searchLower) ||
      (customer.telephone?.toLowerCase() || "").includes(searchLower);


    if (!searchMatch) return false;

    if (filters.type && customer.type !== filters.type) {
      return false;
    }

    if (filters.status && customer.status !== filters.status) {
      return false;
    }

    if (
      filters.agreementType &&
      customer.agreementType !== filters.agreementType
    ) {
      return false;
    }

    const customerDate = new Date(customer.createdAt);
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      if (customerDate < fromDate) return false;
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      if (customerDate > toDate) return false;
    }

    return true;
  });

  useEffect(() => {
    if (setFilteredCount) {
      setFilteredCount(filtered.length);
    }
  }, [filtered.length, setFilteredCount]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleDeleteCustomer = async () => {
    if (!deletePopupId || !deleteCustomerId) return;

    setIsDeleting(true);
    try {
      const response = await makeDeleteRequest(
        `customer/deleteCustomer/${deleteCustomerId}`
      );

      if (response.data && response.data.success) {
        setCustomers(
          customers.filter((customer) => customer.id !== deletePopupId)
        );
        setStats((prev) => ({
          ...prev,
          totalCustomers: prev.totalCustomers - 1,
          privateCustomers:
            customers.find((c) => c.id === deletePopupId)?.type === "Private"
              ? prev.privateCustomers - 1
              : prev.privateCustomers,
          companyCustomers:
            customers.find((c) => c.id === deletePopupId)?.type === "Company"
              ? prev.companyCustomers - 1
              : prev.companyCustomers,
        }));

        toast.success("Customer deleted successfully!");
        setDeletePopupId(null);
        setDeleteCustomerId(null);
      } else {
        toast.error(response.data?.message || "Failed to delete customer");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the customer");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (customerId: number, customerUuid: string) => {
    setDeletePopupId(customerId);
    setDeleteCustomerId(customerUuid);
  };

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Customer"
          onCancel={() => {
            setDeletePopupId(null);
            setDeleteCustomerId(null);
          }}
          onDelete={handleDeleteCustomer}
          isDeleting={isDeleting}
        />
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[400px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Customer
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Address
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Telephone
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Date <span className="invisible">chase</span>
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Agreement
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Actions
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
                  No customers found
                </td>
              </tr>
            ) : (
              paginated.map((customer) => (
                <React.Fragment key={customer.id}>
                  <tr
                    className={`hover:bg-gray-50 ${
                      expandedId === customer.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleExpand(customer.id)}
                          className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        >
                          <span
                            className={`text-gray-400 text-xs transition-transform ${
                              expandedId === customer.id ? "rotate-180" : ""
                            }`}
                          >
                            <ArrowCollapseIcon className="rotate-270" />
                          </span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                          {(customer.name?.split(" ").map((n) => n[0]).join("") || "N/A")}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {customer.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.email || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {customer.address || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {customer.telephone || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {customer.latestPurchase || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          agreementColors[customer.agreementType] ||
                          agreementColors["N/A"]
                        }`}
                      >
                        {customer.agreementType || "N/A"}
                      </span>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                        onClick={() =>
                          handleDeleteClick(customer.id, customer.customerId)
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>{" "}
                    </td>
                  </tr>
                  {expandedId === customer.id && (
                    <tr>
                      <td
                        colSpan={6}
                        className="bg-gray-50 border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="flex-1 mb-6 ">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Customer Information
                              </h3>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Customer Name
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.name || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Customer Number
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.customerNumber || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Customer Type
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.type || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Email
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.email || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Telephone
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.telephone || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Address
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.address || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Social Security Number
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.socialSecurityNumber || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Postal Code
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.postalCode || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Location
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.location || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Latest Purchase
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.latestPurchase || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Agreement
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.agreementType || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Status
                                  </div>
                                  <span
                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                      statusColors[customer.status] ||
                                      statusColors["Active"]
                                    }`}
                                  >
                                    {customer.status || "N/A"}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Total Orders
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.numberOfOrders || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Total Spent
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.totalSpent || "N/A"} kr
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                <Edit className="w-4 h-4" />
                                Edit Customer
                              </button>
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
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start mt-6">
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
            <span>entries of {filtered.length} entries</span>
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

export default CustomersTable;
