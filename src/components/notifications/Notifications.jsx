import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faTable, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NotificationsView from "components/notifications/NotificationsView";
import NotificationActivityLogsTable
  from "components/notifications/notification_details/activity_logs/NotificationActivityLogsTable";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";

function Notifications() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "notifications");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab tabName={"notifications"} icon={faEnvelope} tabText={"Notification Policies"} handleTabClick={handleTabClick} activeTab={activeTab} />
        <NavigationTab tabName={"activity"} icon={faTable} tabText={"Activity Logs"} handleTabClick={handleTabClick} activeTab={activeTab} />
      </NavigationTabContainer>
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
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"notificationManagement"}
      pageDescription={`
        Create notification policies to tailor activity logging to your needs.
      `}
      navigationTabContainer={getNavigationTabContainer()}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default Notifications;