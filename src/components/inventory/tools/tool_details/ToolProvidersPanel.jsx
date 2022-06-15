import React from "react";
import PropTypes from "prop-types";
import TerraformProvidersPanel from "./tool_jobs/terraform_cloud/providers/TerraformProvidersPanel";

function ToolProvidersPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "terraform-cloud":
        return (
          <TerraformProvidersPanel
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
            Providers are not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }

    return getPanel(toolData.getPersistData()?.tool_identifier?.toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Managed Terraform VCS Providers</div>
        <div className="mb-3">Use this feature to manage terraform VCS providers.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolProvidersPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolProvidersPanel;
