import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useParams} from "react-router-dom";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolModel from "components/inventory/tools/tool.model";
import GithubDeployKeysTable from "./GithubDeployKeysTable";
import PropTypes from "prop-types";
import GithubDeployKeysEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/details/GithubDeployKeysEditorPanel";
import GithubDeployKeyOverlay
  from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/GithubDeployKeyOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import githubDeployKeyMetadata from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/github-deploykeys-metadata";
import modelHelpers from "components/common/model/modelHelpers";

function GithubDeploykeysToolConfigurationPanel({ toolData }) {
  const toastContext = useContext(DialogToastContext);
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [deploykeysDataDto, setDeployKeysDataDto] = useState(undefined);
  const [githubDeployKeyData, setGithubDeployKeyData] = useState(undefined);
  const [selectedDeployKeysData, setSelectedDeployKeysData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [githubDeployKeys, setGithubDeployKeys] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeModel();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedDeployKeysData]);
  

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTool(cancelSource);
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTool = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, id);
    const tool = response?.data?.data;

    if (isMounted?.current === true && tool) {
      const metadata = response?.data?.metadata;
      const roleDefinitions = response?.data?.roles;
      const userRecord = await getUserRecord();
      const customerAccessRules = await setAccessRoles(userRecord);
      const toolModel = new ToolModel(tool, metadata, false, getAccessToken, cancelTokenSource, loadData, customerAccessRules, roleDefinitions);
      setDeployKeysDataDto(toolModel);
      unpackRepos(toolModel.getPersistData()?.repositories);
    }
  };
  
  const unpackRepos = (repoData) => {
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
    let selectedRow = deploykeysDataDto?.getArrayData("repositories")[row?.index];
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
    await loadData();
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
