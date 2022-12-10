import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faTools} from "@fortawesome/pro-light-svg-icons";

export default function AdminToolsSidebarNavigationLink() {
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
    />
  );
}
