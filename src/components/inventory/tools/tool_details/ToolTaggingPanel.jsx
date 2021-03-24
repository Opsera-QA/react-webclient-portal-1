import React from "react";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";

function ToolTaggingPanel({ toolData }) {

  const getTaggingPanel = () => {
    if (toolData == null) {
      return null;
    }

    return <div className="text-center p-5 text-muted mt-5">Tagging is not currently available for this tool.</div>;
  };

  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      {getTaggingPanel()}
    </DetailPanelContainer>
  );
}

ToolTaggingPanel.propTypes = {
  toolData: PropTypes.object,
};

export default ToolTaggingPanel;
