import React from "react";
import PropTypes from "prop-types";
import SidePanelContainer from "components/common/panels/side_panel/SidePanelContainer";

function CreateSidePanel({ children, titleIcon, objectType, showPanel, closePanel, loadData}) {
  return (
    <SidePanelContainer
      loadData={loadData}
      closePanel={closePanel}
      showPanel={showPanel}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
    >
      {children}
    </SidePanelContainer>
  );
}

CreateSidePanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default CreateSidePanel;


