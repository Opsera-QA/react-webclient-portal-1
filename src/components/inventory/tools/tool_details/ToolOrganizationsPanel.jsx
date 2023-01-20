import React from "react";
import PropTypes from "prop-types";
import TerraformCloudOrganizationsPanel from "./tool_jobs/terraform_cloud/organizations/TerraformCloudOrganizationsPanel";

function ToolOrganizationsPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "terraform-cloud":
        return (
          <TerraformCloudOrganizationsPanel
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
            Organizations are not currently available for this tool.
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
        <div className="h6">Managed Tool Organizations</div>
        <div className="mb-3">Use this feature to handle organizations in the managed tool.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolOrganizationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolOrganizationsPanel;
