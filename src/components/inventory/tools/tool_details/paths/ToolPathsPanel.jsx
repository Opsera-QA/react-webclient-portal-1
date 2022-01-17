import React from "react";
import PropTypes from "prop-types";
import GitToolPathsPanel from "components/inventory/tools/tool_details/paths/git/GitToolPathsPanel";

function ToolPathsPanel({toolModel}) {
  const getPathsPanel = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case "gitlab":
      case "github":
      case "bitbucket":
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
