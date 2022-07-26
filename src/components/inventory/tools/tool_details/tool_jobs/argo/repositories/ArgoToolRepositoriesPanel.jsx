import React, {useEffect, useState} from "react";
import ArgoToolRepositoriesTable from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoToolRepositoriesTable";
import PropTypes from "prop-types";
import ArgoToolRepositoryEditorPanel from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/ArgoToolRepositoryEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoRepositoryMetadata from "../argo-repository-metadata";

// TODO: This whole section is very old and needs to be updated to current standards.
function ArgoToolRepositoriesPanel({ toolData, loadData, isLoading, toolActions }) {
  const [argoRepositories, setArgoRepositorie] = useState([]);
  const [argoModel, setArgoModel] = useState(undefined);

  useEffect(() => {
    unpackRepos(toolActions);
  }, [toolActions]);

  const unpackRepos = (toolActions) => {
    const newRepoList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let repo = toolAction?.configuration;
        repo = {...repo, repoId: toolAction?._id};
        repo = {...repo, index: index};
        newRepoList?.push(repo);
      });
    }

    setArgoRepositorie(newRepoList);
  };

  const onRowSelect = (grid, row) => {
    const argoRepository = argoRepositories[row?.index];
    const argoRepositoryModel = modelHelpers.parseObjectIntoModel(argoRepository, argoRepositoryMetadata);
    setArgoModel({...argoRepositoryModel});
  };

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoToolRepositoryEditorPanel
        argoRepositoryData={argoModel}
        toolId={toolData?.getMongoDbId()}
        handleClose={closePanel}
      />
    );
  }

  return (
    <ArgoToolRepositoriesTable
      isLoading={isLoading}
      toolId={toolData?.getMongoDbId()}
      loadData={loadData}
      onRowSelect={onRowSelect}
      hasConfigurationDetails={toolData?.hasConfigurationDetailsSet()}
      argoRepositories={argoRepositories}
    />
  );
}

ArgoToolRepositoriesPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};

export default ArgoToolRepositoriesPanel;
