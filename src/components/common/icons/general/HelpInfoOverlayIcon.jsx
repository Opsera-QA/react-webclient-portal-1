import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import HelpIconBase from "components/common/icons/help/HelpIconBase";

function HelpInfoOverlayIcon(
  {
    infoOverlay,
    title,
    className,
    overlayPlacement,
  }) {

  if (infoOverlay == null) {
    return null;
  }

  return (
    <TooltipWrapper
      placement={overlayPlacement}
      innerText={
        <div style={{height: 500}}>
          {infoOverlay}
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
  overlayPlacement: PropTypes.string,
};

HelpInfoOverlayIcon.defaultProps = {
  overlayPlacement: "left",
};

export default HelpInfoOverlayIcon;