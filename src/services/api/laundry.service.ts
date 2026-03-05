import axiosInstance from "./axiosInstance";
import { ENV } from "../../utils/env";
import type { DashboardStats } from "../../pages/Dashboard/dashboard.types";

const mockDashboardData: DashboardStats = {
  totalOrders: 120,
  pendingOrders: 25,
  completedOrders: 95,
  revenue: 54000,
};

export const LaundryService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (ENV.API_MODE === "mock") {
      // simulate network delay
      await new Promise((res) => setTimeout(res, 600));
      return mockDashboardData;
    }

    const res = await axiosInstance.get("/dashboard");
    return res.data;
  },
};
