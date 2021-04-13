import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faInfoSquare} from "@fortawesome/pro-light-svg-icons";

function HelpOverlayBase({ children, showPanel, closePanel, isLoading, className, titleIcon, titleText}) {
  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={showPanel}
      isLoading={isLoading}
      titleIcon={titleIcon}
      titleText={titleText}
    >
      <div className={className}>
        {children}
      </div>
    </CenterOverlayContainer>
  );
}

HelpOverlayBase.propTypes = {
  children: PropTypes.any,
  showPanel: PropTypes.bool,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  titleIcon: PropTypes.node,
  titleText: PropTypes.string
};

HelpOverlayBase.defaultProps = {
  className: "px-3 help-body",
  titleIcon: faInfoSquare,
  titleText: "Help"
};

export default HelpOverlayBase;


