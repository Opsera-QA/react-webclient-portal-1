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
    iconClassName,
  }) {
  return (
    <div className={className}>
      <OverlayIconBase
        overlayBody={tooltipText}
        onClickFunction={onClickFunction}
        icon={faSearch}
        iconSize={iconSize}
        iconClassName={iconClassName}
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
  iconClassName: PropTypes.string,
};

export default SpyglassIcon;