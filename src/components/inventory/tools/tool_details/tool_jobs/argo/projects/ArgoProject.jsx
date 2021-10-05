import React, {useContext, useEffect, useRef, useState} from "react";
import ArgoProjectTable from "./ArgoProjectTable";
import PropTypes from "prop-types";
import ArgoProjectOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/ArgoProjectOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function ArgoProject({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [argoProjects, setArgoProjects] = useState([]);

  useEffect(() => {
    unpackProjs(toolActions);
  }, [toolActions]);

  const unpackProjs = (toolActions) => {
    const newProjList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let proj = toolAction?.configuration;
        proj = {...proj, projId: toolAction?._id};
        proj = {...proj, index: index};
        newProjList?.push(proj);
      });
    }

    setArgoProjects(newProjList);
  };

  const onRowSelect = (grid, row) => {
    let selectedRow = toolData?.getArrayData("projects")[row?.index];
    toastContext.showOverlayPanel(
      <ArgoProjectOverlay
        argoDataObject={selectedRow?.configuration}
        projId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  return (
    <ArgoProjectTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoProjects={argoProjects}
    />
  );
}

ArgoProject.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};

export default ArgoProject;
