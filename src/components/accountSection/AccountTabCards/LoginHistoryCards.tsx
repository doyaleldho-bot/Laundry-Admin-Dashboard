
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/axiosInstance";
import { io ,Socket} from "socket.io-client";


/* ---------- Types ---------- */
export type LoginHistoryItem = {
  id: string;
  device: string;
  location: string;
  ip: string;
  time: string;
  status: "success" | "failed" | "logout" | "active";
  city:string;
  country:string;
};


const formatTimeIST = (utcDate:any) => {
  return new Date(utcDate).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


/* ---------- Component ---------- */
const LoginHistoryTab: React.FC = () => {
  const [data, setData] = useState<LoginHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
const socketRef = useRef<Socket | null>(null);
  /* ---------------- FETCH LOGIN HISTORY ---------------- */
 const fetchHistory = async () => {
  try {
    const res = await api.get("/sessions/branch-logins", { withCredentials: true });
    const mapped: LoginHistoryItem[] = res.data.sessions.map((item: any) => ({
      id: item.id,
      device: item.device || "Unknown",
      location: item.User?.role || "Unknown",   
      ip: item.ip || "N/A",
      time: formatTimeIST(item.lastActive) || "N/A",
      // dynamic status
      status: item.isActive ? "active" : "logout",
      city: item.city || "Unknown",
      country: item.country || "Unknown",
    }));

    setData(mapped);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  /* ---------------- HEARTBEAT ---------------- */
  useEffect(() => {
fetchHistory();
  }, []);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);
    // Listen for dashboard updates
    const handleUpdate = () => fetchHistory();
    socketRef.current.on("session:update", handleUpdate);

    // Cleanup on unmount
    return () => {
      socketRef.current?.off("session:update", handleUpdate);
      socketRef.current?.disconnect();
    };
  }, []);

  /* ---------------- UI ---------------- */

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-6">
          <p>Loading login history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-6">
        {/* Title */}
        <p className="text-[18px] font-bold leading-[28px] mb-4">
          Recent Login Activity
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-bold text-[14px] leading-[20px] text-[#4A5565] bg-gray-50">
                <th className="text-left px-4 py-3">Device</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">IP Address</th>
                <th className="text-left px-4 py-3">Login Time</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">City</th>
                <th className="text-left px-4 py-3">Country</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No login activity found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t text-[14px] leading-[20px] text-[#101828]"
                  >
                    <td className="px-4 py-4">{item.device}</td>
                    <td className="px-4 py-4">{item.location}</td>
                    <td className="px-4 py-4 font-mono text-xs">
                      {item.ip}
                    </td>
                    <td className="px-4 py-4">{item.time}</td>
                    <td className="px-4 py-4">
                      {item.status === "success" && (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Success
                        </span>
                      )}

                      {item.status === "failed" && (
                        <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
                          Failed
                        </span>
                      )}

                      {item.status === "logout" && (
                        <span className="text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded-full">
                          Logged Out
                        </span>
                      )}

                      {item.status === "active" && (
                        <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                          Active Now
                        </span>
                      )}
                 
                    </td>
                    <td>
                           {item.city && (
                        <div className="text-sm text-gray-600 mt-1">
                          {item.city}
                        </div>
                      )}
                    </td>
                    <td>
                           {item.city && (
                        <div className="text-sm text-gray-600 mt-1">
                         {item.country}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoginHistoryTab;