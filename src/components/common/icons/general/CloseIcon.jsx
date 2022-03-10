import React from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function CloseIcon(
  {
    handleCloseFunction,
    className,
    iconClassName,
    size,
    overlayBody,
  }) {

  if (handleCloseFunction == null) {
    return null;
  }

  return (
    <OverlayIconBase
      className={className}
      iconClassName={iconClassName}
      overlayBody={overlayBody}
      onClickFunction={handleCloseFunction}
      icon={faTimes}
      iconSize={size}
      overlayPlacement={"bottom"}
    />
  );
}

CloseIcon.propTypes = {
  handleCloseFunction: PropTypes.func,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  size: PropTypes.string,
  overlayBody: PropTypes.any,
};

export default CloseIcon;