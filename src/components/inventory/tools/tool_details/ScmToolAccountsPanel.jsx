import React from 'react';
import PropTypes from "prop-types";
import ScmAccounts from "./tool_jobs/common/accounts/ScmAccounts";

function ScmToolAccountsPanel ({ toolData, setToolData, loadData }) {

    const getAccountPanel = (toolIdentifier, loadData) => {
        switch (toolIdentifier) {
          case "gitlab":
          case "github":
          case "bitbucket":
            return <ScmAccounts toolData={toolData} setToolData={setToolData} loadData={loadData}/>;
          default:
            return <div className="text-center p-5 text-muted mt-5">Account management is not currently available for this tool.</div>;
        }
    };

    return (
        <>
            <div className="text-muted p-3">
                <div className="h6">Account Creation</div>
                <div className="mb-3">Register account credentials for auto approving merge requests.</div>
                {toolData && getAccountPanel(toolData["tool_identifier"].toLowerCase(), loadData)}
            </div>
        </>
    );
}

ScmToolAccountsPanel.propTypes = {
    toolData: PropTypes.object,
    setToolData: PropTypes.func,
    loadData: PropTypes.func
};

export default ScmToolAccountsPanel;