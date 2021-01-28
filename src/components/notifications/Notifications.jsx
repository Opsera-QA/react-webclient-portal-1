import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faTable, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import NotificationsView from "components/notifications/NotificationsView";
import NotificationActivityLogsTable
  from "components/notifications/notification_details/activity_logs/NotificationActivityLogsTable";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";

function Notifications() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "notifications");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab tabName={"notifications"} icon={faEnvelope} tabText={"Notification Policies"} handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab tabName={"activity"} icon={faTable} tabText={"Activity Logs"} handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
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
    <ScreenContainer
      breadcrumbDestination={"notificationManagement"}
      pageDescription={`
        Create notification policies to tailor activity logging to your needs.
      `}
    >
      <TabPanelContainer tabContainer={getTabContainer()} currentView={getCurrentView()}/>
    </ScreenContainer>
  );
}

export default Notifications;