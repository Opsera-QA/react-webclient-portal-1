import React from "react";
import JenkinsJobsPanel from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/JenkinsJobsPanel.jsx";
import PropTypes from "prop-types";

function ToolJobsPanel({ toolData, toolIdentifier }) {
  const getJobsPanel = () => {
    switch (toolIdentifier) {
    case "jenkins":
      return (
        <JenkinsJobsPanel
          toolData={toolData}
          toolId={toolData?.getData("_id")}
        />
      );
    default:
      return (
        <div className="text-center p-5 text-muted mt-5">
          Jobs management is not currently available for this tool.
        </div>
      );
    }
  };


  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Managed Jobs Creation</div>
        <div className="mb-3">Create settings for custom jobs to be triggered in Pipeline steps (when configuring a
          pipeline). These settings can be entered once and reused across the Opsera platform.
        </div>
        {getJobsPanel()}
      </div>
    </>
  );
}

ToolJobsPanel.propTypes = {
  toolData: PropTypes.object,
  toolIdentifier: PropTypes.string,
};


export default ToolJobsPanel;
