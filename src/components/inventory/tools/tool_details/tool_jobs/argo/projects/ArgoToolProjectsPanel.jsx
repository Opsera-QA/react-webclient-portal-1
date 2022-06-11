import React, {useContext, useEffect, useRef, useState} from "react";
import ArgoProjectTable from "./ArgoProjectTable";
import PropTypes from "prop-types";
import CreateArgoProjectOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/CreateArgoProjectOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import ArgoProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/details/ArgoProjectEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-project-metadata";

// TODO: This needs to be rewritten
function ArgoToolProjectsPanel({ toolData, loadData, isLoading, toolActions }) {
  const [argoProjects, setArgoProjects] = useState([]);
  const [argoModel, setArgoModel] = useState(undefined);

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
    const argoProject = toolData?.getArrayData("projects")[row?.index];
    setArgoModel({...modelHelpers.parseObjectIntoModel(argoProject, argoProjectMetadata)});
  };

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoProjectEditorPanel
        argoProjectData={argoModel}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        projId={argoModel?.getMongoDbId()}
      />
    );
  }

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

ArgoToolProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};

export default ArgoToolProjectsPanel;
