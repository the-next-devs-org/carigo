import React, { useEffect, useState } from "react";
import { X, RefreshCw, Menu } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import { BACKEND_API_ENDPOINT, xApiKey } from "../../api/config";
interface Vehicle {
    id: number;
    user_id: number;
    name: string;
    brand: string;
    category: string;
    year: number;
    color: string;
    registration_number: string;
    price_per_day: number;
    available: boolean;
    description: string;
    image: string;
    status: string;
    origin_market: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

interface Package {
    id: number;
    name: string;
    description: string;
    booking_overview: string;
    price_per_day: number;
    discount_percent: number;
    deductible: string;
    waiver_damage: boolean;
    liability_insurance: boolean;
    roadside_protection: boolean;
    accident_coverage: boolean;
    property_coverage: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Booking {
    id: number;
    vehicle_id: number;
    package_id: number;
    addons: number[];
    total_price: number;
    phone: string;
    sms_notifications: boolean;
    is_25_or_older: boolean;
    has_read_terms: boolean;
    country: string | null;
    company: string | null;
    firstname: string;
    surname: string;
    email: string;
    streetaddress: string | null;
    zipcode: string | null;
    city: string | null;
    cardnumber: string | null;
    cardholder: string | null;
    card_date: string | null;
    card_cvc: string | null;
    fightnumber: string | null;
    createdAt: string;
    updatedAt: string;
    vehicle?: Vehicle;
    package?: Package;
}

interface ApiResponse {
    success: boolean;
    count: number;
    data: Booking[];
}
const Bokningar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const url = "bookings/getall";
    const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(fullUrl);
                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    const formattedEvents = result.data.map((booking: any) => {
                        const title = `${booking.firstname} ${booking.surname} - ${booking.vehicle?.name || ""
                            }`;
                        const start = booking.createdAt.split("T")[0];
                        const color = booking.package_id === 2 ? "#16a34a" : "#f97316";

                        return {
                            title,
                            start,
                            color,
                            extendedProps: {
                                firstname: booking.firstname,
                                surname: booking.surname,
                                phone: booking.phone,
                                email: booking.email,
                                total_price: booking.total_price,
                                vehicle: booking.vehicle?.name,
                                package: booking.package?.name,
                                vehicle_image:
                                    booking.vehicle?.image_url ||
                                    booking.vehicle?.image ||
                                    null, // 👈 now includes both possible fields
                            },
                        };
                    });

