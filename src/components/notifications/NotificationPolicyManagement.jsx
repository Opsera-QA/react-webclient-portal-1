import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NotificationPolicySubNavigationBar from "components/notifications/NotificationPolicySubNavigationBar";
import NotificationPoliciesTable from "components/notifications/NotificationPoliciesTable";
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
      navigationTabContainer={<NotificationPolicySubNavigationBar activeTab={"notifications"} />}
    >
      <NotificationPoliciesTable
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