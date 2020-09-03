import React, { useState } from "react";
import JenkinsJobEditorPanel from "./details/JenkinsJobEditorPanel";
import JenkinsJobsTable from "./JenkinsJobsTable";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

function JenkinsJobs({ toolData, loadData }) {
  const [jobData, setJobData] = useState(undefined);

  const selectedJobRow = (rowData) => {
    setJobData(rowData.original);
  };

  return (
    <div>
      {jobData != null
        ? <JenkinsJobEditorPanel toolData={toolData.getPersistData()} jobData={jobData} loadData={loadData}/>
        : <JenkinsJobsTable toolData={toolData} loadData={loadData} selectedRow={rowData => selectedJobRow(rowData)}/>}
    </div>
  );
}


JenkinsJobs.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func
};
export default JenkinsJobs;
