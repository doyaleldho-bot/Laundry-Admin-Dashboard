import React, { useEffect, useState, useRef, useCallback,} from "react";
import {  PieChart, Pie, Cell,  ResponsiveContainer,} from "recharts";
import { io, Socket } from "socket.io-client";
import { api } from "../../api/axiosInstance";

/*  TYPES  */
export interface OrderStatusData {
  name: string;
  value: number;
  color: string;
}

const OrderStatusChart: React.FC = () => {
  const [data, setData] = useState<OrderStatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);


  /*  FETCH FUNCTION */
  const fetchOrderStatus = useCallback(async () => {
    try {
      const res = await api.get('dashboard/order-status',
        { withCredentials: true }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /*INITIAL LOAD */

  useEffect(() => {
    fetchOrderStatus();
  }, [fetchOrderStatus]);

  /*REAL-TIME SOCKET  */

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socketRef.current.on(
      "dashboard:update",
      fetchOrderStatus
    );

    return () => {
      socketRef.current?.off(
        "dashboard:update",
        fetchOrderStatus
      );
      socketRef.current?.disconnect();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full max-w-[498px]">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-[18px] font-semibold text-[#1F2937]">
         Full Order Status
        </h2>
        <p className="text-sm text-gray-500">
          Current order distribution
        </p>
      </div>

      <div className="lg:flex-row items-center justify-between gap-6">

        {/* DONUT CHART */}
        <div className="w-full max-w-[320px] h-[220px] mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="white"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="w-full lg:w-[450px] space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <span className="text-sm text-gray-600">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderStatusChart;