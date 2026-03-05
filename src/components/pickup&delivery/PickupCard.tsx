import React from "react";
import { Phone, MapPin, User } from "lucide-react";


export type PickupStatus =
  | "Scheduled"
  | "In Transit"
  | "Completed"
  | "Out for Delivery"
  | "Ready";

interface PickupCardProps {
  orderId: string;
  status: PickupStatus;
  customerName: string;
  phone: string;
  address: string;
  driver: string;
  time: string;
  items: number;
  showComplete?: boolean;
}

const statusStyleMap: Record<PickupStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-600",
  "In Transit": "bg-orange-100 text-orange-600",
  Completed: "bg-green-100 text-green-600",
  Ready: "bg-purple-100 text-purple-600",
  "Out for Delivery": "bg-cyan-100 text-cyan-600",
};

const PickupCard: React.FC<PickupCardProps> = ({
  orderId,
  status,
  customerName,
  phone,
  address,
  driver,
  time,
  items,
  showComplete = true,
}) => {
  return (
    <div className="relative border border-gray-200 rounded-xl p-4 bg-white">
      {/* TOP ROW */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[14px] leading-[20px] text-[#155DFC] font-bold">
            #{orderId}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${statusStyleMap[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="text-right  text-[#101828]">
          <div className="text-[14px] leading-[20px]">{time}</div>
          <div className="text-[12px] leading-[16px]">{items} items</div>
        </div>
      </div>

      {/* CUSTOMER */}
      <div className="font-semibold text-gray-900 mb-1">
        {customerName}
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex gap-2">
<Phone size={16} /> {phone}</div>
        <div className="flex gap-2">
            <MapPin size={16} />
 {address}</div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          View Details
        </button>

        {showComplete && (
          <button className="px-3 py-1.5 text-sm border border-green-300 text-green-600 rounded-md hover:bg-green-50">
            Mark Completed
          </button>
        )}
      </div>

      {/* DRIVER — PERFECT CENTER */}
      <div className="gap-2 absolute inset-0 flex items-center justify-center text-sm text-gray-600 pointer-events-none">
        <User size={16} />
 Driver:{" "}
        <span className="ml-1 font-medium text-gray-800">
          {driver}
        </span>
      </div>
    </div>
  );
};

export default PickupCard;
