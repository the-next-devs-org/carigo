import { useState } from "react";
import { X, RefreshCw, Menu } from "lucide-react"

type CarType = {
  id: string;
  name: string;
  mileage: string;
  price: string;
  img: string;
  status: string;
};

const Forfragningar = () => {

  const [modalOpen_xyz, setModalOpen_xyz] = useState(false);
  const [currentCar_xyz, setCurrentCar_xyz] = useState(null);

  const [activeMainTab, setActiveMainTab] = useState("oversikt")
  const [activeSubTab, setActiveSubTab] = useState("oversikt-pris")

  const mainTabs = [
    { id: "oversikt", label: "Översikt & Pris" },
    { id: "tillganglighet", label: "Tillgänglighknit" },
    { id: "historik", label: "Historik" },
    { id: "dokument", label: "Dokument" },
  ]

  const subTabs = [
    { id: "oversikt-pris", label: "Översikt & Pris" },
    { id: "histori", label: "Histori" },
    { id: "service", label: "Service & Skada" },
  ]

  const statsData = [
    { label: "Nya Forfraginger", value: 7, iconType: "car" },
    { label: "Behandlas", value: 12, iconType: "check" },
    { label: "Bokade", value: 12, iconType: "calendar" },
    { label: "Offertvarve (Manad)", value: "85000 SEK", iconType: "hourglass" },
  ];

  const car_xyz: CarType = {
    id: "ABC123",
    name: "Toyota Corolla 2022",
    mileage: "12,450 km",
    price: "850 kr/dygn",
    img: "https://png.pngtree.com/png-vector/20250110/ourmid/pngtree-a-red-suv-car-in-side-view-png-image_15131280.png",
    status: "Available",
  };
  const openModal_xyz = () => {
    setCurrentCar_xyz(car_xyz);
    setModalOpen_xyz(true);
  };

  const closeModal_xyz = () => {
    setCurrentCar_xyz(null);
    setModalOpen_xyz(false);
  };

  return (
    <div className=" max-w-full mx-auto font-plus-jakarta">
      <section aria-label="Fordonsstatistik" className="w-full rounded-2xl bg-muted/50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex w-full gap-4 overflow-x-auto pb-2">
            {statsData.map((s, i) => {
              const icon = (() => {
                switch (s.iconType) {
                  case "car":
                    return (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <defs>
                            <style>{`
                              .cls-1 {
                                fill: none;
                                stroke: #000000;
                                stroke-linecap: round;
                                stroke-linejoin: round;
                                stroke-width: 2px;
                              }
                            `}</style>
                          </defs>
                          <title></title>
                          <g data-name="12-sent" id="_12-sent">
                            <polygon
                              className="cls-1"
                              points="19 31 13 19 1 13 31 1 19 31"
                            ></polygon>
                            <line className="cls-1" x1="13" y1="19" x2="25" y2="7"></line>
                          </g>
                        </g>
                      </svg>
                    );

                  case "check":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-5)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8 12l2.5 2.5L16 9" />
                      </svg>
                    );
                  case "calendar":
                    return (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--color-chart-5)" }} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8 12l2.5 2.5L16 9" />
                      </svg>
                    );
                  case "hourglass":
                    return (
                      <svg className="h-6 w-6"
                        viewBox="0 -0.5 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M5.11413 8.35688C4.75894 8.56999 4.64377 9.03069 4.85688 9.38587C5.06999 9.74106 5.53069 9.85623 5.88587 9.64312L5.11413 8.35688ZM10.5 6L10.95 5.4C10.7061 5.21704 10.3756 5.19999 10.1141 5.35688L10.5 6ZM14.5 9L14.05 9.6C14.3236 9.80522 14.7014 9.79932 14.9685 9.58565L14.5 9ZM19.9685 5.58565C20.292 5.32689 20.3444 4.85493 20.0857 4.53148C19.8269 4.20803 19.3549 4.15559 19.0315 4.41435L19.9685 5.58565ZM17.75 19C17.75 19.4142 18.0858 19.75 18.5 19.75C18.9142 19.75 19.25 19.4142 19.25 19H17.75ZM19.25 11C19.25 10.5858 18.9142 10.25 18.5 10.25C18.0858 10.25 17.75 10.5858 17.75 11H19.25ZM9.75 19C9.75 19.4142 10.0858 19.75 10.5 19.75C10.9142 19.75 11.25 19.4142 11.25 19H9.75ZM11.25 11C11.25 10.5858 10.9142 10.25 10.5 10.25C10.0858 10.25 9.75 10.5858 9.75 11H11.25ZM13.75 19C13.75 19.4142 14.0858 19.75 14.5 19.75C14.9142 19.75 15.25 19.4142 15.25 19H13.75ZM15.25 14C15.25 13.5858 14.9142 13.25 14.5 13.25C14.0858 13.25 13.75 13.5858 13.75 14H15.25ZM5.75 19C5.75 19.4142 6.08579 19.75 6.5 19.75C6.91421 19.75 7.25 19.4142 7.25 19H5.75ZM7.25 14C7.25 13.5858 6.91421 13.25 6.5 13.25C6.08579 13.25 5.75 13.5858 5.75 14H7.25ZM5.88587 9.64312L10.8859 6.64312L10.1141 5.35688L5.11413 8.35688L5.88587 9.64312ZM10.05 6.6L14.05 9.6L14.95 8.4L10.95 5.4L10.05 6.6ZM14.9685 9.58565L19.9685 5.58565L19.0315 4.41435L14.0315 8.41435L14.9685 9.58565ZM19.25 19V11H17.75V19H19.25ZM11.25 19V11H9.75V19H11.25ZM15.25 19V14H13.75V19H15.25ZM7.25 19V14H5.75V19H7.25Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>
                    );

                }
              })();

              return (
                <div key={i} className="relative min-w-[230px] rounded-xl bg-card p-3 shadow-sm bg-white">
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-foreground">{s.value}</div>
                  <div className="absolute bottom-3 right-3">{icon}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div >
  );
};

export default Forfragningar;
