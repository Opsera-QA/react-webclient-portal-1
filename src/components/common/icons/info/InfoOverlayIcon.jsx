import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InfoIconBase from "components/common/icons/info/InfoIconBase";

function InfoOverlayIcon(
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
        <InfoIconBase
        />
      </div>
    </TooltipWrapper>
  );
}

InfoOverlayIcon.propTypes = {
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

InfoOverlayIcon.defaultProps = {
  overlayPlacement: "left",
  overlayHeight: 250,
  overlayWidth: 500,
};

export default InfoOverlayIcon;