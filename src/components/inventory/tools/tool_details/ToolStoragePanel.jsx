import React from "react";
import AwsS3BucketsToolStoragePanel from "components/inventory/tools/tool_details/tool_jobs/aws/buckets/AwsS3BucketsToolStoragePanel";
import PropTypes from "prop-types";
import AzureToolStorageAccountsPanel
  from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage_accounts/AzureToolStorageAccountsPanel";

function ToolStoragePanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "aws_account":
        return (
          <AwsS3BucketsToolStoragePanel
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      case "azure":
        return (
          <AzureToolStorageAccountsPanel
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
            Tool Storage is not currently available for this tool.
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
      <div className="text-muted p-3">
        <div className="h6">Managed Tool Storage</div>
        <div className="mb-3">Use this feature to handle storage in the managed tool.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolStoragePanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolStoragePanel;
