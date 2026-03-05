import React, { useState } from "react";

import GeneralTab from "./settingstabs/GeneralTab";
import PricingTab from "./settingstabs/PricingTab";
import ScheduleTab from "./settingstabs/ScheduleTab";
import NotificationsTab from "./settingstabs/NotificationsTab";
import SecurityTab from "./settingstabs/SecurityTab";

const tabs = [
  { key: "general", label: "General" },  
  { key: "pricing", label: "Pricing" },
  { key: "schedule", label: "Schedule" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" }, 
];

const SettingsTabsContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTab = () => {
    switch (activeTab) {
      case "pricing":
        return <PricingTab />;
      case "schedule":
        return <ScheduleTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <div className="w-full">
      {/* ---------- Tabs Header ---------- */}
      <div className="flex gap-6 mt-6 mb-6 px-">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

      {/* ---------- Content ---------- */}
      <div className="mt-8">{renderTab()}</div>
    </div>
  );
};

export default SettingsTabsContainer;
