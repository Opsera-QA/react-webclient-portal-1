import React, { useState } from "react";

import PropTypes from "prop-types";
import NotificationEditorPanel from "./NotificationEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import CustomTab from "components/common/tabs/CustomTab";
import {
  faTable,
} from "@fortawesome/pro-light-svg-icons";
import NotificationSummaryPanel
  from "components/notifications/notification_details/NotificationSummaryPanel";
import NotificationActivityLogsTable
  from "components/notifications/notification_details/activity_logs/NotificationActivityLogsTable";

function NotificationDetailPanel({ notificationData, setNotificationData, loadData, isLoading }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Activity Logs"}/>
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <NotificationSummaryPanel notificationData={notificationData} setActiveTab={setActiveTab} />;
        case "settings":
          return <NotificationEditorPanel notificationData={notificationData} setNotificationData={setNotificationData} loadData={loadData}/>;
        case "logs":
          return <NotificationActivityLogsTable notificationData={notificationData} setNotificationData={setNotificationData} loadData={loadData}/>;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

NotificationDetailPanel.propTypes = {
  notificationData: PropTypes.object,
  setNotificationData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default NotificationDetailPanel;


