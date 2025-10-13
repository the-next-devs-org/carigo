import { useState, useEffect } from "react";
import { DeleteAccountIcon } from "../../components/utils/Icons";
import DeletePopup from "../../components/models/DeletePopup";
import { useUserProfile } from "../../utils/useUserProfile";
import { getProfileInitials, getRandomColor } from "../../utils/profileUtils";
import { Loader2 } from "lucide-react";
import { makeDeleteRequest, makePutRequest } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { user, loading, error, refetch } = useUserProfile();
  const navigate = useNavigate();

  const profileInitials = user ? getProfileInitials(user.first_name, user.last_name) : "";
  const profileColor = user ? getRandomColor(user.user_id) : "#012F7A";

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        first: user.first_name || "",
        last: user.last_name || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
      }));
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await makeDeleteRequest(`users/deleteUser/${user.user_id}`);
      if (response.data.success) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Failed to delete account");
      }
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const payload: any = {
        first_name: formData.first,
        last_name: formData.last,
        email: formData.email,
      };
      if (formData.oldPassword && formData.newPassword) {
        payload.oldPassword = formData.oldPassword;
        payload.newPassword = formData.newPassword;
      }

      const response = await makePutRequest(`users/updateUser/${user.user_id}`, payload);
      if (response.data.status) {
        // console.log("Saved Data:", payload);
        toast.success(`Profile updated successfully!`);
        refetch();
        setFormData((prev) => ({ ...prev, oldPassword: "", newPassword: "" }));
      } else {
        toast.error(response.data.message || "Something went wrong!");
        // console.error("Update failed:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500">{error}</div>
    </div>
  );

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

      <div className="w-full lg:h-28 h-24 relative mb-16 lg:px-6 px-4">
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
            <div className="text-gray-500 text-sm">{user?.email || "Loading..."}</div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto flex flex-col lg:gap-3 gap-0 lg:px-6 px-4 lg:mt-24 mt-20">
        <div className="bg-white rounded-2xl p-6 mb-6 dashboard-cards font-plus-jakarta">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {["first", "last", "email", "oldPassword", "newPassword"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field === "first" ? "First Name" :
                   field === "last" ? "Last Name" :
                   field === "email" ? "Email" :
                   field === "oldPassword" ? "Old Password" :
                   "New Password"}
                </label>
                <input
                  placeholder={`Enter ${
                    field === "oldPassword" ? "Current Password" :
                    field === "newPassword" ? "New Password" :
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type={field.includes("Password") ? "password" : field === "email" ? "email" : "text"}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  autoComplete={field === "newPassword" ? "new-password" : field === "oldPassword" ? "current-password" : undefined}
                />
              </div>
            ))}
          </form>

          <div className="flex flex-col md:flex-row gap-3 justify-end mb-4 w-full">
            <button
              type="button"
              className="w-fit bg-[#012F7A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={handleSave}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg leading-none mb-1">+</span> Save Changes
              </span>
            </button>
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl dashboard-cards p-6 border border-gray-200">
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
          {deleteError && <div className="mt-4 text-red-500 text-sm">{deleteError}</div>}
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
