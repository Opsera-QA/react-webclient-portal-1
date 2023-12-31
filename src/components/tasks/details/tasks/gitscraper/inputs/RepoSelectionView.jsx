import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { faGit } from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import { bitbucketActions } from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";
import { Button } from "react-bootstrap";
import { faArrowDown } from "@fortawesome/pro-light-svg-icons";
import InfoText from "components/common/inputs/info_text/InfoText";
import { parseError } from "components/common/helpers/error-helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";

// TODO: This and the service work need to be completely refactored.
//  We should not be manipulating objects on the front end.
//  We also should make this more similar to how RepositorySelectInput works.
const RepoSelectionView = ({
  dataObject,
  setDataObject,
  service,
  gitToolId,
  fieldName,
  workspace,
  textField,
  valueField,
  disabled
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(undefined);
  const [disableSearch, setDisableSearch] = useState(false);
  const [selectedRepositories, setSelectedRepositories] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    const source = axios.CancelToken.source();
    setRepositories([]);

    if (dataObject) {
      setSelectedRepositories(dataObject?.getArrayData("reposToScan"));
    }

    if (
      !disabled
      && isMongoDbId(gitToolId) === true
      && (service !== toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET || hasStringValue(workspace) === true)
    ) {
      setIsLoading(true);
      loadData(source).then((loaded) => {
        if (isMounted?.current === true && loaded !== false) {
          setIsLoading(false);
        }
      }).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
    };
  }, [gitToolId, service, disabled, workspace, searchTerm]);

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
        toastContext.showInlineErrorMessage(error);
      }
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

  const loadAllData = async (cancelSource) => {
    try {
      setIsLoading(true);
      setDisableSearch(true);
      setRepositories([]);
      setError(undefined);

      switch (service) {
        case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
          await loadAllBitbucketRepositories(cancelSource);
          break;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
          await loadAllGitlabRepositories(cancelSource);
          break;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
          await loadAllGithubRepositories(cancelSource);
          break;
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
        setDisableSearch(false);
      }
    }
  };

  const loadAllBitbucketRepositories = async (
    cancelSource,
  ) => {
    const response =
      await bitbucketActions.getRepositoriesFromBitbucketInstanceV2(
        getAccessToken,
        cancelSource,
        gitToolId,
        workspace,
      );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const loadAllGitlabRepositories = async (cancelSource) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV2(
      getAccessToken,
      cancelSource,
      gitToolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const loadAllGithubRepositories = async (cancelSource) => {
    const response = await githubActions.getRepositoriesFromGithubInstanceV2(
      getAccessToken,
      cancelSource,
      gitToolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);
    }
  };

  const lazyLoadSearchFunction = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const searchFunction = (item, newSearchTerm) => {
    if (hasStringValue(newSearchTerm) !== true) {
      return true;
    }

    return item?.repository?.toLowerCase()?.includes(newSearchTerm?.toLowerCase());
  };

  //TODO: We should be just passing the entire objects in ListInputBase BUT I don't want to break compatibility.
  const setDataFunction = (fieldName, newRepositoryList) => {
    const reposToScan = dataObject?.getArrayData("reposToScan");
    const newReposToScan = [];

    if (Array.isArray(newRepositoryList)) {
      for (let selectedRepository of newRepositoryList) {
        const inArray = reposToScan.find((repository) => repository?.repoId === selectedRepository);

        if (inArray != null) {
          newReposToScan.push(inArray);
          continue;
        }

        const foundInRepositories = repositories.find((repository) => repository?.repoId === selectedRepository);

        if (foundInRepositories != null) {
          newReposToScan.push(foundInRepositories);
        }
      }

      dataObject.setData("repositories", newRepositoryList);
      dataObject.setData("reposToScan", newReposToScan);
      setSelectedRepositories([...newReposToScan]);
      setRepositories([...repositories]); //TODO: Investigate why side by side lists need to be forced to reload
      setDataObject({ ...dataObject });
    }
  };

  const getLimitationMessage = () => {
    if (
      isMongoDbId(gitToolId) === true
      && (service !== toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET || hasStringValue(workspace) === true)
    ) {
      return (
        <>
          <Col xs={12}>
            The initial list of repositories is limited to 100. To find a specific repository, please use the search input.
          </Col>
          {/* Use the button below to attempt to pull all repositories.*/}
          {/*<Col xs={12} className={"mt-2"}>*/}
          {/*  <Button*/}
          {/*    variant={"secondary"}*/}
          {/*    disabled={isLoading || disabled}*/}
          {/*    onClick={() => loadAllData(cancelTokenSource)}*/}
          {/*  >*/}
          {/*    <span><IconBase icon={faArrowDown} className={"mr-1"}/>Pull All Repositories</span>*/}
          {/*  </Button>*/}
          {/*</Col>*/}
        </>
      );
    }
  };

  if (dataObject == null) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Data"}
      />
    );
  }

  const customTemplate = (item) => {
    return `
        <div>
            <div>${item?.nameSpacedPath ? item?.nameSpacedPath : item?.repository}</div>
        </div>
    `;
  };

  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          height={"40vh"}
          fieldName={"repositories"}
          selectOptions={repositories}
          dataObject={dataObject}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
          showSelectAllButton={true}
          showClearValueButton={true}
          valueField={valueField}
          textField={textField}
          isLoading={isLoading}
          icon={faGit}
          customTemplate={customTemplate}
          disabled={disabled}
          noDataMessage={"No Repositories Found"}
          lazyLoadSearchFunction={lazyLoadSearchFunction}
          disableSearch={disableSearch}
        />
      </Col>
      <Col lg={6}>
        <ListInputBase
          height={"40vh"}
          customTitle={"Selected Repositories"}
          fieldName={"repositories"}
          selectOptions={selectedRepositories}
          dataObject={dataObject}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
          noDataMessage={"No Repositories Selected"}
          valueField={valueField}
          textField={textField}
          searchFunction={searchFunction}
          icon={faGit}
          customTemplate={customTemplate}
          disabled={isLoading || dataObject?.getArrayData("reposToScan")?.length === 0}
        />
      </Col>
      <Col xs={12}>
        <InfoText errorMessage={error} />
      </Col>
      {getLimitationMessage()}
    </Row>
  );
};

RepoSelectionView.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  workspace: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  disabled: PropTypes.bool
};

RepoSelectionView.defaultProps = {
  valueField: "repoId",
  textField: "repository",
  disabled: false,
  fieldName: "reposToScan",
};

export default RepoSelectionView;
