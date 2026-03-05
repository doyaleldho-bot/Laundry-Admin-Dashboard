import React from "react";
import { Phone, Bike, MapPin, Star } from "lucide-react";

export interface Driver {
  id: string;
  name: string;
  status: "Available" | "On Duty";
  rating: number;
  phone: string;
  vehicle: string;
  distance: string;
  orders: number;
  avatar: string;
}

interface DriverCardProps {
  driver: Driver;
  onAssign: (driverId: string) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onAssign }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex gap-4">
      
      {/* AVATAR */}
      <img
        src={driver.avatar}
        alt={driver.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* INFO */}
      <div className="flex-1">
        {/* NAME + STATUS */}
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">
            {driver.name}
          </h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              driver.status === "Available"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {driver.status}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={12} className="text-yellow-500" />
            {driver.rating}
          </span>
        </div>

        {/* DETAILS */}
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <div className="flex gap-2 items-center">
            <Phone size={14} />
            {driver.phone}
          </div>

          <div className="flex gap-2 items-center">
            <Bike size={14} />
            {driver.vehicle}
          </div>

          <div className="flex gap-2 items-center">
            <MapPin size={14} />
            {driver.distance} away
          </div>
        </div>

        {/* ASSIGNED */}
        <div className="mt-2 text-xs text-gray-500">
          Currently Assigned
          <div className="text-blue-600 font-medium">
            {driver.orders} orders
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
