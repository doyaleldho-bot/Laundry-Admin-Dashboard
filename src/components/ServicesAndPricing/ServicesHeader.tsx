import { useState } from "react";

const ServicesHeader = () => {

  return (
    <div className="flex items-center justify-between">
      
      {/* Left content */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
Services & Pricing     </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
Manage cloth categories and service pricing        </p>
      </div>

    </div>
  );
};

export default ServicesHeader;
