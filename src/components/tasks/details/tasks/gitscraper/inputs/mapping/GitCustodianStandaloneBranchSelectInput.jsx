import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { bitbucketActions } from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { parseError } from "components/common/helpers/error-helpers";

const GitCustodianStandaloneBranchSelectInput = ({ value,  disabled, setDataFunction, service, gitToolId, workspace, repositoryId, setErrorMessage }) => {
  
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    if (!disabled && isMongoDbId(gitToolId) === true && hasStringValue(service) && hasStringValue(repositoryId) && 
      (service !== toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET || hasStringValue(workspace) === true)) 
    {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [service, gitToolId, workspace, repositoryId, searchTerm]);

  const loadData = async (cancelSource) => {
    try {
      setError(undefined);
      setErrorMessage("");
      setIsLoading(true);

      switch (service) {
        case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
          return await loadBitbucketBranches(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
          return await loadGitlabBranches(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
          return await loadGithubBranches(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS:
          return await loadAzureBranches(cancelSource);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);
        setErrorMessage(parsedError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadBitbucketBranches = async (
    cancelSource,
  ) => {
    const response = await bitbucketActions.getBranchesFromBitbucketInstanceV3(
      getAccessToken,
      cancelSource,
      gitToolId,
      workspace,
      repositoryId,
      searchTerm,
    );

    if (response == null) {
      return false;
    }

    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBranches(branches);
    }
  };

  const loadGithubBranches = async (cancelSource) => {
    const response = await githubActions.getBranchesFromGithubInstanceV3(
      getAccessToken,
      cancelSource,
      gitToolId,
      repositoryId,
      searchTerm,
    );

    if (response == null) {
      return false;
    }

    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBranches(branches);
    }
  };

  const loadGitlabBranches = async (cancelSource) => {
    const response = await gitlabActions.getBranchesFromGitlabInstanceV3(
      getAccessToken, 
      cancelSource, 
      gitToolId, 
      repositoryId, 
      searchTerm
    );

    if (response == null) {
      return false;
    }

    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBranches(branches);
    }
  };

  const loadAzureBranches = async (cancelSource) => {
    const response = await azureActions.getBranchesFromAzureInstanceV2(
      getAccessToken,
      cancelSource,
      gitToolId,
      repositoryId,
      searchTerm,
    );

    if (response == null) {
      return false;
    }

    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBranches(branches);
    }
  };

  const lazyLoadSearchFunction = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <StandaloneSelectInput
      selectOptions={branches}
      value={value}
      busy={isLoading}
      placeholderText="Select Branch"
      setDataFunction={(data) => setDataFunction(data)}
      valueField={"name"}
      textField={"name"}
      onSearchFunction={lazyLoadSearchFunction}
      hasErrorState={hasStringValue(error) === true}
      disabled={disabled}
    />
  );
};

GitCustodianStandaloneBranchSelectInput.propTypes = {
  gitToolId: PropTypes.string,
  service: PropTypes.string,
  repositoryId: PropTypes.string,
  workspace: PropTypes.string,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default GitCustodianStandaloneBranchSelectInput;
