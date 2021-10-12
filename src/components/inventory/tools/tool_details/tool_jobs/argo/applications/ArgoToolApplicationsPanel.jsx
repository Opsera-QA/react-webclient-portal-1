import React, {useContext, useEffect, useState} from "react";
import ArgoApplicationsTable from "./ArgoApplicationsTable";
import PropTypes from "prop-types";
import ArgoApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/ArgoApplicationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function ArgoToolApplicationsPanel({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [argoApplications, setArgoApplications] = useState([]);

  useEffect(() => {
    unpackApplications(toolActions);
  }, [toolActions]);

  const unpackApplications = (toolActions) => {
    const newApplicationList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let application = toolAction?.configuration;
        application = {...application, applicationId: toolAction?._id};
        application = {...application, index: index};
        newApplicationList?.push(application);
      });
    }

    setArgoApplications(newApplicationList);
  };

  const onRowSelect = (grid, row) => {
    let selectedRow = toolData?.getArrayData("actions")[row?.index];
    toastContext.showOverlayPanel(
      <ArgoApplicationOverlay
        argoDataObject={selectedRow?.configuration}
        applicationId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  return (
    <ArgoApplicationsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoApplications={argoApplications}
    />
  );
}

ArgoToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default ArgoToolApplicationsPanel;
