import React from "react";

type Tab = "admin" | "delivery" | "roles";

interface StaffTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "Admin & Staff", value: "admin" },
  { label: "Delivery Staff", value: "delivery" },
  { label: "Roles & Permissions", value: "roles" },
];

const StaffTabs: React.FC<StaffTabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex gap-6 mt-8 mb-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              w-[364.34px] h-[35.99px]
              rounded-[14px]
              border-[1.25px]
              text-sm font-semibold
              transition
              ${
                isActive
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default StaffTabs;
