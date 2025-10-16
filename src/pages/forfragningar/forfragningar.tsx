import React, { useState, useEffect } from 'react';
import { Send, Clock, CheckCircle, TrendingUp, Info } from 'lucide-react';
import axios from 'axios';
import { BACKEND_API_ENDPOINT } from "../../api/config";
import { X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface InquiryCardProps {
  id: number;
  name: string;
  date: string;
  createdAt: string;
  headerColor: string;
  borderColor: string;
  onDelete?: () => void;
  onUpdate?: (updatedInquiry: any) => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`${iconBgColor} p-3 rounded-lg`}>{icon}</div>
  </div>
);

// Colors based on status
const getColorsByStatus = (status: string) => {
  switch (status) {
    case "booked":
      return { headerColor: "bg-green-100", borderColor: "border-green-200" };
    case "pending":
      return { headerColor: "bg-yellow-100", borderColor: "border-yellow-200" };
    case "new":
      return { headerColor: "bg-blue-100", borderColor: "border-blue-200" };
    case "cancelled":
      return { headerColor: "bg-red-100", borderColor: "border-red-200" };
    default:
      return { headerColor: "bg-gray-100", borderColor: "border-gray-200" };
  }
};

const InquiryCard: React.FC<InquiryCardProps> = ({ id, name, date, createdAt, headerColor, borderColor, onDelete, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = async () => {
    setModalOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_API_ENDPOINT}inquiries/getsingle/${id}`);
      setDetails(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusAction = async (bookingId: string, action: string, onDelete?: () => void, onUpdate?: (updatedInquiry: any) => void) => {
    try {
      let url = `${BACKEND_API_ENDPOINT}inquiries/update-status`;
      let payload: any = { inquiry_id: bookingId };
      let method: "post" | "delete" = "post";

      if (action === "Erase") {
        url = `${BACKEND_API_ENDPOINT}inquiries/delete/${bookingId}`;
        method = "delete";
        payload = {};
      } else if (action === "Start") {
        payload.status = "pending";
      } else if (action === "Decline") {
        payload.status = "new";
      } else if (action === "Approve") {
        payload.status = "booked";
      }

      const response =
        method === "post"
          ? await axios.post(url, payload)
          : await axios.delete(url);

      if (response.status === 200) {
        toast.success(`${action} completed successfully!`);

        if (action === "Erase" && onDelete) {
          onDelete();
          setModalOpen(false);
        }

        if (action !== "Erase" && response.data?.data) {
          setDetails(response.data.data);
          setModalOpen(false);

          if (onUpdate) {
            onUpdate(response.data.data);
          }
        }


      } else {
        toast.error(`Failed to perform "${action}" action.`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg border-2 ${borderColor} overflow-hidden cursor-pointer h-32 flex flex-col`}
        onClick={handleCardClick}
      >
        <div className={`${headerColor} px-4 py-3 flex items-center justify-between flex-shrink-0`}>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
          <Info size={16} className="text-gray-400" />
        </div>

        <div className="px-4 py-3 space-y-1 flex-grow">
          <p className="text-xs text-gray-600">{date}  {new Date(createdAt).toLocaleTimeString()}</p>
          <p className="text-sm font-semibold text-gray-900 mt-2">{name}</p>
        </div>
      </div>

      {modalOpen && (
        <div
          style={{
            "--primary": "#1e8bff",
            "--primary-foreground": "#ffffff",
          } as React.CSSProperties}
          className="fixed inset-0 z-50 flex"
        >
          <div className="h-full w-full bg-black/30 backdrop-blur-sm" />

          <aside
            className={`border-2 ${borderColor} relative ml-auto flex h-full w-[500px] max-w-[90vw] flex-col bg-white shadow-xl`}
          >
            <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Förfrågan: <span className="font-medium">{details?.data?.name || 'Detaljer'}</span>
                </h2>
                <p className="text-xs text-gray-500">
                  {details?.data?.date}{" "}
                  {details?.data?.createdAt
                    ? new Date(details.data.createdAt).toLocaleTimeString()
                    : ""}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </header>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200 px-2 pt-2">
              <button className="relative rounded-t-md px-3 py-2 text-sm text-blue-600">
                Översikt
                <span className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded bg-blue-600" />
              </button>
              <button className="rounded-t-md px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                Tillägg
              </button>
              <button className="rounded-t-md px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                Kommunikation
              </button>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Kundinformation
              </h3>

              <div className="space-y-1.5">
                {loading ? (
                  <p>Loading details...</p>
                ) : details?.data ? (
                  <div className="space-y-2">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                      <img
                        className="w-full h-48 object-cover"
                        src={details.data.vehicle?.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                        alt={details.data.vehicle?.name}
                      />
                      <div className="p-5">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {details.data.vehicle?.name} ({details.data.vehicle?.year})
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Brand:</strong> {details.data.vehicle?.brand} | <strong>Model:</strong> {details.data.vehicle?.model} | <strong>Category:</strong> {details.data.vehicle?.category}
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Color:</strong> {details.data.vehicle?.color} | <strong>Fuel:</strong> {details.data.vehicle?.fuel_type} | <strong>Transmission:</strong> {details.data.vehicle?.transmission}
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Seats:</strong> {details.data.vehicle?.number_of_seats} | <strong>Doors:</strong> {details.data.vehicle?.number_of_doors} | <strong>Mileage:</strong> {details.data.vehicle?.mileage} km
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Price per day:</strong> {details.data.vehicle?.price_per_day} SEK | <strong>Price per week:</strong> {details.data.vehicle?.price_per_week} SEK
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {details.data.vehicle?.short_description}
                        </p>

                        {details.data.vehicle?.feature_tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {details.data.vehicle.feature_tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <div className="p-5">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Other Information
                          </h2>
                          <p><strong>Email:</strong> {details.data.booking?.email}</p>
                          <p><strong>First Name:</strong> {details.data.booking?.firstname}</p>
                          <p><strong>Last Name:</strong> {details.data.booking?.surname}</p>
                          <p><strong>Phone:</strong> {details.data.booking?.phone}</p>
                          <p><strong>Country:</strong> {details.data.booking?.country}</p>
                          <p><strong>City:</strong> {details.data.booking?.city}</p>
                          <p><strong>Street Address:</strong> {details.data.booking?.streetaddress}</p>
                          <p><strong>Zip Code:</strong> {details.data.booking?.zipcode}</p>
                          <p><strong>Company:</strong> {details.data.booking?.company}</p>
                          <p><strong>Card Number:</strong> {details.data.booking?.cardnumber}</p>
                          <p><strong>Card Holder:</strong> {details.data.booking?.cardholder}</p>
                          <p>
                            <strong>Card Expiry:</strong>{" "}
                            {details.data.booking?.card_date
                              ? (() => {
                                const date = new Date(details.data.booking.card_date);
                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                const year = String(date.getFullYear()).slice(-2);
                                return `${month}/${year}`;
                              })()
                              : "N/A"}
                          </p>
                          <p><strong>Card CVC:</strong> {details.data.booking?.card_cvc}</p>
                          <p><strong>Flight Number:</strong> {details.data.booking?.fightnumber}</p>
                          <p><strong>Total Amount:</strong> {details.data.booking?.total_price} SEK</p>
                          <p><strong>Age 25 or Older:</strong> {details.data.booking?.is_25_or_older ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <p>No details available</p>
                )}
              </div>
            </main>

            {/* Footer with condition buttons */}
            <footer className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-white px-4 py-3">
              {/* NEW */}
              {details?.data?.status === "new" && (
                <>
                  <button
                    onClick={() => handleStatusAction(details.data.id, "Erase", onDelete, onUpdate)}
                    className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
                  >
                    Erase
                  </button>
                  <button
                    onClick={() => handleStatusAction(details.data.id, "Start", onDelete, onUpdate)}
                    className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Start
                  </button>
                </>
              )}

              {/* PENDING */}
              {details?.data?.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusAction(details.data.id, "Decline", onDelete, onUpdate)}
                    className="flex-1 rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleStatusAction(details.data.id, "Approve", onDelete, onUpdate)}
                    className="flex-1 rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Approve
                  </button>
                </>
              )}


              {details?.data?.status === "booked" && (
                <>
                  <button className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
                    Take Payment
                  </button>
                  <button className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
                    Send Agreement
                  </button>
                  <button className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
                    Delete Booking
                  </button>
                </>
              )}
            </footer>
          </aside>

        </div>
      )}

    </>
  );
};

const Forfragningar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Alla');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAllInquiriesUrl = `${BACKEND_API_ENDPOINT}inquiries/getallinquiry`;

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(getAllInquiriesUrl);
        const rawData = response.data.data;

        // Group by category and assign colors based on status
        const grouped: any = {};
        rawData.forEach((item: any) => {
          const category = item.category || "Övrigt";
          if (!grouped[category]) grouped[category] = [];
          const colors = getColorsByStatus(item.status);

          grouped[category].push({
            ...item,
            createdAt: item.createdAt || item.created_at, // normalize
            headerColor: colors.headerColor,
            borderColor: colors.borderColor,
          });
        });


        const columns = Object.keys(grouped).map((category) => ({
          id: category,
          category,
          count: grouped[category].length,
          items: grouped[category],
        }));

        setInquiries(columns);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load inquiries');
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const updateInquiryInList = (updatedInquiry: any) => {
    setInquiries(prev =>
      prev.map(col => ({
        ...col,
        items: col.items.map(i => i.id === updatedInquiry.id ? updatedInquiry : i)
      }))
    );
  };

  const statusMap: Record<string, string> = {
    "Nya Förfrågningar": "new",
    "Behandlas": "pending",
    "Bokade": "booked",
    "Alla": "all"
  };

  const filteredInquiries = inquiries
    .flatMap(col => col.items)
    .filter(item => {
      if (activeFilter === "Alla") return true; // Show all
      return item.status === statusMap[activeFilter];
    });


  return (
    <div className="p-6 space-y-5 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Nya Förfrågningar"
          value={inquiries.flatMap(col => col.items).filter(i => i.status === "new").length}
          icon={<Send size={24} className="text-blue-600" />}
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Behandlas"
          value={inquiries.flatMap(col => col.items).filter(i => i.status === "pending").length}
          icon={<Clock size={24} className="text-yellow-600" />}
          iconBgColor="bg-yellow-100"
        />
        <StatCard
          title="Bokade"
          value={inquiries.flatMap(col => col.items).filter(i => i.status === "booked").length}
          icon={<CheckCircle size={24} className="text-green-600" />}
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Offerförlinje Månad"
          value={`${filteredInquiries.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()} SEK`}
          icon={<TrendingUp size={24} className="text-green-600" />}
          iconBgColor="bg-green-100"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Förfrågningar</h2>

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          Filter :
          {["Alla", "Nya Förfrågningar", "Behandlas", "Bokade"].map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`filterbuttonwidthsetting px-3 py-1.5 rounded text-sm border border-gray-300 transition-colors
              ${activeFilter === filter ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}

            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map(item => (
              <InquiryCard
                key={item.id}
                id={item.id}
                name={item.name}
                date={item.date}
                createdAt={item.createdAt}
                headerColor={item.headerColor}
                borderColor={item.borderColor}
                onDelete={() =>
                  setInquiries(prev =>
                    prev.map(col => ({
                      ...col,
                      items: col.items.filter(i => i.id !== item.id),
                    }))
                  )
                }
                onUpdate={(updatedInquiry) => {
                  const colors = getColorsByStatus(updatedInquiry.status);
                  const updatedWithColors = {
                    ...updatedInquiry,
                    headerColor: colors.headerColor,
                    borderColor: colors.borderColor,
                  };
                  setInquiries(prev =>
                    prev.map(col => ({
                      ...col,
                      items: col.items.map(i =>
                        i.id === updatedWithColors.id ? updatedWithColors : i
                      ),
                    }))
                  );
                }}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 mt-4">Inga data hittades</p>
          )}
        </div>


      )}
    </div>
  );
};

export default Forfragningar;
