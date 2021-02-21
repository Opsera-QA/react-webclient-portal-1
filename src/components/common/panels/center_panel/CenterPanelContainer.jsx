import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SidePanelTitleBar from "components/common/panels/side_panel/SidePanelTitleBar";

function CenterPanelContainer({ children, titleText, titleIcon, showPanel, closePanel, loadData, isLoading, showToasts}) {
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
    <div className={`overlay-panel center-panel-shadow-background`}>
      <div className="center-panel content-card-1">
        <div className="px-3 content-block-header title-text-header-1">
          <SidePanelTitleBar handleClose={handleClose} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
        </div>
        <div className="bg-white scroll-y center-panel-body">
          {showToasts && toastContext?.getInlineBanner()}
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

CenterPanelContainer.propTypes = {
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

export default CenterPanelContainer;


