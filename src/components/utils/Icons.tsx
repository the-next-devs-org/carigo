import React from "react";

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className={props.className}
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

export const VehiclesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export const RevenueIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className={props.className}
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export const AgreementsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

// AgreementStats SVGs
export const PurchasingAgreementIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" {...props}>
    <path
      d="M12.88 14.4934C12.7466 14.4801 12.5866 14.4801 12.44 14.4934C9.26664 14.3867 6.74664 11.7867 6.74664 8.58675C6.74664 5.32008 9.38664 2.66675 12.6666 2.66675C15.9333 2.66675 18.5866 5.32008 18.5866 8.58675C18.5733 11.7867 16.0533 14.3867 12.88 14.4934Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5467 5.33325C25.1333 5.33325 27.2133 7.42659 27.2133 9.99992C27.2133 12.5199 25.2133 14.5733 22.72 14.6666C22.6133 14.6533 22.4933 14.6533 22.3733 14.6666"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.21333 19.4133C2.98667 21.5733 2.98667 25.0933 6.21333 27.2399C9.88 29.6933 15.8933 29.6933 19.56 27.2399C22.7867 25.0799 22.7867 21.5599 19.56 19.4133C15.9067 16.9733 9.89333 16.9733 6.21333 19.4133Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.12 26.6667C26.08 26.4667 26.9867 26.0801 27.7333 25.5067C29.8133 23.9467 29.8133 21.3734 27.7333 19.8134C27 19.2534 26.1067 18.8801 25.16 18.6667"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SalesAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" {...props}>
    <path
      d="M3 13.3333H29.6667"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.731 27.333H8.91772C4.18439 27.333 2.98438 26.1597 2.98438 21.4797V10.5197C2.98438 6.27969 3.97108 4.91969 7.69108 4.70636C8.06441 4.69303 8.47772 4.67969 8.91772 4.67969H23.731C28.4644 4.67969 29.6644 5.85302 29.6644 10.533V16.413"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33331 21.3333H13.6666"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.6667 24.0001C29.6667 25.0001 29.3866 25.9467 28.8933 26.7467C27.9733 28.2934 26.28 29.3334 24.3333 29.3334C22.3867 29.3334 20.6934 28.2934 19.7734 26.7467C19.28 25.9467 19 25.0001 19 24.0001C19 21.0534 21.3867 18.6667 24.3333 18.6667C27.28 18.6667 29.6667 21.0534 29.6667 24.0001Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.2552 23.9993L23.5752 25.3193L26.4152 22.6926"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BrokerageAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <path
      d="M23.9999 9.54675C23.9199 9.53342 23.8266 9.53342 23.7466 9.54675C21.9066 9.48009 20.4399 7.97342 20.4399 6.10675C20.4399 4.20008 21.9733 2.66675 23.8799 2.66675C25.7866 2.66675 27.3199 4.21342 27.3199 6.10675C27.3066 7.97342 25.8399 9.48009 23.9999 9.54675Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6266 19.2534C24.4532 19.5601 26.4666 19.2401 27.8799 18.2934C29.7599 17.0401 29.7599 14.9867 27.8799 13.7334C26.4532 12.7867 24.4132 12.4667 22.5865 12.7867"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.96002 9.54675C8.04002 9.53342 8.13335 9.53342 8.21335 9.54675C10.0533 9.48009 11.52 7.97342 11.52 6.10675C11.52 4.20008 9.98668 2.66675 8.08002 2.66675C6.17335 2.66675 4.64001 4.21342 4.64001 6.10675C4.65335 7.97342 6.12002 9.48009 7.96002 9.54675Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33338 19.2534C7.50671 19.5601 5.49338 19.2401 4.08004 18.2934C2.20004 17.0401 2.20004 14.9867 4.08004 13.7334C5.50671 12.7867 7.54671 12.4667 9.37337 12.7867"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9999 19.5067C15.9199 19.4934 15.8266 19.4934 15.7466 19.5067C13.9066 19.44 12.4399 17.9334 12.4399 16.0667C12.4399 14.16 13.9733 12.6267 15.8799 12.6267C17.7866 12.6267 19.3199 14.1734 19.3199 16.0667C19.3066 17.9334 17.8399 19.4534 15.9999 19.5067Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.12 23.7067C10.24 24.9601 10.24 27.0134 12.12 28.2667C14.2533 29.6934 17.7466 29.6934 19.88 28.2667C21.76 27.0134 21.76 24.9601 19.88 23.7067C17.76 22.2934 14.2533 22.2934 12.12 23.7067Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// AgreementsTable SVGs
