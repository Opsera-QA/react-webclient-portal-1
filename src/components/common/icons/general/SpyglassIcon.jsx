import React from "react";
import PropTypes from "prop-types";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function SpyglassIcon(
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
        icon={faSearch}
        iconSize={iconSize}
        className={onClickFunction}
      />
    </div>
  );
}

SpyglassIcon.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
  iconSize: PropTypes.string,
};

export default SpyglassIcon;