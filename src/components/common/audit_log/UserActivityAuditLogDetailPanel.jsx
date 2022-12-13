import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import UserActivityAuditLogSummaryPanelBase from "components/common/audit_log/UserActivityAuditLogSummaryPanelBase";
import UserActivityAuditLogObjectView from "components/common/audit_log/UserActivityAuditLogObjectView";

export default function UserActivityAuditLogDetailPanel({ auditLogModel }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <JsonTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <UserActivityAuditLogSummaryPanelBase
            auditLogModel={auditLogModel}
            className={"m-2"}
          />
        );
      case "json":
        return (
          <UserActivityAuditLogObjectView
            auditLogModel={auditLogModel}
            className={"m-2"}
          />
        );
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

UserActivityAuditLogDetailPanel.propTypes = {
  auditLogModel: PropTypes.object,
};


