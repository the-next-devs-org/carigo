import React from "react";
import { useState } from "react";

import { AlertCircle, Clock3, Shield, Search } from "lucide-react";

const kpiBase =
    "flex-1 min-w-[220px] bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition";

const numberBase = "font-extrabold tracking-tight";

function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("Search submitted")
}

const avtalbetalning: React.FC = () => {
    const [detailisOpen, detailsetIsOpen] = useState(false);

    return (
        <div className="p-6 space-y-5">
            {/* KPI row */}
            <div className="flex flex-wrap gap-4">
                {/* Obetalda fakturor */}
                <div className={kpiBase}>
                    <p className="text-sm text-gray-600 mb-2">Obetalda fakturor</p>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <span className={`${numberBase} text-red-700 pricenumber`}>32 000 SEK</span>
                    </div>
                </div>

                {/* Kommande */}
                <div className={kpiBase}>
                    <p className="text-sm text-gray-600 mb-2">Kommande</p>
                    <div className="flex items-center gap-2">
                        <Clock3 className="w-6 h-6 text-yellow-600" />
                        <span className={`${numberBase} text-yellow-700 pricenumber`}>12 000 SEK</span>
                    </div>
                </div>

                {/* Total deposition */}
                <div className={kpiBase}>
                    <p className="text-sm text-gray-600 mb-2">Total deposition</p>
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-blue-600" />
                        <span className={`${numberBase} text-blue-700 pricenumber`}>32 000 SEK</span>
                    </div>
                </div>

                {/* Obetalda fakturor (exempel 2) */}
                <div className={kpiBase}>
                    <p className="text-sm text-gray-600 mb-2">fakturavarte (Manad)</p>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-red-600 textsuccessset" />
                        <span className={`${numberBase} text-red-700 pricenumber textsuccessset`}>32 000 SEK</span>
                    </div>
                </div>
            </div>

            <section
                aria-label="Filters and actions"
                className="rounded-xl backdrop-blur px-4 py-3 md:px-5 md:py-4"
            >
                {/* Row 1: filter + label + search */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between widthsetfiltermenu">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            className="filterbutton  inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                            onClick={() => console.log("Filter clicked")}
                        >
                            <span>Filter</span>
                            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current opacity-80">
                                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.175l3.71-2.945a.75.75 0 1 1 .94 1.17l-4.18 3.315a.75.75 0 0 1-.94 0L5.25 8.4a.75.75 0 0 1-.02-1.19z" />
                            </svg>
                        </button>

                        <span className="hidden text-sm text-muted-foreground md:inline ml-4 fontgreycolorset">Signeringsstatus</span>
                        <form role="search" onSubmit={onSearchSubmit} className="w-full md:max-w-md inputsearch">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    id="search"
                                    placeholder="Search"
                                    className="w-full bgbackgroundsearch pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                                />
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-foreground/60"
                                >
                                    <path d="M10 4a6 6 0 1 1 3.996 10.392l4.156 4.156a1 1 0 0 1-1.414 1.414l-4.156-4.156A6 6 0 0 1 10 4zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Row 2: static tabs + primary action */}
                <div className="mt-3 flex flex-col gap-3 md:mt-4 md:flex-row md:items-center md:justify-between">
                    <nav aria-label="Filter tabs" role="tablist" className="navtablist rounded-lg flex flex-wrap gap-2 ">
                        <button className="paddingsettalist rounded-lg px-3 py-1.5 text-sm font-medium bg-brand text-brand-foreground border-brand">
                            Dillsklus
                        </button>
                        <button className="paddingsettalist rounded-lg px-3 py-1.5 text-sm font-medium bg-background text-foreground/80 hover:bg-accent">
                            Betalstatus
                        </button>
                        <button className="paddingsettalist rounded-lg px-3 py-1.5 text-sm font-medium bg-background text-foreground/80 hover:bg-accent">
                            Signeringsstatus
                        </button>
                        <button className="paddingsettalist rounded-lg px-3 py-1.5 text-sm font-medium bg-background text-foreground/80 hover:bg-accent">
                            Avtalstyp
                        </button>
                    </nav>

                    <div className="flex md:justify-center">
                        <button
                            type="button"
                            onClick={() => console.log("Skapa Manuel Faktura clicked")}
                            className="skapabutton inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-ring/50"
                        >
                            Skapa Manuel Faktura
                        </button>
                    </div>
                    <div className="flex md:justify-center"></div>
                    <div className="flex md:justify-center"></div>
                    <div className="flex md:justify-center"></div>
                    <div className="flex md:justify-center"></div>
                </div>

                <div className="mt-10 bg-white border border-gray-100 p-5 transition rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 recieptgorb">Reciept Gorb</p>
                    <table className="w-full table-auto mt-5">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-2 text-left text-sm font-medium text-black-500">Boksingarummer</th>
                                <th className="py-2 text-left text-sm font-medium text-black-500"></th>
                                <th className="py-2 text-left text-sm font-medium text-black-500">Bentalstatus</th>
                                <th className="py-2 text-left text-sm font-medium text-black-500">Sigtalstatus</th>
                                <th className="py-2 text-left text-sm font-medium text-black-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 text-sm text-gray-700">123456</td>
                                <td className="py-2 text-sm text-gray-700">Anna Svensson</td>
                                <td className="py-2 text-sm text-gray-700"><span className="badgedanger">Bstuld</span></td>
                                <td className="py-2 text-sm text-gray-700"><span className="badgesuccess">Betald </span></td>
                                <td className="py-2 text-sm text-gray-700">
                                    <button
                                        className="hactionbutton skapabutton inline-flex items-center justify-center rounded-lg bg-brand font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-ring/50"
                                        onClick={() => detailsetIsOpen(true)}
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                                stroke="#efefef"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                stroke="#efefef"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </button>

                                    {detailisOpen && (
                                        <div className="bottomsetmodaldeatil fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                                            <div className="bg-white rounded-lg shadow-lg w-80 max-w-sm p-0 relative max-h-[80vh] flex flex-col">
                                                <button
                                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
                                                    onClick={() => detailsetIsOpen(false)}
                                                >
                                                    ✕
                                                </button>

                                                <div className="bg-secondary/80 px-4 py-3 rounded-t-lg flex-shrink-0">
                                                    <h2 className="text-lg font-semibold leading-6 text-foreground">Faktura Hub</h2>
                                                    <p className="mt-1 text-sm text-muted-foreground">F-12345 (Anna Svensson)</p>

                                                    <nav className="mt-3">
                                                        <ul className="flex items-center gap-4 text-xs">
                                                            <li className="relative pb-2 activeborder">
                                                                <button className="text-brand font-medium outline-none" aria-current="page">
                                                                    Översikt & Belopp
                                                                </button>
                                                                <span className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] bg-brand rounded-full" />
                                                            </li>
                                                            <li className="pb-2 text-muted-foreground">
                                                                <button className="hover:text-foreground focus:text-foreground">Signering &</button>
                                                            </li>
                                                            <li className="pb-2 text-muted-foreground">
                                                                <button className="hover:text-foreground focus:text-foreground">Betalningslogg</button>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>

                                                <div className="px-4 py-4 overflow-y-auto flex-1 pt-0">
                                                    <h3 className="mb-2 text-sm font-medium text-foreground">Fakturasammanställning</h3>

                                                    <div className="rounded-lg whitebgbackground p-3 shadow-lg space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="font-semibold">Hyresmomsättning</span>
                                                            <span>7 000 kr</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Hyreskostnad</span>
                                                            <span>500 kr</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Tilläggstjänster</span>
                                                            <span>500 kr</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Tilläggsavgifters</span>
                                                            <span>850 kr</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Deposition dras</span>
                                                            <span>850 kr</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>- 2 000 SEK</span>
                                                            <span className="text-red-600 textsuccessset">-2 000 kr</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <p className="text-sm text-muted-foreground">Slutsum att betala/återbetala</p>
                                                        <div className="mt-1 text-2xl font-bold leading-none textsuccessset">6 350 SEK</div>
                                                    </div>

                                                    <div className="mt-8 flex gap-2">
                                                        <button className="fontsizeset skapabutton inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium bg-brand text-brand-foreground hover:opacity-95">
                                                            Skicka Betalningslänk
                                                        </button>
                                                        <button className="fontsizeset bgsuccessset inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium bg-success text-white hover:opacity-95">
                                                            Bokför manuellt i Fortnox
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )}


                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 text-sm text-gray-700">789012</td>
                                <td className="py-2 text-sm text-gray-700">Final Faktura</td>
                                <td className="py-2 text-sm text-gray-700"><span className="badgedanger">Unstbhd</span></td>
                                <td className="py-2 text-sm text-gray-700"><span className="badgeinfo">Utessonde</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section >

        </div >
    );
};

export default avtalbetalning;