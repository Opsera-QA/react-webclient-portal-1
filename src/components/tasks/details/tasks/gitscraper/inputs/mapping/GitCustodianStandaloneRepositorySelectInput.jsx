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

const GitCustodianStandaloneRepositorySelectInput = ({ value,  disabled, setDataFunction, service, gitToolId, workspace, selectedRepositories }) => {
  
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    if (!disabled && isMongoDbId(gitToolId) === true && hasStringValue(service) && 
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
  }, [service, gitToolId, workspace, searchTerm]);

  const loadData = async (cancelSource) => {
    try {
      setError(undefined);
      setIsLoading(true);

      switch (service) {
        case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
          return await loadBitbucketRepositories(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
          return await loadGitlabRepositories(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
          return await loadGithubRepositories(cancelSource);
        case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS:
          return await loadAzureRepositories(cancelSource);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);        
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatRepoData = async (repositories) => {
    let formattedRepos = [];
    for (let item in repositories) {
      let selectedOption = repositories[item];
      formattedRepos.push(
        {
          repository: selectedOption?.name,
          nameSpacedPath: selectedOption?.nameSpacedPath || selectedOption?.name,
          repoId: selectedOption?.id || selectedOption?.repositoryId || "",
          projectId: selectedOption?.projectId || selectedOption?.id || selectedOption?.repositoryId || "",
          sshUrl: selectedOption?.sshUrl || "",
          gitUrl: selectedOption?.httpUrl || selectedOption?.remoteUrl || "",
        }
      );
    }
    return formattedRepos;
  };

  const loadBitbucketRepositories = async (
    cancelSource,
  ) => {
    const response = await bitbucketActions.getRepositoriesFromBitbucketInstanceV3(
      getAccessToken,
      cancelSource,
      gitToolId,
      workspace,
      searchTerm,
      100,
    );

    if (response == null) {
      return false;
    }

    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const loadGithubRepositories = async (cancelSource) => {
    const response = await githubActions.getRepositoriesFromGithubInstanceV3(
      getAccessToken,
      cancelSource,
      gitToolId,
      searchTerm,
      100,
    );

    if (response == null) {
      return false;
    }

    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const loadGitlabRepositories = async (cancelSource) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV3(
      getAccessToken,
      cancelSource,
      searchTerm,
      gitToolId,
      100,
    );

    if (response == null) {
      return false;
    }

    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const loadAzureRepositories = async (cancelSource) => {
    const response = await azureActions.getRepositoriesFromAzureInstanceV2(
        getAccessToken,
        cancelSource,
        gitToolId,
        searchTerm,
        100,
    );

    if (response == null) {
      return false;
    }

    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const lazyLoadSearchFunction = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <StandaloneSelectInput
      selectOptions={repositories.filter(repo => !selectedRepositories.includes(repo.repository))}
      value={value}
      busy={isLoading}
      placeholderText="Select Repository"
      setDataFunction={(data) => setDataFunction(data)}
      valueField={"repository"}
      textField={"repository"}
      onSearchFunction={lazyLoadSearchFunction}
    />
  );
};

GitCustodianStandaloneRepositorySelectInput.propTypes = {
  gitToolId: PropTypes.string,
  service: PropTypes.string,
  workspace: PropTypes.string,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  selectedRepositories: PropTypes.array,
};

export default GitCustodianStandaloneRepositorySelectInput;
