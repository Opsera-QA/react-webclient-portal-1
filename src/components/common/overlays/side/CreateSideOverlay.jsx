import React from "react";
import PropTypes from "prop-types";
import SideOverlayContainer from "components/common/overlays/side/SideOverlayContainer";

function CreateSideOverlay({ children, titleIcon, objectType, showPanel, closePanel, loadData}) {
  return (
    <SideOverlayContainer
      loadData={loadData}
      closePanel={closePanel}
      showPanel={showPanel}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
      rightSide={true}
    >
      {children}
    </SideOverlayContainer>
  );
}

CreateSideOverlay.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default CreateSideOverlay;


