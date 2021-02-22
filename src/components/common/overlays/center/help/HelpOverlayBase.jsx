import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function HelpOverlayBase({ children, showPanel, closePanel, isLoading, className}) {
  return (
    <CenterOverlayContainer handleClose={closePanel} showPanel={showPanel} isLoading={isLoading}>
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
  className: PropTypes.string
};

HelpOverlayBase.defaultProps = {
  className: "px-3 help-body"
};

export default HelpOverlayBase;


