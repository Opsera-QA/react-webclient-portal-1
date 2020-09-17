import React, { useState } from "react";
import ArgoApplicationEditorPanel from "./details/ArgoApplicationEditorPanel";
import ArgoApplicationsTable from "./ArgoApplicationsTable";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

function ArgoApplications({ toolData, loadData, isLoading }) {
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);

  const selectedJobRow = (rowData) => {
    setArgoApplicationData(rowData.original);
  };

  return (
    <div>
      {argoApplicationData != null
        ? <ArgoApplicationEditorPanel toolData={toolData.getPersistData()} argoApplicationData={argoApplicationData} loadData={loadData}/>
        : <ArgoApplicationsTable isLoading={isLoading} toolData={toolData} loadData={loadData} selectedRow={rowData => selectedJobRow(rowData)}/>}
    </div>
  );
}


ArgoApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default ArgoApplications;
