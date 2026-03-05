import React from "react";

interface PaymentStatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const PaymentStatCard: React.FC<PaymentStatCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  icon,
  gradient = "linear-gradient(135deg, #000000 0%, #155DFC 100%)",
}) => {
  return (
    <div
      className="rounded-[14px] text-white flex flex-col justify-between"
      style={{
        width: "409.14px",
        height: "163.94px",
        padding: "23.98px",
        background: gradient,
      }}
    >
      {/* Top */}
       {/* Top */}
      <div className="flex items-start justify-between">
        <img src={icon} alt={title} className="w-6 h-6 object-contain" />

        {badge && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Middle */}
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm opacity-80 mt-1">{title}</p>
      </div>

      {/* Bottom */}
      {subtitle && (
        <p className="text-xs opacity-70 mt-2">{subtitle}</p>
      )}
    </div>
  );
};

export default PaymentStatCard;