                    setEvents(formattedEvents);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handleEventClick = (info: EventClickArg) => {
        setSelectedEvent(info.event);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-full mx-auto font-plus-jakarta p-4">
            <section
                aria-label="Kalendervy filter"
                className="w-full rounded-xl border border-border/60 bg-background/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
                <div className="px-4 py-3 sm:px-5 sm:py-4">
                    <div className="text-sm text-muted-foreground mb-2">Kalendervy</div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <label className="text-sm text-foreground/80">Status:</label>

                        <div role="group" aria-label="Status" className="flex items-center gap-2">
                            <button
                                type="button"
                                className="aktiva h-8 px-3 text-sm bg-primary/10 text-primary border-primary/40"
                            >
                                Aktiva
                            </button>
                            <button
                                type="button"
                                className="aktivaotherbuttons h-8 px-3 text-sm text-foreground/80 bg-background"
                            >
                                Alla
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="aktivaotherbuttons h-8 px-3 text-sm text-foreground/80 bg-background"
                            >
                                Kund: Alla
                            </button>
                        </div>

                        <div className="hidden sm:flex items-center">
                            {/* <div className="h-[1px] w-6 bg-border/70" />
                            <div className="mx-2 h-4 w-4 rounded-full border border-border bg-background shadow-[0_1px_0_0_rgba(0,0,0,0.03)]" />
                            <div className="h-[1px] w-2 bg-border/70" /> */}
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>

                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="aktivaotherbuttons h-8 px-3 text-sm text-foreground/80 bg-background"
                            >
                                Datum: (Oktober 2025)
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="p-4 bg-white rounded-2xl shadow-md">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    height="auto"
                />

                {isModalOpen && selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                        <section
                            className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl border border-[var(--border)] shadow-lg"
                            role="dialog"
                            aria-labelledby="booking-title"
                        >
                            <header className=" py-4 border-[var(--border)]">
                                <div className="flex items-start justify-between gap-2 p-3">
                                    <div>
                                        <h1
                                            id="booking-title"
                                            className="text-sm font-semibold text-[var(--fg-strong)]"
                                        >
                                            Bokning:{" "}
                                            {selectedEvent.extendedProps?.title ||
                                                `${selectedEvent.extendedProps?.firstname || "N/A"} ${selectedEvent.extendedProps?.surname || ""
                                                }`}{" "}
                                            ({selectedEvent.extendedProps?.vehicle || "Ingen bil"})
                                        </h1>

                                        <nav aria-label="progress" className="mt-2">
                                            <ol className="flex items-center text-xs text-[var(--muted-fg)]">
                                                <li className="flex items-center gap-2">
                                                    <span>Godkänd</span>
                                                    <svg width="15" height="15" className="inline-block rounded-full bg-[var(--muted-border)] ml-2 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z" fill="#d4d4d4"></path> </g></svg>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="inline-flex items-center gap-2 rounded-md bg-[var(--success-soft)] text-[var(--success-fg)] px-2 py-1">
                                                        <span>Utlämning (Check-in)</span>
                                                    </span>
                                                    <svg className="inline-block rounded-full bg-[var(--success)] ml-1 mr-1" width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z" fill="#7cd37c"></path> </g></svg>
                                                </li>
                                                <li className="flex items-center">
                                                    <span>Uthyrd (Återlämnat)</span>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>

                                    <button
                                        aria-label="Stäng"
                                        onClick={() => setIsModalOpen(false)}
                                        className="closesbuttontang text-[var(--muted-fg)] hover:text-[var(--fg-strong)]"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-3 border-t border-b border-[var(--border)]">
                                    <div className="flex items-center text-sm">
                                        <button className="py-2 text-[var(--muted-fg)] border-b-2 hover:text-[var(--fg-strong)] pl-3 pr-3">
                                            Översikt
                                        </button>
                                        <button className="py-2 text-[var(--primary)] border-l border-[var(--primary)] pl-3 pr-3">
                                            Utlämning
                                        </button>
                                        <button className="py-2 text-[var(--muted-fg)]  border-l hover:text-[var(--fg-strong)] pl-3 pr-3">
                                            Återlämning
                                        </button>
                                        <button className="py-2 text-[var(--muted-fg)] border-l hover:text-[var(--fg-strong)] pl-3 pr-3">
                                            Dokument
                                        </button>
                                    </div>
                                </div>
                            </header>

                            <div className="px-4 py-4 space-y-4">
                                <h2 className="text-sm font-medium text-[var(--fg-strong)]">
                                    Steg 2: Registrera Fordonsstatus vid Utlämning
                                </h2>

                                {/* Kund & Avtal */}
                                <div className="rounded-lg bg-white p-3 shadow-lg">
                                    <h3 className="text-sm font-semibold text-[var(--fg-strong)]">
                                        Steg 1: Verifiera Kund & Avtal
                                    </h3>

                                    <dl className="mt-3 space-y-3 text-sm">
                                        <div className="flex items-center justify-between gap-3">
                                            <dt className="text-[var(--fg-strong)]">Kund</dt>
                                            <dd className="text-[var(--muted-fg)]">
                                                {selectedEvent.extendedProps?.firstname}{" "}
                                                {selectedEvent.extendedProps?.surname}
                                            </dd>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <dt className="text-[var(--fg-strong)]">E-post</dt>
                                            <dd className="text-[var(--muted-fg)]">
                                                {selectedEvent.extendedProps?.email}
                                            </dd>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <dt className="text-[var(--fg-strong)]">Telefon</dt>
                                            <dd className="text-[var(--muted-fg)]">
                                                {selectedEvent.extendedProps?.phone || "Ej angiven"}
                                            </dd>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <dt className="text-[var(--fg-strong)]">Paket</dt>
                                            <dd className="text-[var(--muted-fg)]">
                                                {selectedEvent.extendedProps?.package || "Ingen info"}
                                            </dd>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <dt className="text-[var(--fg-strong)]">Totalt pris</dt>
                                            <dd className="text-[var(--success-fg)] font-medium">
                                                {selectedEvent.extendedProps?.total_price
                                                    ? `${selectedEvent.extendedProps.total_price} SEK`
                                                    : "Ej tillgängligt"}
                                            </dd>
                                        </div>
                                    </dl>

                                    {/* Vehicle image and info */}
                                    <div className="mt-3 flex items-center gap-3 rounded-md p-2">
                                        <img
                                            src={
                                                selectedEvent.extendedProps?.vehicle_image
                                                    ? selectedEvent.extendedProps.vehicle_image
                                                    : "/placeholder.svg"
                                            }
                                            alt="Fordon"
                                            className="h-16 w-28 rounded-md object-cover bg-[var(--panel)]"
                                        />

                                        <div className="text-xs text-[var(--muted-fg)]">
                                            Fordon: {selectedEvent.extendedProps?.vehicle || "N/A"}
                                        </div>
                                    </div>

                                    <div className="">
                                        <button
                                            className="btn btnghost"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Sluttor Utlamning - Fordon Uhyrrdl
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Bokningar;
