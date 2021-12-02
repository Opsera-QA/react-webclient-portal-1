import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import HelpIconBase from "components/common/icons/help/HelpIconBase";

function HelpInfoOverlayIcon(
  {
    infoOverlay,
    title,
    className,
    placement,
  }) {

  if (infoOverlay == null) {
    return null;
  }

  return (
    <TooltipWrapper
      placement={placement}
      innerText={
        <div style={{height: 500}}>
          THIS IS A TEST
        </div>
      }
      title={title}
      showCloseButton={false}
    >
      <div className={className}>
        <HelpIconBase
        />
      </div>
    </TooltipWrapper>
  );
}

HelpInfoOverlayIcon.propTypes = {
  infoOverlay: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  placement: PropTypes.string,
};

HelpInfoOverlayIcon.defaultProps = {
  placement: "left",
};

export default HelpInfoOverlayIcon;