export const ArrowCollapseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.86241 10C4.60039 10 4.33937 9.898 4.14336 9.69501L0.280061 5.69511C-0.0979677 5.30212 -0.0929674 4.67913 0.293062 4.29314L4.29337 0.293243C4.6834 -0.0977476 5.31645 -0.0977476 5.70748 0.293243C6.09751 0.684233 6.09751 1.31622 5.70748 1.70721L2.40222 5.01212L5.58147 8.30504C5.9655 8.70303 5.9545 9.33602 5.55747 9.71901C5.36245 9.907 5.11243 10 4.86241 10Z"
      fill="#5E636B"
    />
  </svg>
);

export const EditAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M13.26 3.60022L5.04997 12.2902C4.73997 12.6202 4.43997 13.2702 4.37997 13.7202L4.00997 16.9602C3.87997 18.1302 4.71997 18.9302 5.87997 18.7302L9.09997 18.1802C9.54997 18.1002 10.18 17.7702 10.49 17.4302L18.7 8.74022C20.12 7.24022 20.76 5.53022 18.55 3.44022C16.35 1.37022 14.68 2.10022 13.26 3.60022Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.89 5.0498C12.32 7.8098 14.56 9.9198 17.34 10.1998"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 22H21"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ViewAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M16.96 6.16992C18.96 7.55992 20.34 9.76992 20.62 12.3199"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.48999 12.3697C3.74999 9.82973 5.10999 7.61973 7.08999 6.21973"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.19 20.9404C9.35 21.5304 10.67 21.8604 12.06 21.8604C13.4 21.8604 14.66 21.5604 15.79 21.0104"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.06 7.69965C13.5954 7.69965 14.84 6.455 14.84 4.91965C14.84 3.3843 13.5954 2.13965 12.06 2.13965C10.5247 2.13965 9.28003 3.3843 9.28003 4.91965C9.28003 6.455 10.5247 7.69965 12.06 7.69965Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.82999 19.9204C6.36534 19.9204 7.60999 18.6757 7.60999 17.1404C7.60999 15.605 6.36534 14.3604 4.82999 14.3604C3.29464 14.3604 2.04999 15.605 2.04999 17.1404C2.04999 18.6757 3.29464 19.9204 4.82999 19.9204Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.17 19.9204C20.7054 19.9204 21.95 18.6757 21.95 17.1404C21.95 15.605 20.7054 14.3604 19.17 14.3604C17.6347 14.3604 16.39 15.605 16.39 17.1404C16.39 18.6757 17.6347 19.9204 19.17 19.9204Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EnvelopeAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.21 14.7703L15.6701 18.3103C15.5301 18.4503 15.4 18.7103 15.37 18.9003L15.18 20.2503C15.11 20.7403 15.45 21.0803 15.94 21.0103L17.29 20.8203C17.48 20.7903 17.75 20.6603 17.88 20.5203L21.4201 16.9803C22.0301 16.3703 22.3201 15.6603 21.4201 14.7603C20.5301 13.8703 19.82 14.1603 19.21 14.7703Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.7001 15.2803C19.0001 16.3603 19.8401 17.2003 20.9201 17.5003"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SwishaAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M2 8.50488H22"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 16.5049H8"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 16.5049H14.5"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SignAgreementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <path
      d="M9.81006 14.7002L11.3101 16.2002L15.3101 12.2002"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 6H14.5C16.5 6 16.5 5 16.5 4C16.5 2 15.5 2 14.5 2H10.5C9.5 2 8.5 2 8.5 4C8.5 6 9.5 6 10.5 6Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 4.01953C19.83 4.19953 21.5 5.42953 21.5 9.99953V15.9995C21.5 19.9995 20.5 21.9995 15.5 21.9995H9.5C4.5 21.9995 3.5 19.9995 3.5 15.9995V9.99953C3.5 5.43953 5.17 4.19953 8.5 4.01953"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// AddNewAgreement SVGs
export const BackArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const AgreementPreviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <path
      d="M9.66675 9.33366H22.3334V6.66699C22.3334 4.00033 21.3334 2.66699 18.3334 2.66699H13.6667C10.6667 2.66699 9.66675 4.00033 9.66675 6.66699V9.33366Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3334 20V25.3333C21.3334 28 20.0001 29.3333 17.3334 29.3333H14.6667C12.0001 29.3333 10.6667 28 10.6667 25.3333V20H21.3334Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 13.333V19.9997C28 22.6663 26.6667 23.9997 24 23.9997H21.3333V19.9997H10.6667V23.9997H8C5.33333 23.9997 4 22.6663 4 19.9997V13.333C4 10.6663 5.33333 9.33301 8 9.33301H24C26.6667 9.33301 28 10.6663 28 13.333Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6666 20H21.0533H9.33325"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 14.667H13.3333"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// CustomerStats SVGs (reuse AgreementStats icons)
