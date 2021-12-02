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
    overlayHeight,
    overlayWidth,
  }) {

  if (infoOverlay == null) {
    return null;
  }

  return (
    <TooltipWrapper
      placement={overlayPlacement}
      overlayHeight={overlayHeight}
      overlayWidth={overlayWidth}
      innerText={infoOverlay}
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
  overlayHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  overlayWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

HelpInfoOverlayIcon.defaultProps = {
  overlayPlacement: "left",
  overlayHeight: 250,
  overlayWidth: 500,
};

export default HelpInfoOverlayIcon;