import React from "react";
import PropTypes from "prop-types";
import CenterPanelContainer from "components/common/panels/center_panel/CenterPanelContainer";

function CreateCenterPanel({ children, titleIcon, objectType, showPanel, closePanel, loadData}) {
  return (
    <CenterPanelContainer
      loadData={loadData}
      closePanel={closePanel}
      showPanel={showPanel}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
    >
      {children}
    </CenterPanelContainer>
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


