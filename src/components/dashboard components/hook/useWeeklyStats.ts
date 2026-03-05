import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../api/axiosInstance";
import { io, Socket } from "socket.io-client";

export interface RevenueData {
  day: string;
  revenue: number;
  orders: number;
}

export const useWeeklyStats = () => {
  const [weeklyData, setWeeklyData] = useState<RevenueData[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const fetchWeeklyStats = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/weekly-stats");

      const formatted: RevenueData[] = res.data.map((item: any) => {
        const date = new Date(item.date);

        return {
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          revenue: Number(item.revenue || 0),
          orders: Number(item.orders || 0),
        };
      });

      setWeeklyData(formatted);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchWeeklyStats();
  }, [fetchWeeklyStats]);

  //  Real-time socket
  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    socketRef.current.on("dashboard:update", fetchWeeklyStats);

    return () => {
      socketRef.current?.off("dashboard:update", fetchWeeklyStats);
      socketRef.current?.disconnect();
    };
  }, [fetchWeeklyStats]);

  return weeklyData;
};