import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../assets/dashboard.svg";
import orders from "../assets/orders.svg";
import picup from "../assets/pickup.svg";
import customers from "../assets/customers.svg";
import services from "../assets/sservice.svg";
import payments from "../assets/payment.svg";
import report from "../assets/report.svg";
import admin from "../assets/admin.svg";
import account from "../assets/account.svg";
import support from "../assets/support.svg";
import settings from "../assets/settings.svg";
import { FiMenu, FiX } from "react-icons/fi";
import { api } from "../api/axiosInstance";
import { io } from "socket.io-client";

type MenuItem = {
  label: string;
  path: string;
  icon: string;
  permission: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: dashboard, path: "/", permission: "DASHBOARD" },
  { label: "Orders", icon: orders, path: "/orders", permission: "ORDERS" },
  { label: "Pickup & Delivery", icon: picup, path: "/pickup", permission: "PICKUP" },
  { label: "Customers", icon: customers, path: "/customers", permission: "CUSTOMERS" },
  // { label: "Services & Pricing", icon: services, path: "/services-pricing", permission: "SERVICES" },
  { label: "Payments", icon: payments, path: "/payments", permission: "PAYMENTS" },
  { label: "Report", icon: report, path: "/reports", permission: "REPORT" },
  { label: "Admin & Staff", icon: admin, path: "/admin-staff", permission: "ADMIN_STAFF" },
  { label: "Account & Session", icon: account, path: "/account-session", permission: "ACCOUNT_SESSION" },
  { label: "Support", icon: support, path: "/support", permission: "SUPPORT" },
  { label: "Settings", icon: settings, path: "/settings", permission: "SETTINGS" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
const socketRef = useRef<any>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 100);
  };



/* FETCH FUNCTION */
const fetchPermissions = useCallback(async () => {
  try {
    const res = await api.get("/permissions");
    setUserPermissions(res.data.permissions);
  } catch (err) {
    console.error("Error fetching permissions:", err);
  }
}, []);

/* INITIAL LOAD */
useEffect(() => {
  fetchPermissions();
}, [fetchPermissions]);

/* SOCKET REAL-TIME */
useEffect(() => {
  socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

  socketRef.current.on("branch:update", fetchPermissions);

  return () => {
    socketRef.current?.off("branch:update", fetchPermissions);
    socketRef.current?.disconnect();
  };
}, [fetchPermissions]);


const filteredMenu =
  userPermissions.length > 0
    ? menuItems.filter((item) =>
        userPermissions.includes(item.permission)
      )
    : [];

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#083b9a] text-white p-2 rounded-md"
      >
        <FiMenu size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-[340px] min-h-screen
          bg-[#083b9a] text-white
          flex flex-col justify-between
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-start justify-between px-6 py-3 border-b border-white/10 leading-[16px] tracking-[0.08em]">
            <div>
              <h1 className="text-[18px] font-semibold">Admin Panel</h1>
              <p className="text-[16px] font-normal mt-1">
                Operations Control
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-white"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* MENU */}
          <nav className="mt-10 flex flex-col gap-5 pl-[42px] flex-1 overflow-y-auto pr-3 no-scrollbar">
            {filteredMenu.map(({ label, icon, path }) => (
              <NavLink key={label} to={path} onClick={() => setOpen(false)}>
                {({ isActive }) => (
                  <div
                    onMouseEnter={() => handleMouseEnter(label)}
                    onMouseLeave={handleMouseLeave}
                    className={`
                      flex items-center gap-1 px-5 py-5
                      rounded-md text-[14px]
                      w-[294px]
                      transition-all duration-200
                      ${isActive || hovered === label
                        ? "w-[265px] bg-white text-[#083b9a] font-medium"
                        : "text-white/90 hover:bg-white/30"
                      }
                    `}
                  >
                    <img
                      src={icon}
                      alt={label}
                      className={`
                        w-[20px] h-[20px] transition-all duration-200
                        ${isActive || hovered === label ? "filter-blue" : ""}
                      `}
                    />
                    <span>{label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* HELP CARD */}
        <div className="p-4">
          <div className="bg-[#0a4cc4] rounded-lg p-4">
            <p className="text-sm font-medium">Need Help?</p>
            <p className="text-xs text-white/80 mt-1">
              Contact Support Team
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
