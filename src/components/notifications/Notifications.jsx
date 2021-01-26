import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import NotificationsView from "components/notifications/NotificationsView";
import NotificationActivityLogsTable
  from "components/notifications/notification_details/activity_logs/NotificationActivityLogsTable";

function Notifications() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "notifications");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTab = (handleTabClick, tabName, icon, text) => {
    return (
      <li className="nav-item" style={{ minWidth: "5em", textAlign: "center" }}>
          <a className={"nav-link " + (activeTab === tabName ? "active" : "")} href="#"
             onClick={handleTabClick(tabName)}><FontAwesomeIcon icon={icon} fixedWidth size="lg"/><span
            className="ml-1 d-none d-lg-inline">{text}</span></a>
      </li>
    );
  };

  const getTabContainer = () => {
    return (
      <div className="alternate-tabs">
        <ul className="nav nav-tabs">
          {getTab(handleTabClick, "notifications", faEnvelope, "Notification Policies", "Notification Policies")}
          {getTab(handleTabClick, "activity", faTable, "Activity Logs", "Activity Logs")}
        </ul>
      </div>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationsView />;
      case "activity":
        return <NotificationActivityLogsTable allLogs={true} />;
      default:
        return null;
    }
  }

  return (
    <ScreenContainer breadcrumbDestination={"notificationManagement"}>
      <TabPanelContainer tabContainer={getTabContainer()} currentView={getCurrentView()}/>
    </ScreenContainer>
  );
}

export default Notifications;