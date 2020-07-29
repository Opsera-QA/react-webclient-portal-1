import React, { useState, useEffect } from "react";
import JenkinJobs from "./toolJobs/jenkins.jsx";
import PropTypes from "prop-types";

function ToolJobs({ toolData }) {
  return (
    <>
      <div className="text-muted mt-4 mx-4 mb-3">
        <div className="h6">Opsera Managed Job and Account Creation</div>
        Manage your tool&apos;s Jobs and Accounts in one location.  Save settings for custom jobs to be triggered in Pipeline steps (when configuring a pipeline) or create accounts to support those jobs right here. These settings can be entered once and reused across the Opsera platform.
      </div>

      {toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinJobs toolData={toolData}/>
        :
        <div className="text-center p-5 text-muted mt-5">Opsera managed job creation is not currently available for this tool.</div>}
    </>
  );
}

ToolJobs.propTypes = {
  toolData: PropTypes.object
};


export default ToolJobs;
