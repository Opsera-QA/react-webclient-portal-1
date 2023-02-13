import React, { useState } from "react";

import PropTypes from "prop-types";
import NotificationPolicyEditorPanel from "components/notifications/details/NotificationPolicyEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import NotificationPolicySummaryPanel
  from "components/notifications/details/NotificationPolicySummaryPanel";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import NotificationPolicyActivityLogs
  from "components/notifications/details/NotificationPolicyActivityLogs";

function NotificationPolicyDetailPanel({ notificationData, setNotificationData, loadData, isLoading }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Activity Logs"}/>
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <NotificationPolicySummaryPanel
            notificationData={notificationData}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <NotificationPolicyEditorPanel
            handleClose={toggleSummaryPanel}
            notificationData={notificationData}
            setNotificationData={setNotificationData}
            loadData={loadData}
          />
        );
      case "logs":
        return (
          <DetailPanelContainer>
            <NotificationPolicyActivityLogs
              notificationId={notificationData?.getData("_id")}
            />
          </DetailPanelContainer>
        );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

NotificationPolicyDetailPanel.propTypes = {
  notificationData: PropTypes.object,
  setNotificationData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default NotificationPolicyDetailPanel;


