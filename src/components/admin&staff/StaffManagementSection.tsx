import React, { useEffect, useRef, useState } from "react";
import StaffTabs from "./StaffTabs";
import StaffCard from "./StaffCard";
import { api } from "../../api/axiosInstance";
import { timeAgo } from "../../utils/TimeHourConvert";
import { io, Socket } from "socket.io-client";

interface BranchUser {
  permissions: any;
  id: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF"; // better strict typing
  isActive: "Active" | "Inactive";
  email: string;
  phone: string;
  branch: string;
  lastActive: string | "";
}

interface DeliveryStaff {
  id: string;
  name: string;
  phone: string;
  status: string;
  assigned: number;
  completed: number;
  lastSeen?: string;
}

const rolesPermissionsData = [
  {
    role: "Admin",
    description: "Full system access",
    badgeColor: "purple" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Pickup and Delivery",
      "Customers",
      "Services and Pricing",
      "Payments",
      "Reports",
      "Admin & Staff ",
      "Account and Sessions",
      "Support",
      "Settings",
    ],
  },
  {
    role: "Branch Manager",
    description: "Branch-level management",
    badgeColor: "blue" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Pickup and Delivery",
      "Customers",
      "Services and Pricing",
      "Payments",
      "Reports",
      "Admin & Staff ",
      "Account and Sessions",
      "Support",
      "Settings",
    ],
  },
  {
    role: "Staff",
    description: "Limited access",
    badgeColor: "green" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Pickup and Delivery",
      "Customers",
      "Services and Pricing",
      "Payments",
      "Reports",
      "Admin & Staff ",
      "Account and Sessions",
      "Support",
      "Settings",
    ],
  },
];


const StaffManagementSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "admin" | "delivery" | "roles"
  >("admin");
  const [adminStaffData, setAdminStaffData] = useState<BranchUser[]>([]);
  const [deliveryStaffData, setDeliveryStaffData] = useState<DeliveryStaff[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const fetchUsers = async () => {
    const res = await api.get("/branch/users/details");
    setAdminStaffData(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socketRef.current.on("branch:update", fetchUsers);

    return () => {
      socketRef.current?.off("branch:update", fetchUsers);
      socketRef.current?.disconnect();
    };
  }, []);

  const fetchDeliveryStaff = async () => {
  try {
    const res = await api.get("/branch/delivery-staff");
    setDeliveryStaffData(res.data);
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
  
    fetchDeliveryStaff();
  
  }, []);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socketRef.current.on("delivery:update", fetchDeliveryStaff);

    return () => {
      socketRef.current?.off("delivery:update", fetchDeliveryStaff);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <StaffTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* CONTENT */}
      <div className="flex flex-col gap-6 mt-6">
        {/* -------- ADMIN & STAFF -------- */}
        {activeTab === "admin" &&
          adminStaffData.map((staff, idx) => (
            <StaffCard
              key={idx}
              type="admin"
              id={staff.id}
              name={staff.name}
              role={staff.role}
              email={staff.email}
              permissions={staff.permissions}
              phone={staff.phone}
              branch={staff.branch}
              lastActive={staff.isActive ? "Active Now" : `Last Active : ${timeAgo(staff.lastActive)} ago`}
              status={staff.isActive ? "Active" : "Inactive"}
            />
          ))}

        {/* -------- DELIVERY STAFF -------- */}
        {activeTab === "delivery" &&

          <div className="grid grid-cols-2 gap-6">
            {deliveryStaffData.map((staff, idx) => (
              <StaffCard
                key={idx}
                type="delivery"
                name={staff.name}
                phone={staff.phone}
                status={staff.status}
                assigned={staff.assigned}
                completed={staff.completed}
              />
            ))}
          </div>

        }

        
      </div>
    </div>
  );
};

export default StaffManagementSection;
