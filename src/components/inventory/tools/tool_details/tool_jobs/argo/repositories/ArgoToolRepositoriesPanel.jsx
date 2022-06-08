import React, {useContext, useEffect, useState} from "react";
import ArgoRepositoryTable from "./ArgoRepositoryTable";
import PropTypes from "prop-types";
import ArgoRepositoryOverlay from "./ArgoRepositoryOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import ArgoRepositoryEditorPanel from "./details/ArgoRepositoryEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoRepositoryMetadata from "../argo-repository-metadata";

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
    const argoRepository = toolData?.getArrayData("repositories")[row?.index];
    setArgoModel({...modelHelpers.parseObjectIntoModel(argoRepository, argoRepositoryMetadata)});
  };

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoRepositoryEditorPanel
        argoRepositoryData={argoModel}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        repoId={argoModel?.getMongoDbId()}
      />
    );
  }

  return (
    <ArgoRepositoryTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
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
