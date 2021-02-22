import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateCenterPanel({ children, titleIcon, objectType, showPanel, closePanel, loadData}) {
  const toastContext = useContext(DialogToastContext);

  const handleClose = () => {
    loadData();
    toastContext.removeInlineMessage();
    closePanel();
  };

  return (
    <CenterOverlayContainer
      handleClose={handleClose}
      closePanel={closePanel}
      showPanel={showPanel}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
    >
      {children}
    </CenterOverlayContainer>
  );
}

CreateCenterPanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default CreateCenterPanel;


