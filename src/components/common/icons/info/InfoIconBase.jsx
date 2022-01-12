import React from "react";
import PropTypes from "prop-types";
import {faInfoCircle, faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function InfoIconBase(
  {
    className,
    onClickFunction,
    infoOverlay,
    infoOverlayTitle,
  }) {
  return (
    <div className={className}>
      <TooltipWrapper
        innerText={infoOverlay}
        title={infoOverlayTitle}
        placement={"top"}
      >
        <IconBase
          onClickFunction={onClickFunction}
          icon={faInfoCircle}
        />
      </TooltipWrapper>
    </div>
  );
}

InfoIconBase.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
  infoOverlay: PropTypes.any,
  infoOverlayTitle: PropTypes.any,
};

export default InfoIconBase;