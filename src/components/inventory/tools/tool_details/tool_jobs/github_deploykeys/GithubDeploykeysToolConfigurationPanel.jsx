import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import GithubDeployKeysTable from "./GithubDeployKeysTable";
import PropTypes from "prop-types";
import GithubDeployKeysEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/details/GithubDeployKeysEditorPanel";
import githubDeployKeyMetadata from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/github-deploykeys-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import useGetRegistryToolModelById from "components/inventory/tools/hooks/useGetRegistryToolModelById";

function GithubDeploykeysToolConfigurationPanel({ toolData }) {
  const { id } = useParams();
  const [githubDeployKeyData, setGithubDeployKeyData] = useState(undefined);
  const [selectedDeployKeysData, setSelectedDeployKeysData] = useState(undefined);
  const [githubDeployKeys, setGithubDeployKeys] = useState(undefined);
  // TODO: We should just be using the model passed in. Leaving this for now.
  const {
    toolModel,
    setToolModel,
    isLoading,
    loadData,
  } = useGetRegistryToolModelById(id);

  useEffect(() => {
    if (toolModel) {
      unpackRepositories(toolModel.getPersistData()?.repositories);
    }
  }, [toolModel]);

  useEffect(() => {
    initializeModel();
  }, [selectedDeployKeysData]);
  
  const unpackRepositories = (repoData) => {
    const newKeyList = [];
    if (Array.isArray(repoData)) {
      repoData.forEach((repoData, index) => {
        let repo = repoData?.configuration;
        repo = {...repo, repoId: repoData?._id};
        repo = {...repo, index: index};
        newKeyList?.push(repo);
      });
    }
    setGithubDeployKeys(newKeyList);
  };

  const onRowSelect = (grid, row) => {
    // console.log("on row clicked ", row?.index);
    let selectedRow = toolModel?.getArrayData("repositories")[row?.index];
    setSelectedDeployKeysData(selectedRow);
  };

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(selectedDeployKeysData?.configuration, githubDeployKeyMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setGithubDeployKeyData({...parsedModel});
  };

  const closePanelFunction = async () => {
    setSelectedDeployKeysData(null);
  };

  if(selectedDeployKeysData != null) {
    return (
      <GithubDeployKeysEditorPanel
        githubDeployKeyData={githubDeployKeyData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanelFunction}
        repoId={selectedDeployKeysData?._id}
        loadDeployKeys={loadData}
      />
    );
  }

  return (
    <GithubDeployKeysTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      githubDeployKeys={githubDeployKeys}
    />
  );
}

GithubDeploykeysToolConfigurationPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default GithubDeploykeysToolConfigurationPanel;
