import React from "react";
import PropTypes from "prop-types";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function ActionBarPopoverButton(
  {
    popoverText,
    text,
    icon,
    className,
    onClickFunction,
  }) {
  return (
    <div className={className}>
      <OverlayIconBase
        iconClassName={"action-bar-icon"}
        overlayBody={popoverText}
        iconSize={"lg"}
        icon={icon}
        onClickFunction={onClickFunction}
      />
      <span>{text}</span>
    </div>
  );
}

ActionBarPopoverButton.propTypes = {
  icon: PropTypes.object,
  popoverText: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  onClickFunction: PropTypes.func,
};