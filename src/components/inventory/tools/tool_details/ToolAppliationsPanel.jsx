import React, { useState, useEffect } from "react";
import ArgoApplications from "./tool_jobs/argo/applications/ArgoApplications"
import PropTypes from "prop-types";

function ToolApplicationsPanel({ toolData, loadData, isLoading }) {

  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
    case "argo":
      return <ArgoApplications isLoading={isLoading} toolData={toolData} loadData={loadData}/>;
    default:
      return <div className="text-center p-5 text-muted mt-5">Application management is not currently available for this
        tool.</div>;
    }
  };


  /*TODO: Shrey, please work with Noah to finish stubbing out this code.  I started copying the /tool_jobs/jenkins/jobs
  *  content into this argo/applications folder.  Obciously you're going to need to go through and rename evyerthing to
  *  make it work as it's own tab/UI before you can even start creating the form.  Noah can help guide you on what to use
  *  and how to set this up.  The jenkins/jobs stuff needs to be cleaned up though, so just know that's not the best example
  *  but Noah can explain more. */

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Managed Application Creation</div>
        <div className="mb-3">Use this feature to create applications in the managed tool.
        </div>
        {toolData && getPanel(toolData["tool_identifier"].toLowerCase(), loadData)}
      </div>
    </>
  );
}

ToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolApplicationsPanel;