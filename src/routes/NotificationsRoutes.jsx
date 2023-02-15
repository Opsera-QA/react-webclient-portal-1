import React from "react";
import { SecureRoute } from "@okta/okta-react";
import NotificationPolicyManagement from "components/notifications/NotificationPolicyManagement";
import NotificationPoliciesActivityLogs from "components/notifications/NotificationPoliciesActivityLogs";
import NotificationPolicyDetailView from "components/notifications/details/NotificationPolicyDetailView";

export default function NotificationsRoutes() {
  return (
    <>
      <SecureRoute path="/notifications" exact component={NotificationPolicyManagement} />
      <SecureRoute path="/notifications/activity" exact component={NotificationPoliciesActivityLogs} />
      <SecureRoute path="/notifications/details/:id" exact component={NotificationPolicyDetailView} />
    </>
  );
}

NotificationsRoutes.propTypes = {};

