import React, {useContext, useEffect, useRef, useState} from "react";
import ArgoRepositoryTable from "./ArgoRepositoryTable";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import ArgoRepositoryOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoRepositoryOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function ArgoRepository({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [argoRepositories, setArgoRepositorie] = useState([]);

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
    let selectedRow = toolData?.getArrayData("repositories")[row?.index];
    toastContext.showOverlayPanel(
      <ArgoRepositoryOverlay
        argoDataObject={selectedRow?.configuration}
        repoId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

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

ArgoRepository.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default ArgoRepository;
