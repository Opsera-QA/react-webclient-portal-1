import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateCenterPanel({ children, titleIcon, objectType, closePanel, size, isMounted, loadData}) {
  const toastContext = useContext(DialogToastContext);

  // TODO: Remove this and wire up handleClose directly,
  //  if we update every instance to just pass in what's necessary on close
  const handleClosingPanel = () => {
    if (closePanel == null) {
      handleClose();
    }
    else {
      closePanel();
    }
  };

  const handleClose = () => {
    if (isMounted?.current === true && loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={handleClosingPanel}
      showPanel={true}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      {children}
    </CenterOverlayContainer>
  );
}

CreateCenterPanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default CreateCenterPanel;


