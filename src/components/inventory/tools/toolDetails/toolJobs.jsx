import React, { useState, useEffect } from "react";
import JenkinJobs from "./toolJobs/jenkins.jsx";
import PropTypes from "prop-types";

function ToolJobs(props) {
  return (
    <>
      <div className="text-muted mx-4 mt-3">Save settings for custom jobs here.  These settings can then be re-used in pipeline steps to create jobs.  In OpsERA, 
    managed jobs are created at the step level in pipeline.</div>
      {props.toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinJobs {...props} /> : null }
      {props.toolData.tool_identifier.toLowerCase() !== "jenkins" ? <div className="text-center p-5 text-muted mt-5">Tool jobs: create / manage coming soon</div>  : null }
    </>
  );
}

ToolJobs.propTypes = {
  toolData: PropTypes.object
};


export default ToolJobs;
