import React from "react";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import ArgoToolClustersPanel from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/ArgoToolClustersPanel";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function ToolClustersPanel({ toolModel }) {

  const getToolClustersPanel = () => {
    const toolIdentifier = toolModel?.getData("tool_identifier");
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return (
          <ArgoToolClustersPanel
            toolId={toolModel?.getData("_id")}
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

  if (toolModel == null) {
    return null;
  }

  return (
    <DetailPanelContainer>
      <div className="h6">Managed K8 Cluster Creation</div>
      <MessageFieldBase message={`Manage custom clusters configurations.
        These settings can be entered once and reused across the Opsera platform.`}/>
      {getToolClustersPanel()}
    </DetailPanelContainer>
  );
}

ToolClustersPanel.propTypes = {
  toolModel: PropTypes.object,
};


export default ToolClustersPanel;
