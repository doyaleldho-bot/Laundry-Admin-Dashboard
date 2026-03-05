import React from "react";

interface CustomerStatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const CustomerStatsCard: React.FC<CustomerStatsCardProps> = ({
  title,
  value,
  change,
  subtitle,
  icon,
  highlight = false,
}) => {
  return (
    <div
      className={`bg-white rounded-[14px] border flex flex-col gap-2`}
      style={{
        width: "409.14px",
        height: "150.41px",
        padding: "25.23px 25.23px 1.25px 25.23px",
        borderWidth: "1.25px",
        borderColor: highlight ? "#3B82F6" : "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h2 className="text-[20px] font-semibold text-gray-900">{value}</h2>

      {change && (
        <p className="text-xs text-green-600">{change}</p>
      )}

      {subtitle && (
        <p className="text-xs text-green-600">{subtitle}</p>
      )}
    </div>
  );
};

export default CustomerStatsCard;
