import React from "react";
import { SecureRoute } from "@okta/okta-react";
import NotificationPolicyManagement from "components/notifications/NotificationPolicyManagement";
import NotificationPoliciesActivityLogs from "components/notifications/NotificationPoliciesActivityLogs";
import NotificationDetailView from "components/notifications/notification_details/NotificationDetailView";

export default function NotificationsRoutes() {
  return (
    <>
      <SecureRoute path="/notifications" exact component={NotificationPolicyManagement} />
      <SecureRoute path="/notifications/activity" exact component={NotificationPoliciesActivityLogs} />
      <SecureRoute path="/notifications/details/:id" exact component={NotificationDetailView} />
    </>
  );
}

NotificationsRoutes.propTypes = {};

