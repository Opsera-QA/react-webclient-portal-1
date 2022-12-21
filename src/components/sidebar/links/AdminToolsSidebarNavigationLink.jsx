import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function AdminToolsSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    isOpseraAdministrator,
  } = useContext(AuthContext);

  if (isOpseraAdministrator() !== true) {
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
