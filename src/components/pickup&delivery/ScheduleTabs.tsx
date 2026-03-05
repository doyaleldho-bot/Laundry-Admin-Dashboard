import React from "react";

interface ScheduleTabsProps {
  active: "pickup" | "delivery";
  onChange: (value: "pickup" | "delivery") => void;
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ active, onChange }) => {
  return (
    <div className="inline-flex bg-white rounded-full border border-gray-200 p-1">
      <button
        onClick={() => onChange("pickup")}
        className={`px-4 py-1.5 text-sm rounded-full transition ${
          active === "pickup"
            ? "bg-gray-100 font-medium text-gray-900"
            : "text-gray-500"
        }`}
      >
        Pickup Schedule
      </button>

      <button
        onClick={() => onChange("delivery")}
        className={`px-4 py-1.5 text-sm rounded-full transition ${
          active === "delivery"
            ? "bg-gray-100 font-medium text-gray-900"
            : "text-gray-500"
        }`}
      >
        Delivery Schedule
      </button>
    </div>
  );
};

export default ScheduleTabs;
