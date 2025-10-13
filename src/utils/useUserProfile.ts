import { useState, useEffect } from "react";
import { makeGetRequest } from "../api/Api";

interface Role {
  role_id: number;
  name: string;
  description: string;
}

interface Permission {
  permission_id: string;
  resource_id: number;
  can_read: number;
  can_create: number;
  can_update: number;
  can_delete: number;
  resource: null | any;
}

interface UserProfile {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  user_type?: string;
  is_active?: boolean;
  type?: Role;
  profile_data?: string;
  permissionsCount?: number;
  permissions?: Permission[];
}

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
   
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await makeGetRequest(`users/getUserById/${userId}`);

      //    console.log('+==============================')
      // console.log(response)
      // console.log("+==============================")


      if (response.data.user_id) {
        setUser(response.data);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch user profile"
        );
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { user, loading, error, refetch: fetchUserProfile };
};
