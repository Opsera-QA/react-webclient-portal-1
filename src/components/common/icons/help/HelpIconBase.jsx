import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function HelpIconBase(
  {
    className,
    onClickFunction,
    helpOverlay,
    helpOverlayTitle,
  }) {
  return (
    <div className={className}>
      <TooltipWrapper
        innerText={helpOverlay}
        title={helpOverlayTitle}
        placement={"top"}
      >
        <IconBase
          onClickFunction={onClickFunction}
          icon={faQuestionCircle}
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
};

export default HelpIconBase;