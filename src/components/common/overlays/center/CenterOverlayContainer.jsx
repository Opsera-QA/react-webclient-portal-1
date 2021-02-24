import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";

function CenterOverlayContainer({ children, titleText, titleIcon, showPanel, closePanel, isLoading, showToasts}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (showToasts) {
      toastContext.removeInlineMessage();
    }
  }, [showPanel]);

  if (!showPanel) {
    return null;
  }

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className="center-overlay content-card-1 bg-white">
        <OverlayTitleBar handleClose={closePanel} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
        <div className="overlay-panel-body">
          {showToasts && toastContext?.getInlineBanner()}
          {children}
        </div>
      </div>
    </div>
  );
}

CenterOverlayContainer.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showToasts: PropTypes.bool
};

export default CenterOverlayContainer;


