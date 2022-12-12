import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function NotificationsSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={"/notifications"}
      label={"Notifications"}
      icon={faEnvelope}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

NotificationsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
