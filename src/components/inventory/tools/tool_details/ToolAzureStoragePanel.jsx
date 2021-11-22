import React from "react";
import AzureStorage from "./tool_jobs/azureV2/storage/AzureStorage";
import PropTypes from "prop-types";

function ToolAzureStoragePanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "azure_storage":
        return (
          <AzureStorage
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Azure Storage is not currently available for this tool.
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
        <div className="mb-3">Use this feature to connect Azure Storage accounts.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolAzureStoragePanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolAzureStoragePanel;
