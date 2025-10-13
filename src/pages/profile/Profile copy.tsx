import EditProfile from "../../components/Profile/editProfile/EditProfile";
import { useState } from "react";
import { DeleteAccountIcon } from "../../components/utils/Icons";
import DeletePopup from "../../components/models/DeletePopup";
import { useUserProfile } from "../../utils/useUserProfile";
import { getProfileInitials, getRandomColor } from "../../utils/profileUtils";
import { Loader2 } from "lucide-react";
import { makeDeleteRequest } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import type { SectionKey } from "../../components/Profile/editProfile/EditProfile";

const Profile = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { user, loading, error, refetch } = useUserProfile();
  const navigate = useNavigate();

  const profileInitials = user ? getProfileInitials(user.first_name, user.last_name) : "";
  const profileColor = user ? getRandomColor(user.user_id) : "#012F7A";

  const handleUpdateSuccess = () => {
    refetch();
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await makeDeleteRequest(
        `user/deleteUser/${user.user_id}`
      );

      if (response.data.success) {
        // Clear local storage and redirect to login
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Failed to delete account");
      }
    } catch (err: any) {
      console.error("Error deleting account:", err);
      setDeleteError(
        err.message || "Failed to delete account. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const sections: SectionKey[] = [
    // "company_information",
    // "address_details",
    "contact_information",
    // "payment_settings",
    // "invoice_settings",
    // "contract_settings",
    // "other_settings",
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-10 font-plus-jakarta">
      {showDeletePopup && (
        <DeletePopup
          entityName="Account"
          onCancel={() => setShowDeletePopup(false)}
          onDelete={handleDeleteAccount}
          isDeleting={isDeleting}
        />
      )}
      <div
        className="w-full lg:h-28 h-24 relative mb-16 lg:px-6 px-4"
        // style={{ backgroundColor: profileBg }}
      >
        <div className="absolute lg:top-[2rem] top-[1.5rem] flex gap-4 items-center">
          {user ? (
            <div
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold"
              style={{ backgroundColor: profileColor || "#012F7A" }}
            >
              {profileInitials}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-300 animate-pulse" />
          )}
          <div className="mt-6">
            <div className="mt-3 text-xl font-bold text-gray-900">
              {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
            </div>
            <div className="text-gray-500 text-sm">
              {user?.email || "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto flex flex-col lg:gap-3 gap-0 lg:px-6 px-4 lg:mt-24 mt-20">
        {sections.map((section) => (
          <EditProfile
            key={section}
            onUpdateSuccess={handleUpdateSuccess}
            section={section}
          />
        ))}
        <div className="bg-white rounded-2xl dashboard-cards p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="font-semibold text-gray-900 text-base">
              Do you want to Delete your Account Permanently?
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer justify-center"
              onClick={() => setShowDeletePopup(true)}
            >
              <div className="flex items-center gap-2">
                <DeleteAccountIcon className="w-5 h-5" />
                Delete Account
              </div>
            </button>
          </div>
          {deleteError && (
            <div className="mt-4 text-red-500 text-sm">{deleteError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
