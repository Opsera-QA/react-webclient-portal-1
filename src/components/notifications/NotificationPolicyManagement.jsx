import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NotificationSubNavigationBar from "components/notifications/NotificationSubNavigationBar";
import NotificationsTable from "components/notifications/NotificationsTable";
import NotificationManagementHelpDocumentation
  from "../common/help/documentation/notifications/NotificationManagementHelpDocumentation";
import useGetNotificationPolicies from "hooks/notification_policies/useGetNotificationPolicies";

function NotificationPolicyManagement() {
  const {
    isLoading,
    error,
    loadData,
    notificationFilterModel,
    setNotificationFilterModel,
    notificationPolicies,
  } = useGetNotificationPolicies();

  const getHelpComponent = () => {
    return (<NotificationManagementHelpDocumentation/>);
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"notificationManagement"}
      helpComponent={getHelpComponent()}
      pageDescription={`
        Create Notification Policies to tailor activity logging to your needs.
      `}
      navigationTabContainer={<NotificationSubNavigationBar activeTab={"notifications"} />}
    >
      <NotificationsTable
        isLoading={isLoading}
        loadData={loadData}
        data={notificationPolicies}
        notificationFilterDto={notificationFilterModel}
        setNotificationFilterDto={setNotificationFilterModel}
      />
    </ScreenContainer>
  );
}

export default NotificationPolicyManagement;