export {
  PurchasingAgreementIcon as PurchasingCustomerIcon,
  SalesAgreementIcon as SalesCustomerIcon,
  BrokerageAgreementIcon as BrokerageCustomerIcon,
  ArrowCollapseIcon as CustomerArrowCollapseIcon,
} from "./Icons";

// InvoiceStats SVGs
export const InvoiceTotalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
    <rect
      x="4"
      y="6"
      width="24"
      height="20"
      rx="4"
      stroke="#5E636B"
      strokeWidth="1.5"
    />
    <path
      d="M8 10h16M8 14h16M8 18h8"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
export const InvoiceOutstandingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
    <rect
      x="4"
      y="8"
      width="24"
      height="16"
      rx="4"
      stroke="#5E636B"
      strokeWidth="1.5"
    />
    <path
      d="M10 16h12"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="10" cy="16" r="2" stroke="#012F7A" strokeWidth="1.5" />
  </svg>
);
export const InvoicePaidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
    <rect
      x="6"
      y="8"
      width="20"
      height="16"
      rx="4"
      stroke="#5E636B"
      strokeWidth="1.5"
    />
    <path
      d="M10 16h8"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14 20h4"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// InvoiceTable SVGs (reuse ArrowCollapseIcon)

// AddInvoice SVGs
export const RemoveLineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M6 6l6 6M6 12l6-6" />
  </svg>
);
export const InvoicePreviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <rect width="32" height="32" rx="8" fill="#F0F7FF" />
    <path
      d="M9.66675 9.33366H22.3334V6.66699C22.3334 4.00033 21.3334 2.66699 18.3334 2.66699H13.6667C10.6667 2.66699 9.66675 4.00033 9.66675 6.66699V9.33366Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3334 20V25.3333C21.3334 28 20.0001 29.3333 17.3334 29.3333H14.6667C12.0001 29.3333 10.6667 28 10.6667 25.3333V20H21.3334Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 13.333V19.9997C28 22.6663 26.6667 23.9997 24 23.9997H21.3333V19.9997H10.6667V23.9997H8C5.33333 23.9997 4 22.6663 4 19.9997V13.333C4 10.6663 5.33333 9.33301 8 9.33301H24C26.6667 9.33301 28 10.6663 28 13.333Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6666 20H21.0533H9.33325"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 14.667H13.3333"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Header SVGs
export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
    />
  </svg>
);
export const UserDropdownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// Sidebar SVGs
export const DashboardSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const CustomersSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M17 20h5v-2a4 4 0 0 0-3-3.87" />
    <path d="M9 20H4v-2a4 4 0 0 1 3-3.87" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
export const VehiclesSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect x="3" y="11" width="18" height="6" rx="2" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
  </svg>
);
export const AgreementsSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M4 10h16" />
  </svg>
);
export const SwishSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12a4 4 0 0 1 8 0" />
  </svg>
);
export const InvoicesSidebarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M4 10h16" />
  </svg>
);

// Dropdown arrow SVG (used in AddNewUser, EditUser, FilterAgreements)
export const DropdownArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// PaymentsTable SVGs
export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M3 6h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 11v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14 11v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// AddPayments SVGs
export const InfoCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="40" height="40" fill="none" viewBox="0 0 20 20" {...props}>
    <circle cx="10" cy="10" r="10" fill="#E0EDFF" />
    <path
      d="M10 6.66699V10.0003"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="13.333" r="0.833" fill="#012F7A" />
  </svg>
);
export const RemoveLineAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M6 6l12 12M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
export const PaymentReceiptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="28" height="28" fill="none" viewBox="0 0 32 32" {...props}>
    <path
      d="M9.66675 9.33366H22.3334V6.66699C22.3334 4.00033 21.3334 2.66699 18.3334 2.66699H13.6667C10.6667 2.66699 9.66675 4.00033 9.66675 6.66699V9.33366Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3334 20V25.3333C21.3334 28 20.0001 29.3333 17.3334 29.3333H14.6667C12.0001 29.3333 10.6667 28 10.6667 25.3333V20H21.3334Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 13.333V19.9997C28 22.6663 26.6667 23.9997 24 23.9997H21.3333V19.9997H10.6667V23.9997H8C5.33333 23.9997 4 22.6663 4 19.9997V13.333C4 10.6663 5.33333 9.33301 8 9.33301H24C26.6667 9.33301 28 10.6663 28 13.333Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6666 20H21.0533H9.33325"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 14.667H13.3333"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// PaymentStats SVGs
