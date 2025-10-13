import DashboardStats from "./components/dashboardStats/DashboardStats";
import RecentUsers from "./components/recentUsers/RecentUsers";
import RecentVehicles from "./components/recentVehicles/RecentVehicles";
import RecentAgreements from "./components/recentAgreements/RecentAgreements";
import RecentReceipts from "./components/recentReceipts/RecentReceipts";
import { useUserProfile } from "../utils/useUserProfile";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading, error } = useUserProfile();

  const renderUserName = () => {
    if (loading) {
      return (
        <div className="inline-flex items-center gap-2">
          <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
          <span>Loading...</span>
        </div>
      );
    }
    if (error || !user) {
      return "User";
    }
    return `${user.first_name} ${user.last_name}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-[28px] font-plus-jakarta font-bold text-[#000814] mb-2">
            Welcome, {renderUserName()} 👋
          </h1>
          <p className="text-[#5E636B] text-sm font-normal font-plus-jakarta">
            {user?.email || "Welcome to your dashboard"}
          </p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RecentUsers />

          <RecentVehicles />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentAgreements />

          <RecentReceipts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
