import React from "react";
import PropTypes from "prop-types";
import JenkinsToolAccounts from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/JenkinsToolAccounts";
import ScmAccounts from "components/inventory/tools/tool_details/tool_jobs/common/accounts/ScmAccounts";

function ToolAccountsPanel({ toolData, loadData, isLoading }) {

  const getAccountPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "jenkins":
        return (
          <JenkinsToolAccounts
            toolId={toolData?.getData("_id")}
          />
        );
      case "gitlab":
      case "github":
      case "bitbucket":
        return <ScmAccounts toolData={toolData} isLoading={isLoading} loadData={loadData}/>;
      default:
        return <div className="text-center p-5 text-muted mt-5">Opsera account management is not currently available for this tool.</div>;
    }
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Opsera Managed Account Creation</div>
        <div className="mb-3">Register account credentials in the tool for use in pipelines.</div>
        {toolData && getAccountPanel(toolData["tool_identifier"].toLowerCase(), loadData)}
      </div>
    </>
  );
}

ToolAccountsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolAccountsPanel;
