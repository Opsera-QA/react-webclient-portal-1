import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faArchive} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function LogsSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={"/logs"}
      label={"Logs"}
      icon={faArchive}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

LogsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
