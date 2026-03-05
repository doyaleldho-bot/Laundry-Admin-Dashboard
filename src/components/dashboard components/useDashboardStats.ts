// useDashboardStats.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../../api/axiosInstance";
import { io } from "socket.io-client";

export const useDashboardStats = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : `${new Date().getMonth() + 1}`
  );

  const [status, setStatus] = useState({
    totalRevenue: 0,
    totalCustomers: 0,
    totalDelivered: 0,
  });

  const socketRef = useRef<any>(null);

  // Fetch Function
  const fetchMonthlyStats = useCallback(async () => {
    try {
      const res = await api.get(
        `/dashboard/monthly-stats?month=${selectedMonth}`
      );

      if (res.data) {
        setStatus({
          totalRevenue: res.data.totalRevenue,
          totalCustomers: res.data.totalCustomers,
          totalDelivered: res.data.totalDelivered,
        });
      }
    } catch (err) {
      console.error("Monthly stats error:", err);
    }
  }, [selectedMonth]);

  //  Initial Load
  useEffect(() => {
    fetchMonthlyStats();
  }, [fetchMonthlyStats]);

  //  Real-time Socket
  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    socketRef.current.on("dashboard:update", fetchMonthlyStats);

    return () => {
      socketRef.current?.off("dashboard:update", fetchMonthlyStats);
      socketRef.current?.disconnect();
    };
  }, [fetchMonthlyStats]);

  return { status, selectedMonth, setSelectedMonth };
};