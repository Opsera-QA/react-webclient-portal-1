import React from "react";
import PropTypes from "prop-types";
import {faCaretDown, faCaretUp} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function ExpandAndCollapseIcon(
  {
    isCollapsed,
    setIsCollapsed,
    visible,
    className,
  }) {
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <OverlayIconBase
        overlayBody={isCollapsed === true ? "Expand" : "Collapse"}
        iconSize={"lg"}
        icon={isCollapsed === true ? faCaretDown : faCaretUp}
        onClickFunction={() => handleToggle()}
      />
    </div>
  );
}

ExpandAndCollapseIcon.propTypes = {
  isCollapsed: PropTypes.bool,
  setIsCollapsed: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
};