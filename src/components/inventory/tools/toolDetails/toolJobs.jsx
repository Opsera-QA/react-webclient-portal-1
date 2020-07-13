import React, { useState, useEffect } from "react";
import JenkinJobs from "./toolJobs/jenkins/jenkins.jsx";
import PropTypes from "prop-types";

function ToolJobs(props) {
  return (
    <>
      {props.toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinJobs /> : null }
      {props.toolData.tool_identifier.toLowerCase() !== "jenkins" ? <div className="text-center p-5 text-muted mt-5">Tool jobs: create / manage coming soon</div>  : null }
    </>
  );
}

ToolJobs.propTypes = {
  toolData: PropTypes.object
};


export default ToolJobs;
