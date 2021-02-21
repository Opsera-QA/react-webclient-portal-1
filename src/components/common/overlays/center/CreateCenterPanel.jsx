import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function CreateCenterPanel({ children, titleIcon, objectType, showPanel, closePanel, loadData}) {
  return (
    <CenterOverlayContainer
      loadData={loadData}
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


