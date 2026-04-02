import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { api } from "../../api/axiosInstance";
import { toast } from "react-toastify";
export type StaffTabType = "admin" | "delivery";

interface StaffCardProps {
  type: StaffTabType;
  id?: string;
  // Common
  name: string;
  status?: string;
  phone?: string;

  // Admin / Staff
  role?: string;
  email?: string;
  branch?: string;
  lastActive?: string;

  // Delivery Staff
  vehicle?: string;
  assigned?: number;
  completed?: number;
   permissions?: string[]; // for edit modal
  // Roles & Permissions
  permissionsData?: {
    role: string;
    description: string;
    badgeColor: "purple" | "blue" | "green";
    permissions: string[];
  }[];
}

const ALL_PERMISSIONS = [
  "DASHBOARD",
  "ORDERS",
  "PICKUP",
  "CUSTOMERS",
  "SERVICES",
  "PAYMENTS",
  "REPORT",
  "ADMIN_STAFF",
  "ACCOUNT_SESSION",
  "SUPPORT",
  "SETTINGS",
];

const StaffCard: React.FC<StaffCardProps> = (props) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ email: "", phone: "", permissions: [] as string[], });
  const [currentUserId, setCurrentUserId] = useState(""); // for API

  const handleEdit = (user: any) => {
    setCurrentUserId(user.id);
    setEditUser({
      email: user.email,
      phone: user.phone,
      permissions: user.permissions || [],
    });
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: string) => {
    {
      if (!window.confirm("Are you sure you want to delete this user?")) return;

      try {
        await api.delete(`/delete/branch/user/${id}`);
        toast.success("Deleted successfully and Permenantly");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete user");
      }
    }
  }
  const initials = props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  /* ---------------- ADMIN & STAFF CARD ---------------- */
  if (props.type === "admin") {
    return (
      <div className="w-full  mx-auto h-[172.89px] bg-white border-[1.25px] border-gray-200 rounded-[14px] px-[23.98px] py-[23.98px] flex justify-between">
        {/* Left */}
        <div className="flex gap-6">
          <div className="w-[52px] h-[52px] rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
            {initials}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-semibold">{props.name}</h3>

              <span className="px-3 py-1 text-xs rounded-md bg-purple-100 text-purple-700">
                {props.role}
              </span>

              <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700">
                {props.status}
              </span>
            </div>

            <div className="flex gap-8 text-sm text-gray-500">
              <span>{props.email}</span>
              <span>{props.phone}</span>
              <span>Branch: {props.branch}</span>
            </div>

            <span className="text-xs text-green-600">
              {props.lastActive}
            </span>
          </div>
        </div>

        {/* Actions */}

        <div className="flex gap-2">
          <button onClick={() => handleEdit(props)} className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded transition">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => props.id && handleDelete(props.id)} className="h-8 w-8 flex items-center justify-center hover:bg-red-50 text-red-600 rounded transition">
            <FiTrash2 size={16} />
          </button>
        </div>
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Edit User</h2>

              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-4 text-sm"
              />

              <label className="block mb-2 text-sm">Phone</label>
              <input
                type="text"
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-4 text-sm"
              />
              <label className="block mb-2 text-sm font-medium">Permissions</label>

              <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto border rounded p-2 mb-4">
                {ALL_PERMISSIONS.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editUser.permissions.includes(perm)}
                      onChange={(e) => {
                        let updated = [...editUser.permissions];

                        if (e.target.checked) {
                          updated.push(perm);
                        } else {
                          updated = updated.filter((p) => p !== perm);
                        }

                        setEditUser({ ...editUser, permissions: updated });
                      }}
                    />
                    {perm}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={async () => {
                    try {
                      await api.put(`/update/profile/${currentUserId}`, {
                        email: editUser.email,
                        phone: editUser.phone,
                        permissions: editUser.permissions,
                      });

                      toast.success("Updated successfully");
                      setIsEditModalOpen(false);
                    } catch (err: any) {
                      toast.error(err.response?.data?.message || "Failed to update user");
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- DELIVERY STAFF CARD ---------------- */
  if (props.type === "delivery") {
    return (

      <div className="w-full max-w-[842.27px]  h-[297.09px] bg-white border-[1.25px] border-gray-200 rounded-[14px] px-[23.98px] py-[23.98px] flex flex-col gap-[39.98px]">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
              {initials}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-semibold">{props.name}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full w-fit ${props.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : props.status === "On Duty"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {props.status}
              </span>
            </div>
          </div>

        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <span>📞 {props.phone}</span>
          <span>🚚 Vehicle: {props.vehicle}</span>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Stats */}
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-500">Currently Assigned</p>
            <p className="text-blue-600 font-semibold text-lg">
              {props.assigned}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Total Completed</p>
            <p className="text-green-600 font-semibold text-lg">
              {props.completed}
            </p>
          </div>
        </div>
      </div>
    );
  }


};

export default StaffCard;
