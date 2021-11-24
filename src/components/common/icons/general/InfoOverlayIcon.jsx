import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import HelpIconBase from "components/common/icons/help/HelpIconBase";

function InfoOverlayIcon({infoOverlay, title, className}) {

  if (infoOverlay == null) {
    return null;
  }

  return (
    <>
      <TooltipWrapper
        innerText={infoOverlay}
        title={title}
        showCloseButton={false}
      >
        <div>
          <HelpIconBase
            tooltipText={infoOverlay}
            className={className}
          />
        </div>
      </TooltipWrapper>
    </>
  );
}

InfoOverlayIcon.propTypes = {
  infoOverlay: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default InfoOverlayIcon;