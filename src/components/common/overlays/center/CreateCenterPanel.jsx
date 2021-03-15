import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function CreateCenterPanel({ children, titleIcon, objectType, closePanel}) {

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
    >
      {children}
    </CenterOverlayContainer>
  );
}

CreateCenterPanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
};

export default CreateCenterPanel;


