import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SidePanelTitleBar from "components/common/panels/side_panel/SidePanelTitleBar";

function SidePanelContainer({ children, titleText, titleIcon, showPanel, closePanel, loadData, isLoading, rightSide, showToasts}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
  }, [showPanel]);

  const handleClose = () => {
    loadData();
    toastContext.removeInlineMessage();
    closePanel();
  };

  if (!showPanel) {
    return null;
  }

  return (
    <div className={`${rightSide ? `right-side-panel` : `left-side-panel`} side-panel content-card-1 w-25`}>
      <div className="px-3 content-block-header title-text-header-1">
        <SidePanelTitleBar handleClose={handleClose} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
      </div>
      <div className="bg-white scroll-y side-panel-body">
        {showToasts && toastContext?.getInlineBanner()}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}


SidePanelContainer.propTypes = {
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

export default SidePanelContainer;


