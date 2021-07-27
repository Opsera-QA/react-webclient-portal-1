import React, {useContext, useEffect, useRef, useState} from "react";
import AzureApplicationsTable from "./AzureApplicationsTable";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import AzureApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/azure/applications/AzureApplicationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function AzureApplications({ toolData, loadData, isLoading, toolApplications }) {
  const toastContext = useContext(DialogToastContext);
  const [azureApplications, setAzureApplications] = useState([]);

  useEffect(() => {
    unpackApplications(toolApplications);
  }, [toolApplications]);

  const unpackApplications = (toolApplications) => {
    const newApplicationList = [];

    if (Array.isArray(toolApplications)) {
      toolApplications.forEach((toolAction, index) => {
        let application = toolAction?.configuration;
        application = {...application, applicationId: toolAction?._id};
        application = {...application, index: index};
        newApplicationList?.push(application);
      });
    }

    setAzureApplications(newApplicationList);
  };

  const onRowSelect = (grid, row) => {
    let selectedRow = toolData?.getArrayData("actions")[row?.index];
    toastContext.showOverlayPanel(
      <AzureApplicationOverlay
        azureDataObject={selectedRow?.configuration}
        applicationId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  return (
    <AzureApplicationsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      azureApplications={azureApplications}
    />
  );
}

AzureApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolApplications: PropTypes.array
};
export default AzureApplications;
