import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";

function SideOverlayContainer({ children, titleText, titleIcon, showPanel, closePanel, loadData, isLoading, rightSide, showToasts}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();

    if (showPanel === true) {
      document.body.style.overflow = 'hidden';
    }
  }, [showPanel]);

  const handleClose = () => {
    loadData();
    toastContext.removeInlineMessage();
    closePanel();
  };

  if (!showPanel) {
    document.body.style.overflow = 'unset';
    return null;
  }

  return (
    <div className={`${rightSide ? `right-side-overlay` : `left-side-overlay`} overlay-panel content-card-1 w-25`}>
      <div className="px-3 content-block-header title-text-header-1">
        <OverlayTitleBar handleClose={handleClose} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
      </div>
      <div className="bg-white hide-x-overflow scroll-y overlay-panel-body">
        {showToasts && toastContext?.getInlineBanner()}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}


SideOverlayContainer.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  rightSide: PropTypes.bool,
  showToasts: PropTypes.bool
};

export default SideOverlayContainer;


