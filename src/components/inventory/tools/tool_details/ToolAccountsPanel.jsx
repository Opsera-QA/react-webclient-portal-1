import React from "react";
import PropTypes from "prop-types";
import JenkinsAccounts from "./tool_jobs/jenkins/accounts/JenkinsAccounts";

function ToolAccountsPanel({ toolData, loadData }) {

  const getAccountPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "jenkins":
        return <JenkinsAccounts toolData={toolData} loadData={loadData}/>;
      default:
        return <div className="text-center p-5 text-muted mt-5">Opsera account management is not currently available for this tool.</div>
    }
  }

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
  loadData: PropTypes.func
};


export default ToolAccountsPanel;
