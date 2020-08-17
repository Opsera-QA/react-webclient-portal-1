import React, { useState, useEffect } from "react";
import JenkinsJobs from "./tool_jobs/jenkins/jobs/JenkinsJobs.jsx";
import PropTypes from "prop-types";

function ToolJobsPanel({ toolData, loadData }) {

  const getJobsPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
    case "jenkins":
      return <JenkinsJobs toolData={toolData} loadData={loadData}/>;
    default:
      return <div className="text-center p-5 text-muted mt-5">Opsera jobs management is not currently available for this
        tool.</div>;
    }
  };


  return (
    <>
      <div className="text-muted p-2">
        <div className="h6">Opsera Managed Jobs Creation</div>
        <div className="mb-3">Create settings for custom jobs to be triggered in Pipeline steps (when configuring a
          pipeline). These settings can be entered once and reused across the Opsera platform.
        </div>
        {toolData && getJobsPanel(toolData["tool_identifier"].toLowerCase(), loadData)}
      </div>
    </>
  );
}

ToolJobsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
};


export default ToolJobsPanel;
