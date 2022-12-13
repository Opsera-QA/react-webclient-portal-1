import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faHome} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function HomeSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={"/"}
      label={"Home"}
      icon={faHome}
      exact={true}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

HomeSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
