import React, { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Laptop, LogOut } from "lucide-react";
import { api } from "../../../api/axiosInstance";
import { io, Socket } from "socket.io-client";

export type Session = {
  id: string;
  device: "windows" | "iphone" | "mac";
  title: string;
  browser: string;
  os: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
};

const getDeviceIcon = (device: Session["device"]) => {
  switch (device) {
    case "iphone":
      return <Smartphone className="w-4 h-4 text-blue-600" />;
    case "mac":
      return <Laptop className="w-4 h-4 text-blue-600" />;
    default:
      return <Monitor className="w-4 h-4 text-blue-600" />;
  }
};

const ActiveSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
const socketRef = useRef<Socket | null>(null);

    const fetchSessions = async () => {
      try {
        const res = await api.get("/sessions", { withCredentials: true });
        const currentJti  = res.data.currentJti;

        const mapped: Session[] = res.data.sessions.map((s: any) => ({
          id: s.id,
          device: s.device.toLowerCase() as Session["device"],
          title: `${s.browser} on ${s.os}`,
          browser: s.browser,
          os: s.os,
          ip: s.ip,
          lastActive: new Date(s.lastActive).toLocaleString(),
          isCurrent: s.jti === currentJti,
        }));

        setSessions(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    const endSession = async (id: string) => {
      try {
        await api.post(`/sessions/end/${id}`, {}, { withCredentials: true });
      } catch (err) {
        console.error(err);
      }
    };

    const endAllSessions = async () => {
      try {
        await api.post("/sessions/end-all", {}, { withCredentials: true });
      } catch (err) {
        console.error(err);
      } 
    };  

  useEffect(() => {
fetchSessions();
  }, []);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);
    // Listen for dashboard updates
    const handleUpdate = () => fetchSessions();
    socketRef.current.on("session:update", handleUpdate);

    // Cleanup on unmount
    return () => {
      socketRef.current?.off("session:update", handleUpdate);
      socketRef.current?.disconnect();
    };
  }, []);



  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">You have {sessions.length} active sessions</p>
        <button
          onClick={endAllSessions}
          className="flex items-center gap-1 text-[14px] font-medium text-[#E7000B] border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" /> End All Sessions 
        </button>
      </div>

      {/* Session List */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`rounded-xl border bg-[#FFFFFF] p-4 flex items-start justify-between ${
              session.isCurrent ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                {getDeviceIcon(session.device)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{session.title}</p>
                  {session.isCurrent && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Browser: {session.browser}</p>
                <p className="text-xs text-gray-500">OS: {session.os}</p>
                <p className="text-xs text-gray-500">{session.lastActive}</p>
              </div>
            </div>

            {!session.isCurrent && (
              <button
                onClick={() => endSession(session.id)}
                className="text-[14px] font-medium text-[#E7000B] border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-50 transition"
              >
                End Session
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSessions;