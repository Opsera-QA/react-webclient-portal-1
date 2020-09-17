import React, { useState } from "react";
import JenkinsJobEditorPanel from "./details/JenkinsJobEditorPanel";
import JenkinsJobsTable from "./ArgoApplicationsTable";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

function ArgoApplications({ toolData, loadData, isLoading }) {
  const [jobData, setJobData] = useState(undefined);

  const selectedJobRow = (rowData) => {
    setJobData(rowData.original);
  };

  return (
    <div>
      {jobData != null
        ? <JenkinsJobEditorPanel toolData={toolData.getPersistData()} jobData={jobData} loadData={loadData}/>
        : <JenkinsJobsTable isLoading={isLoading} toolData={toolData} loadData={loadData} selectedRow={rowData => selectedJobRow(rowData)}/>}
    </div>
  );
}


ArgoApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default ArgoApplications;
