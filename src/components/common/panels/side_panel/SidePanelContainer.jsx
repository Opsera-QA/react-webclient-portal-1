import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SidePanelTitleBar from "components/common/panels/side_panel/SidePanelTitleBar";

function SidePanelContainer({ children, titleText, titleIcon, showPanel, closePanel, loadData, isLoading}) {
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
    <div className="side-panel w-25 content-card-1">
      <SidePanelTitleBar handleClose={handleClose} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
      <div className="p-3 bg-white step-settings-container">
        {toastContext.getInlineBanner()}
        <div className="p-3">
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
  isLoading: PropTypes.bool
};

export default SidePanelContainer;


