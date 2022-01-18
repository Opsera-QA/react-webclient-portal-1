import React from "react";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageField from "components/common/fields/text/MessageField";
import ArgoToolClustersPanel from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/ArgoToolClustersPanel";

function ToolClustersPanel({ toolData, loadData }) {

  const getToolClustersPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "argo":
        return (
          <ArgoToolClustersPanel
            toolData={toolData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Cluster management is not currently available for this tool.
          </div>
        );
    }
  };

  if (toolData == null) {
    return null;
  }

  return (
    <DetailPanelContainer>
      <div className="h6">Managed K8 Cluster Creation</div>
      <MessageField message={`Add, Modify or Delete K8 Clusters. These K8 Clusters can be entered once and reused across the Opsera platform.`} />
      {getToolClustersPanel(toolData["tool_identifier"].toLowerCase(), loadData)}
    </DetailPanelContainer>
  );
}

ToolClustersPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
};


export default ToolClustersPanel;
