import React from "react";
import ArgoToolApplicationsPanel from "components/inventory/tools/tool_details/tool_jobs/argo/applications/ArgoToolApplicationsPanel";
import OctopusToolApplicationsPanel from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/OctopusToolApplicationsPanel";
import PropTypes from "prop-types";
import AzureApplications from "./tool_jobs/azureV2/applications/AzureApplications";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function ToolApplicationsPanel({ toolData, setToolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return (
          <ArgoToolApplicationsPanel
            toolData={toolData}
          />
        );
      case "octopus":
        return (
          <OctopusToolApplicationsPanel
            toolData={toolData}
          />
        );
      case "azure":
        return (
          <AzureApplications
            toolApplications={toolData?.getData("applications")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Application management is not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }

    return getPanel(toolData["tool_identifier"].toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted">
        <div className={"ml-1 mt-3"}>
          <div className="h6">
            Managed Application Creation
          </div>
          <div className="mb-3">
            Use this feature to create applications in the managed tool.
          </div>
        </div>
        {getBody()}
      </div>
    </>
  );
}

ToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolApplicationsPanel;
