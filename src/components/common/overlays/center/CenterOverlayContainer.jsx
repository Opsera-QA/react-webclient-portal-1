import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";

function CenterOverlayContainer({ children, titleText, titleIcon, showPanel, handleClose, isLoading, showToasts}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();

    if (showPanel === true) {
      document.body.style.overflow = 'hidden';
    }
  }, [showPanel]);

  if (!showPanel) {
    document.body.style.overflow = 'unset';
    return null;
  }

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className="center-overlay content-card-1">
        <div className="px-3 content-block-header title-text-header-1">
          <OverlayTitleBar handleClose={handleClose} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
        </div>
        <div className="bg-white scroll-y overlay-panel-body">
          {showToasts && toastContext?.getInlineBanner()}
          <div>
            {children}
          </div>
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
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  rightSide: PropTypes.bool,
  showToasts: PropTypes.bool
};

export default CenterOverlayContainer;


