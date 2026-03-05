import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  bg: "blue" | "green" | "red" | "purple";
  color: "blue" | "green" | "red" | "purple";
  per: string;
  icon?: React.ReactNode; 
}


const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, per ,bg }) => {
    const bgColorMap: Record<string, string> = {
  blue: "bg-[#DBEAFE]",
  green: "bg-[#DCFCE7]",
  red: "bg-[#FFEDD4]",
  purple: "bg-[#F3E8FF]",
};

const textColorMap: Record<string, string> = {
  blue: "text-[#1447E6]",
  green: "text-[#008236]",
  red: "text-[#CA3500]",
  purple: "text-[#8200DB]",
};

  return (
    <div className="w-full sm:max-w-[270px] md:max-w-[324px] lg:max-w-[370px] h-[174px] flex flex-col justify-between bg-white shadow-sm px-[25px] py-[25px] rounded-[10px] border border-gray-200">
      
      {/* Top row: icon and percentage */}
      <div className="flex">
        <span className="flex items-start">{icon}</span>
<div
  className={`ml-auto w-[45px] h-[23px] rounded-[10px] text-xs flex items-center justify-center
  ${bgColorMap[bg]} ${textColorMap[color]}`}
>
  {per}
</div>

      </div>

      {/* Title */}
      <p className="text-sm font-normal text-[14px] leading-[20px] tracking-[0px] text-[#6A7282]">
        {title}
      </p>

      {/* Value */}
      <div className="flex items-center gap-5">
        <h2 className={`text-[30px] font-bold text-[#101828]`}>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
