import React, { useEffect, useRef, useState } from "react";
import StaffTabs from "./StaffTabs";
import StaffCard from "./StaffCard";
import { api } from "../../api/axiosInstance";
import { timeAgo } from "../../utils/TimeHourConvert";
import { io, Socket } from "socket.io-client";

 interface BranchUser {
  id: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF"; // better strict typing
  isActive: "Active" | "Inactive";
  email: string;
  phone: string;
  branch: string;
  lastActive: string | "";
}

/* ---------------- DELIVERY STAFF DATA ---------------- */
const deliveryStaffData = [
  {
    name: "Mike Driver",
    status: "Available",
    phone: "+1 234 567 8910",
    vehicle: "Bike - KA01AB1234",
    assigned: 8,
    completed: 145,
  },
  {
    name: "John Driver",
    status: "On Duty",
    phone: "+1 234 567 8911",
    vehicle: "Van - KA01CD5678",
    assigned: 12,
    completed: 289,
  },
  {
    name: "Sarah Driver",
    status: "Available",
    phone: "+1 234 567 8912",
    vehicle: "Bike - KA01EF9012",
    assigned: 6,
    completed: 178,
  },
  {
    name: "Tom Driver",
    status: "Off Duty",
    phone: "+1 234 567 8913",
    vehicle: "Van - KA01GH3456",
    assigned: 0,
    completed: 234,
  },
];

const rolesPermissionsData = [
  {
    role: "Admin",
    description: "Full system access",
    badgeColor: "purple" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Customers",
      "Payments",
      "Reports",
      "Settings",
      "User Management",
    ],
  },
  {
    role: "Branch Manager",
    description: "Branch-level management",
    badgeColor: "blue" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Customers",
      "Pickup/Delivery",
      "Reports",
    ],
  },
  {
    role: "Staff",
    description: "Limited access",
    badgeColor: "green" as const,
    permissions: ["Orders", "Customers", "Pickup/Delivery"],
  },
];


const StaffManagementSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "admin" | "delivery" | "roles"
  >("admin");
  const [adminStaffData, setAdminStaffData] = useState<BranchUser[]>([]);
    const socketRef = useRef<Socket | null>(null);

 const fetchUsers = async () => {
  const res = await api.get("/branch/users/details");
  setAdminStaffData(res.data);
};

useEffect(() => {
  fetchUsers();
}, []);

useEffect(() => {
  socketRef.current = io("http://localhost:5001");

  socketRef.current.on("branch:update", fetchUsers);

  return () => {
    socketRef.current?.off("branch:update", fetchUsers);
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
              phone={staff.phone}
              branch={staff.branch}
              lastActive={staff.isActive   ? "Active Now": `Last Active : ${timeAgo(staff.lastActive)} ago`}
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
      status={staff.status}
      phone={staff.phone}
      vehicle={staff.vehicle}
      assigned={staff.assigned}
      completed={staff.completed}
    />
  ))}
</div>

}

        {/* -------- ROLES & PERMISSIONS -------- */}
        {activeTab === "roles" && (
          <StaffCard
    type="roles"
    name=""
    permissionsData={rolesPermissionsData}
  />
        )}
      </div>
    </div>
  );
};

export default StaffManagementSection;
