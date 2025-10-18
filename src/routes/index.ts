import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Vehicles from "../pages/vehicles/Vehicles";
import VehicleSearch from "../pages/vehicleSearch/VehicleSearch";
import Agreements from "../pages/agreements/Agreements";
import AgreementSign from "../pages/agreementSign/AgreementSign";
import Payments from "../pages/payments/Payments";
import Invoices from "../pages/invoices/Invoices";
import UserManagement from "../pages/userManagement/UserManagement";
import RoleManagement from "../pages/roleManagement/RoleManagement";
import Profile from "../pages/profile/Profile";
import VehicleDetails from "../pages/vehicleDetails/VehicleDetails";
import AddNewSalesAgreement from "../pages/addNewSalesAgreement/AddNewSalesAgreement";
import AddNewPurchaseAgreement from "../pages/addNewPurchaseAgreement/AddNewPurchaseAgreement";
import AddNewAgencyAgreement from "../pages/addNewAgencyAgreement/AddNewAgencyAgreement";
import AddPayments from "../pages/addPayments/AddPayments";
import AddInvoice from "../pages/addInvoice/AddInvoice";
import AddAdvertise from "../components/Vehicles/addAdvertise/AddAdvertise";
import LandingPage from "../pages/landingPage/LandingPage";
import SuperAdminDashboard from "../superAdmin/SuperAdminDashboard";
import SuperAdminVehicle from "../superAdmin/SuperAdminCompany";
import VehicleDetails2 from "../pages/vehicleDetails/VehicleDetails2";
import AddReceipt from "../pages/addInvoice/AddReceipt";
import RentalCars from "../pages/rentalCars/RentalCars";
import ReturnedCars from "../pages/returnedCars/ReturnedCars";
import ManageBookings from "../pages/bookings/ManageBookings";
import ShowCars from "../pages/showCars/ShowCars";
import forfragningar from "../pages/forfragningar/forfragningar";
import Bokningar from "../pages/bokningar/Bokningar";
import Cars from "../pages/cars/cars";
import Services from "../pages/services/Services";
import AboutUs from "../pages/aboutUs/AboutUs";
import Support from "../pages/support/Support";
import CarDetails from "../pages/CarDetails/CarDetails";

const role = localStorage.getItem("role");

export const publicRoutes = [
  { path: "/", component: LandingPage },
  { path: "/cars", component: Cars },
  { path: "/services", component: Services },
  { path: "/about", component: AboutUs },
  { path: "/support", component: Support },
  { path: "/manage-my-booking-info", component: ManageBookings },
  { path: "/show-cars", component: ShowCars },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/agreement-sign/:agreementID", component: AgreementSign }, 
  { path: "/car/:id", component: CarDetails },
  { path: "*", component: Login },
];

export const privateRoutes = [
  { path: "*", component: role === "Admin" ? Dashboard : SuperAdminDashboard }, 
  ...(role === "Admin"
    ? [{ path: "/dashboard", component: Dashboard }]
    : [{ path: "/admin-dashboard", component: SuperAdminDashboard }]), 
  { path: "/kundregister", component: Customers },
  ...(role === "Admin"
    ? [{ path: "/vehicles", component: Vehicles }]
    : [{ path: "/vehicle-company", component: SuperAdminVehicle }]),
  { path: "/vehicles-search", component: VehicleSearch },
  { path: "/rental-cars", component: RentalCars },
  { path: "/returned-cars", component: ReturnedCars },
  { path: "/agreements", component: Agreements },
  { path: "/sign-agreement/:agreementID", component: AgreementSign },
  { path: "/service-dokument", component: Payments },
  { path: "/invoices", component: Invoices },
  { path: "/users-management", component: UserManagement },
  { path: "/roles-management", component: RoleManagement },
  { path: "/profile", component: Profile },
  { path: "/vehicle-details/:id", component: VehicleDetails },
  { path: "/vehicle-details2/:registrationNumber", component: VehicleDetails2 },
  { path: "/add-new-sales-agreement", component: AddNewSalesAgreement },
  { path: "/add-new-purchase-agreement", component: AddNewPurchaseAgreement },
  { path: "/add-new-agency-agreement", component: AddNewAgencyAgreement },
  { path: "/add-new-payment", component: AddPayments },
  { path: "/add-new-invoice", component: AddInvoice },
  { path: "/add-new-receipt", component: AddReceipt },
  { path: "/add-new-advertise/:registrationNumber", component: AddAdvertise },
  { path: "/forfragningar", component: forfragningar },
  { path: "/avtal-betalning", component: Agreements },
  { path: "/bokningar", component: Bokningar },
];
