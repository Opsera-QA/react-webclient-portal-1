import React from "react";
import PropTypes from "prop-types";
import {faBinoculars} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function BinocularsIcon(
  {
    className,
    onClickFunction,
    tooltipText,
    iconSize,
  }) {
  return (
    <div className={className}>
      <OverlayIconBase
        overlayBody={tooltipText}
        onClickFunction={onClickFunction}
        icon={faBinoculars}
        iconSize={iconSize}
        className={onClickFunction}
      />
    </div>
  );
}

BinocularsIcon.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
  iconSize: PropTypes.string,
};

export default BinocularsIcon;