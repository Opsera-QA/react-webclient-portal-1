import React from "react";
import PropTypes from "prop-types";
import {faArrowLeft, faArrowRight} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import sessionHelper from "utils/session.helper";

export default function ToggleSidebarSizeIcon(
  {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    className,
  }) {
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    sessionHelper.setStoredSessionValue("SIDEBAR_COLLAPSED", isSidebarCollapsed);
  };

  return (
    <div className={className}>
      <OverlayIconBase
        // overlayBody={isSidebarCollapsed === true ? "Expand Sidebar" : "Collapse Sidebar"}
        iconSize={"lg"}
        icon={isSidebarCollapsed === true ? faArrowRight : faArrowLeft}
        onClickFunction={() => handleSidebarToggle()}
      />
    </div>
  );
}

ToggleSidebarSizeIcon.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
  setIsSidebarCollapsed: PropTypes.func,
  className: PropTypes.string,
};