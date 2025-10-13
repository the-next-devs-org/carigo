import { useState, useEffect } from "react";
import {
  getRecentPayments,
  getRecentUsers,
} from "../components/Dashboard/recentUsers/userApi";

interface Payment {
  id: number;
  customer_name: string;
  total_amount: number;
  payment_category: string;
  createdAt: string;
}

export const useRecentPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentPayments = async () => {
    try {
      setLoading(true);
      const response = await getRecentPayments(); // Assuming this function returns payment data now

      if (response.success) {
        setPayments(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch recent payments");
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while fetching recent payments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPayments();
  }, []);

  return { payments, loading, error, refetch: fetchRecentPayments };
};

interface RecentUser {
  id: number;
  first: string;
  last: string;
  email: string;
  role: string;
  active: boolean;
  last_Login: string;
}

export const useRecentUsers = () => {
  const [users, setUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentUsers = async () => {
    try {
      setLoading(true);
      const response = await getRecentUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch recent users");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching recent users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentUsers();
  }, []);

  return { users, loading, error, refetch: fetchRecentUsers };
};
