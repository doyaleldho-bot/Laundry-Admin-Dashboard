import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  bg: "blue" | "red" | "purple";
  per: string;
  color: string
  icon?: React.ReactNode;
}


const ColorCard: React.FC<StatsCardProps> = ({ title, value, icon, color, per, bg }) => {
  const bgColorMap: Record<string, string> = {
    blue: "bg-gradient-to-r from-[#70A8FF] to-[#155DFC]",
    purple: "bg-gradient-to-r from-[#CA87FF] to-[#9810FA]",
    red: "bg-gradient-to-r from-[#FF83C5] to-[#FFDA00]",
  };


  return (
    <div className={`"w-full sm:max-w-[243px] md:max-w-[292px] lg:max-w-[500px] h-[174px] flex flex-col justify-between  shadow-sm px-[25px] py-[15px] rounded-[10px] border border-gray-200 ${bgColorMap[bg]}`}>

      {/* Top row: icon and percentage */}
      <div className="flex">
        <span className="flex items-start">{icon}</span>
        <div
          className={`ml-auto w-[84px] h-[24px] rounded-[10px] text-xs flex items-center justify-center
  bg-white/30 text-white`}
        >
          {per}
        </div>

      </div>


      {/* Value */}
      <div className="flex items-center gap-5">
        <h2 className={`text-[30px] font-bold leading-[36px] text-white`}>{value}</h2>
      </div>
      {/* Title */}
      <p className="text-sm font-normal text-[14px] leading-[20px] tracking-[0px] text-[#DBEAFE]">
        {title}
      </p>
    </div>
  );
};

export default ColorCard;
