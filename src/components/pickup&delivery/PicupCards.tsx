import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  bd: "blue" | "green" | "red" | "purple";
  color: "blue" | "green" | "red" | "purple";
  icon: React.ReactNode;
}

const PicupCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  bd,
}) => {

  const borderColorMap: Record<string, string> = {
    blue: "border-[#2B7FFF]",
    green: "border-[#00C950]",
    red: "border-[#FF6900]",
    purple: "border-[#A855F7]",
  };

  const hoverColorMap: Record<string, string> = {
    blue: "hover:bg-[#EFF6FF] hover:text-[#1447E6]",
    green: "hover:bg-[#ECFDF5] hover:text-[#008236]",
    red: "hover:bg-[#FFF7ED] hover:text-[#CA3500]",
    purple: "hover:bg-[#FAF5FF] hover:text-[#8200DB]",
  };

  return (
    <div
      className={`
        relative
        w-full sm:max-w-[270px] md:max-w-[324px] lg:max-w-[370px]
        h-[106px]
        flex flex-col justify-between
        bg-white
        shadow-sm
        px-[25px] py-[25px]
        rounded-[10px]
        border
        border-l-[4px]
        transition-all duration-200
        ${borderColorMap[bd]}
        ${hoverColorMap[color]}
      `}
    >
      {/* LEFT CONTENT */}
      <div className="flex flex-col">
        <p className="text-[14px] leading-[20px] text-[#6A7282]">
          {title}
        </p>

        <h2 className="text-[30px] font-bold text-[#101828]">
          {value}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <span className="absolute right-[25px] top-1/2 -translate-y-1/2 flex items-center justify-center">
        {icon}
      </span>
    </div>
  );
};

export default PicupCard;
