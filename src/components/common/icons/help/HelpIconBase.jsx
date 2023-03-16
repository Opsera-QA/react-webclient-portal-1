import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

export default function HelpIconBase(
  {
    className,
    onClickFunction,
    helpOverlay,
    helpOverlayTitle,
    iconSize,
    tooltipPlacement,
  }) {
  return (
    <div className={className}>
      <TooltipWrapper
        innerText={helpOverlay}
        title={helpOverlayTitle}
        placement={tooltipPlacement}
      >
        <IconBase
          onClickFunction={onClickFunction}
          icon={faQuestionCircle}
          iconSize={iconSize}
        />
      </TooltipWrapper>
    </div>
  );
}

HelpIconBase.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
  helpOverlay: PropTypes.any,
  helpOverlayTitle: PropTypes.any,
  iconSize: PropTypes.string,
  tooltipPlacement: PropTypes.string,
};

HelpIconBase.defaultProps = {
  tooltipPlacement: "top",
};
