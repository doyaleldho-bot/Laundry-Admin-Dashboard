import React from "react";

interface HeaderButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface PageHeaderProps {
  title: string;
  description: string;
  buttons?: HeaderButton[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  buttons = [],
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
          {title}
        </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
          {description}
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            className={
              btn.variant === "primary"
                ? "h-9 px-4 rounded-[10px] bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white"
                : "h-9 px-4 rounded-[10px] bg-white border text-[#0A0A0A]"
            }
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
