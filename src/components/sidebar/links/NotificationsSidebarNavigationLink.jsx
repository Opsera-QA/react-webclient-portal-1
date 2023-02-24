import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {notificationPolicyHelper} from "hooks/notification_policies/notificationPolicy.helper";

export default function NotificationsSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={notificationPolicyHelper.getManagementScreenLink()}
      label={"Notifications"}
      icon={faEnvelope}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

NotificationsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
