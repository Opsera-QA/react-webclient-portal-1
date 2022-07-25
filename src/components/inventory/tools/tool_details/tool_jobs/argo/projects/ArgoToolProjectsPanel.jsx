import React, {useEffect, useState} from "react";
import ArgoToolProjectsTable from "components/inventory/tools/tool_details/tool_jobs/argo/projects/ArgoToolProjectsTable";
import PropTypes from "prop-types";
import ArgoProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/details/ArgoProjectEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-project-metadata";

// TODO: This whole section is very old and needs to be updated to current standards.
function ArgoToolProjectsPanel({ toolData, loadData, isLoading, toolActions }) {
  const [argoProjects, setArgoProjects] = useState([]);
  const [argoModel, setArgoModel] = useState(undefined);

  useEffect(() => {
    unpackProjs();
  }, [toolActions]);

  // TODO: Don't do this.
  const unpackProjs = () => {
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
    const argoToolProject = argoProjects[row?.index];
    const argoToolProjectModel = modelHelpers.parseObjectIntoModel(argoToolProject, argoProjectMetadata);
    setArgoModel({...argoToolProjectModel});
  };

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoProjectEditorPanel
        argoProjectData={argoModel}
        toolId={toolData?.getMongoDbId()}
        loadData={loadData}
        handleClose={closePanel}
      />
    );
  }

  return (
    <ArgoToolProjectsTable
      isLoading={isLoading}
      toolId={toolData?.getMongoDbId()}
      hasConfigurationDetails={toolData?.hasConfigurationDetailsSet()}
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
