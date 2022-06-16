import React from "react";
import PropTypes from "prop-types";
import TerraformCloudWorkspacesPanel from "./tool_jobs/terraform_cloud/workspaces/TerraformCloudWorkspacesPanel";

function ToolWorkspacesPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "terraform-cloud":
        return (
          <TerraformCloudWorkspacesPanel
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolId={toolData.id}
            loadData={loadData}
            toolData={toolData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Workspaces are not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }

    return getPanel(toolData?.getData("tool_identifier")?.toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Managed Terraform Cloud Workspaces</div>
        <div className="mb-3">Use this feature to manage terraform cloud workspaces.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolWorkspacesPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolWorkspacesPanel;
