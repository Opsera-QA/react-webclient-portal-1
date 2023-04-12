import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function AdminToolsSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <SidebarNavigationLinkBase
      link={`/admin`}
      label={"Admin Tools"}
      icon={faTools}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

AdminToolsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
