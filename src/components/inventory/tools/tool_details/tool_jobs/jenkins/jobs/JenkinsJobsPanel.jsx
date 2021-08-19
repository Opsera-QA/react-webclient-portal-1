import React, { useState } from "react";
import JenkinsJobsTable from "./JenkinsJobsTable";
import JenkinsJobEditorPanel from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobEditorPanel";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsJobMetadata from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/jenkins-job-metadata";

function JenkinsJobsPanel({ toolData, setToolData, loadData, isLoading }) {
  const [jenkinsJobModel, setJenkinsJobModel] = useState(undefined);

  const selectedJobRow = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, JenkinsJobMetadata);
    setJenkinsJobModel({...parsedModel});
  };

  const togglePanel = () => {
    setJenkinsJobModel(null);
  };

  const getBody = () => {
    if (jenkinsJobModel != null) {
      return (
        <JenkinsJobEditorPanel
          toolData={toolData}
          handleClose={togglePanel}
          jenkinsJobModel={jenkinsJobModel}
          setJenkinsJobModel={setJenkinsJobModel}
          loadData={loadData}
        />
      );
    }

    return (
      <JenkinsJobsTable
        setToolData={setToolData}
        isLoading={isLoading}
        toolData={toolData}
        loadData={loadData}
        onRowSelect={selectedJobRow}
      />
    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

JenkinsJobsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  setToolData: PropTypes.func,
};

export default JenkinsJobsPanel;