export const PaymentTotalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" {...props}>
    <path
      d="M24.72 18.0663C24.16 18.613 23.84 19.3997 23.92 20.2397C24.04 21.6797 25.36 22.733 26.8 22.733H29.3333V24.3197C29.3333 27.0797 27.08 29.333 24.32 29.333H9.01333C6.25333 29.333 4 27.0797 4 24.3197V15.3464C4 12.5864 6.25333 10.333 9.01333 10.333H24.32C27.08 10.333 29.3333 12.5864 29.3333 15.3464V17.2664H26.64C25.8933 17.2664 25.2133 17.5597 24.72 18.0663Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16.5467V10.4535C4 8.86681 4.97333 7.45341 6.45333 6.89341L17.04 2.89341C18.6933 2.26675 20.4667 3.49345 20.4667 5.26679V10.3334"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.7451 18.6265V21.3733C30.7451 22.1066 30.1584 22.7066 29.4117 22.7332H26.7984C25.3584 22.7332 24.0384 21.6799 23.9184 20.2399C23.8384 19.3999 24.1584 18.6132 24.7184 18.0666C25.2117 17.5599 25.8917 17.2666 26.6384 17.2666H29.4117C30.1584 17.2933 30.7451 17.8932 30.7451 18.6265Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 16H19.3333"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const PaymentAverageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" {...props}>
    <path
      d="M30.0681 14.5601V21.4268C30.0681 25.5335 27.7214 27.2935 24.2014 27.2935H12.4814C11.4947 27.2935 10.6014 27.1602 9.82806 26.8669C8.2414 26.2802 7.16139 25.0669 6.77472 23.1202C7.30805 23.2402 7.88138 23.2935 8.48138 23.2935H20.2014C23.7214 23.2935 26.0681 21.5335 26.0681 17.4268V10.5601C26.0681 9.93347 26.0147 9.37352 25.9081 8.85352C28.4414 9.38685 30.0681 11.1735 30.0681 14.5601Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.0666 10.56V17.4267C26.0666 21.5333 23.72 23.2933 20.2 23.2933H8.47994C7.87994 23.2933 7.30661 23.24 6.77327 23.12C6.43994 23.0667 6.11995 22.9734 5.82662 22.8667C3.82662 22.12 2.61328 20.3867 2.61328 17.4267V10.56C2.61328 6.45331 4.95994 4.69336 8.47994 4.69336H20.2C23.1866 4.69336 25.3333 5.96002 25.9066 8.85335C25.9999 9.38669 26.0666 9.93331 26.0666 10.56Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.3312 17.5195C16.2753 17.5195 17.8513 15.9436 17.8513 13.9995C17.8513 12.0555 16.2753 10.4795 14.3312 10.4795C12.3872 10.4795 10.8112 12.0555 10.8112 13.9995C10.8112 15.9436 12.3872 17.5195 14.3312 17.5195Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.7066 11.0664V16.9331"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9622 11.0674V16.9341"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const PaymentStatusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" {...props}>
    <path
      d="M29.3333 9.33366V22.667C29.3333 26.667 27.3333 29.3337 22.6666 29.3337H9.33325C4.66659 29.3337 2.66659 26.667 2.66659 22.667V9.33366C2.66659 5.33366 4.66659 2.66699 9.33325 2.66699H22.6666C27.3333 2.66699 29.3333 5.33366 29.3333 9.33366Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6666 8V10.6667C18.6666 12.1333 19.8666 13.3333 21.3333 13.3333H23.9999"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6666 17.3333H16.6666"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6666 22.6667H21.3333"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ThemeCustomization SVGs
export const ThemeResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-1-4H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2z"
    />
  </svg>
);
export const ThemeCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// RoleTable SVGs
export const RoleDashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const RoleSwishIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M2 8.50586H22"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 16.5059H8"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 16.5059H14.5"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.44 3.50586H17.55C21.11 3.50586 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Profile Page SVGs
export const DeleteAccountIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// VehiclesTable SVGs
export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="10"
    viewBox="0 0 13 10"
    fill="none"
    {...props}
  >
    <path
      d="M1.23792 5H11.9046M11.9046 5L7.90458 1M11.9046 5L7.90458 9"
      stroke="#012F7A"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.86241 10C4.60039 10 4.33937 9.898 4.14336 9.69501L0.280061 5.69511C-0.0979677 5.30212 -0.0929674 4.67913 0.293062 4.29314L4.29337 0.293243C4.6834 -0.0977476 5.31645 -0.0977476 5.70748 0.293243C6.09751 0.684233 6.09751 1.31622 5.70748 1.70721L2.40222 5.01212L5.58147 8.30504C5.9655 8.70303 5.9545 9.33602 5.55747 9.71901C5.36245 9.907 5.11243 10 4.86241 10Z"
      fill="#5E636B"
    />
  </svg>
);

export const ArrowLeftDoubleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    className="rotate-180"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.86241 10C4.60039 10 4.33937 9.898 4.14336 9.69501L0.280061 5.69511C-0.0979677 5.30212 -0.0929674 4.67913 0.293062 4.29314L4.29337 0.293243C4.6834 -0.0977476 5.31645 -0.0977476 5.70748 0.293243C6.09751 0.684233 6.09751 1.31622 5.70748 1.70721L2.40222 5.01212L5.58147 8.30504C5.9655 8.70303 5.9545 9.33602 5.55747 9.71901C5.36245 9.907 5.11243 10 4.86241 10Z"
      fill="#5E636B"
    />
  </svg>
);

// VehiclesStats SVGs
export const VehicleTotalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    {...props}
  >
    <path
      d="M21.3467 3.77344H11.9867C8.66667 3.77344 7.93333 5.42677 7.50667 7.45344L6 14.6668H27.3333L25.8267 7.45344C25.4 5.42677 24.6667 3.77344 21.3467 3.77344Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.9867 26.4265C30.1333 27.9865 28.88 29.3332 27.28 29.3332H24.7733C23.3333 29.3332 23.1333 28.7198 22.88 27.9598L22.6133 27.1598C22.24 26.0665 22 25.3332 20.08 25.3332H13.2533C11.3333 25.3332 11.0533 26.1598 10.72 27.1598L10.4533 27.9598C10.2 28.7198 10 29.3332 8.56001 29.3332H6.05334C4.45334 29.3332 3.2 27.9865 3.34667 26.4265L4.09334 18.3065C4.28 16.3065 4.66667 14.6665 8.16 14.6665H25.1733C28.6667 14.6665 29.0533 16.3065 29.24 18.3065L29.9867 26.4265Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99999 10.6665H4.66666"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.6666 10.6665H27.3333"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.6667 4V6.66667"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6667 6.6665H18.6667"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.66666 20H12.6667"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.6667 20H24.6667"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const VehicleSoldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    {...props}
  >
    <path
      d="M16.3333 29.3332C23.6667 29.3332 29.6667 23.3332 29.6667 15.9998C29.6667 8.6665 23.6667 2.6665 16.3333 2.6665C9 2.6665 3 8.6665 3 15.9998C3 23.3332 9 29.3332 16.3333 29.3332Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6666 15.9999L14.44 19.7732L22 12.2266"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const VehicleAvgDaysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <path
      d="M29.3333 15.9998C29.3333 23.3598 23.36 29.3332 16 29.3332C8.63996 29.3332 2.66663 23.3598 2.66663 15.9998C2.66663 8.63984 8.63996 2.6665 16 2.6665C23.36 2.6665 29.3333 8.63984 29.3333 15.9998Z"
      stroke="#5E636B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.9467 20.2398L16.8134 17.7732C16.0934 17.3465 15.5067 16.3198 15.5067 15.4798V10.0132"
      stroke="#012F7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// UserTable SVGs
export const UserSearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
    />
  </svg>
);
export const PaginationLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.86241 10C4.60039 10 4.33937 9.898 4.14336 9.69501L0.280061 5.69511C-0.0979677 5.30212 -0.0929674 4.67913 0.293062 4.29314L4.29337 0.293243C4.6834 -0.0977476 5.31645 -0.0977476 5.70748 0.293243C6.09751 0.684233 6.09751 1.31622 5.70748 1.70721L2.40222 5.01212L5.58147 8.30504C5.9655 8.70303 5.9545 9.33602 5.55747 9.71901C5.36245 9.907 5.11243 10 4.86241 10Z"
      fill="#5E636B"
    />
  </svg>
);
export const PaginationRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    className="rotate-180"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.86241 10C4.60039 10 4.33937 9.898 4.14336 9.69501L0.280061 5.69511C-0.0979677 5.30212 -0.0929674 4.67913 0.293062 4.29314L4.29337 0.293243C4.6834 -0.0977476 5.31645 -0.0977476 5.70748 0.293243C6.09751 0.684233 6.09751 1.31622 5.70748 1.70721L2.40222 5.01212L5.58147 8.30504C5.9655 8.70303 5.9545 9.33602 5.55747 9.71901C5.36245 9.907 5.11243 10 4.86241 10Z"
      fill="#5E636B"
    />
  </svg>
);

// AddPayments SVGs
export const AddPaymentsBackArrowIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
