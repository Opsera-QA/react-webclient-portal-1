import React from "react";
import PropTypes from "prop-types";
import GitToolPathsPanel from "components/inventory/tools/tool_details/paths/git/GitToolPathsPanel";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

function ToolPathsPanel({toolModel}) {
  const getPathsPanel = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS:
        return (
          <GitToolPathsPanel
            toolModel={toolModel}
            toolId={toolModel?.getData("_id")}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Opsera paths management is not currently available for this tool.
          </div>
        );
    }
  };

  if (toolModel == null) {
    return null;
  }

  return (
    <div className="p-3">
      <div className="mb-3 text-muted">Register tool-specific paths.</div>
      {getPathsPanel()}
    </div>
  );
}

ToolPathsPanel.propTypes = {
  toolModel: PropTypes.object,
};


export default ToolPathsPanel;
