import React, { useEffect, useRef, useState } from "react";
import activeIcon from "../../assets/icons/activeoffericon.svg";
import UserIcon from "../../assets/icons/UsersIcon.svg";
import { api } from "../../api/axiosInstance";
import { io, Socket } from "socket.io-client";

const AdminStaffStatsCard:React.FC = () => {
  const [counts, setCounts] = useState<any>(null);
  const socketRef = useRef<Socket | null>(null);
  
useEffect(() => {
  const fetchCounts = async () => {
    const res = await api.get("/branch/users/count");
    setCounts(res.data);
  };

  fetchCounts(); // Initial load

  socketRef.current = io("http://localhost:5001");

  socketRef.current.on("branch:update", () => {
    fetchCounts(); // Re-fetch when new user created
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, []);

const stats = [
  {
    title: "Total Admins",
    value: counts?.ADMIN ?? 0,
    color: "#22C55E",
    icon: activeIcon,
  },
  {
    title: "Branch Managers",
    value: counts?.MANAGER ?? 0,
    color: "#3B82F6",
    icon: UserIcon,
  },
  {
    title: "Staff Members",
    value: counts?.STAFF ?? 0,
    color: "#A855F7",
    icon: UserIcon,
  },
  {
    title: "Delivery Staff",
    value: counts?.DELIVERY ?? 0,
    color: "#F97316",
    icon: UserIcon,
  },
];

  return (
    <div className="flex gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white flex items-center justify-between rounded-[14px]"
          style={{
            width: "409px",
            height: "106px",
            paddingTop: "23.98px",
            paddingBottom: "23.98px",
            paddingLeft: "23.98px",
            paddingRight: "23.98px",
            borderTopWidth: "1.25px",
            borderRightWidth: "1.25px",
            borderBottomWidth: "1.25px",
            borderLeftWidth: "3.75px",
            borderStyle: "solid",
            borderColor: "#E5E7EB",
            borderLeftColor: item.color,
          }}
        >
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-[20px] font-semibold text-gray-900 mt-1">
              {item.value}
            </h2>
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <img src={item.icon} alt={item.title} className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStaffStatsCard;
