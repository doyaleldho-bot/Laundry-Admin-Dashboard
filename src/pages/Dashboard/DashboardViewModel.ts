import { useEffect, useState } from "react";
import { LaundryService } from "../../services/api/laundry.service";
import type { DashboardStats } from "./dashboard.types";
import { ENV } from "../../utils/env";


export const useDashboardViewModel = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 const fetchDashboard = async () => {
  try {
    setLoading(true);
    const response = await LaundryService.getDashboardStats();
    setData(response);
  } catch (err: any) {
    setError(
      ENV.API_MODE === "mock"
        ? null
        : err.message || "Failed to load dashboard"
    );
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchDashboard();
  }, []);

  return { data, loading, error };
};
