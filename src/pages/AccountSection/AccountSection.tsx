import React, { useState } from "react";
import AccountHeader from "../../components/accountSection/AccountHeader";
import AccountTabs from "../../components/accountSection/AccountTabs";
import ActiveSessions from "../../components/accountSection/AccountTabCards/ActiveSessionCaards";
import LoginHistoryTab from "../../components/accountSection/AccountTabCards/LoginHistoryCards";
import type { Tab } from "../../components/accountSection/account.types";
const AccountSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("active");

  return (
    <div className="pt-6">
      {/* Header */}
      <AccountHeader />

      {/* Tabs */}
      <AccountTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB CONTENT */}
      <div className="mt-6">

        {activeTab === "active" && (
            <ActiveSessions/>
        )}

        {activeTab === "login" && (
          <LoginHistoryTab/>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
