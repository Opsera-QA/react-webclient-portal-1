import React from "react";
import PropTypes from "prop-types";
import GitToolPathsPanel from "components/inventory/tools/tool_details/paths/git/GitToolPathsPanel";

function ToolPathsPanel({toolData}) {
  const getPathsPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
      case "gitlab":
      case "github":
        return (
          <GitToolPathsPanel
            toolData={toolData}
            toolId={toolData?.getData("_id")}
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

  if (toolData == null) {
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
  toolData: PropTypes.object,
};


export default ToolPathsPanel;
