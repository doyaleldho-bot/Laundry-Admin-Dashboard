import React from "react";
import { Search } from "lucide-react";
import DriverCard, {type Driver } from "./DriverCard";

interface AssignDriverModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (driverId: string) => void;
  orderId: string;
  drivers: Driver[];
}

const AssignDriverModal: React.FC<AssignDriverModalProps> = ({
  open,
  onClose,
  onAssign,
  orderId,
  drivers,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[700px]  max-h-[1000px] bg-white rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-blue-500 to-purple-500">
          <h2 className="text-white font-semibold text-lg">
            Assign Driver
          </h2>
          <div className="text-right text-white text-sm">
            <div className="opacity-80">Order ID:</div>
            <div className="font-medium">{orderId}</div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search driver by name or vehicle..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* DRIVER LIST */}
        <div className="max-h-[1000px] overflow-y-auto p-4 space-y-4">
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onAssign={onAssign}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          >
            Assign Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverModal;
