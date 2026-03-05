import React from "react";
import {type Tab } from "./account.types";

export interface AccountTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "My active sessions", value: "active" },
  { label: "Branch Login History", value: "login" },
];

const AccountTabs: React.FC<AccountTabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex gap-6 mt-6 mb-6 px-6">
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

export default AccountTabs;
