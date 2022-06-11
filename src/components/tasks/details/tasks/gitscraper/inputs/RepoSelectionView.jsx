import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { faGit } from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import { bitbucketActions } from "../../../../../inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { hasStringValue } from "../../../../../common/helpers/string-helpers";
import { githubActions } from "../../../../../inventory/tools/tool_details/tool_jobs/github/github.actions";
import { gitlabActions } from "../../../../../inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import { isMongoDbId } from "../../../../../common/helpers/mongo/mongoDb.helpers";

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
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setErrorMessage] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setRepositories([]);

    if (isMongoDbId(gitToolId) === true && !disabled) {
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
  }, [gitToolId, service, disabled, workspace]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (service === "bitbucket") {
        await loadBitbucketRepositories(cancelSource);
      }

      if (service === "gitlab") {
        await loadGitlabRepositories(cancelSource);
      }

      if (service === "github") {
        await loadGithubRepositories(cancelSource);
      }
    } catch (error) {
      console.error("Error getting API Data: ", error);

      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
      setErrorMessage(error);
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
          repoId: selectedOption?.id || selectedOption?.repositoryId || "",
          projectId: selectedOption?.id || selectedOption?.repositoryId || "",
          sshUrl: selectedOption?.sshUrl || "",
          gitUrl: selectedOption?.httpUrl || selectedOption?.remoteUrl || "",
        }
      );
    }
    return formattedRepos;
  };

  const loadBitbucketRepositories = async (
    cancelSource = cancelTokenSource,
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

      const existingRepository = dataObject?.getData(fieldName);

      if (hasStringValue(existingRepository) === true) {
        const existingRepositoryExists = repositories.find(
          (repository) => repository[valueField] === existingRepository,
        );

        if (existingRepositoryExists == null) {
          setErrorMessage(
            "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
          );
        }
      }
    }
  };

  const loadGithubRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await githubActions.getRepositoriesFromGithubInstanceV2(
      getAccessToken,
      cancelSource,
      gitToolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);

      const existingRepository = dataObject?.getData(fieldName);

      if (hasStringValue(existingRepository) === true) {
        const existingRepositoryExists = repositories.find(
          (repository) => repository[valueField] === existingRepository,
        );

        if (existingRepositoryExists == null) {
          setErrorMessage(
            "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
          );
        }
      }
    }
  };

  const loadGitlabRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV2(
      getAccessToken,
      cancelSource,
      gitToolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([...await formatRepoData(repositories)]);

      const existingRepository = dataObject?.getData(fieldName);

      if (hasStringValue(existingRepository) === true) {
        const existingRepositoryExists = repositories.find(
          (repository) => repository[valueField] === existingRepository,
        );

        if (existingRepositoryExists == null) {
          setErrorMessage(
            "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
          );
        }
      }
    }
  };

  const searchFunction = (item, searchTerm) => {
    return item?.repository?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  };

  const getSelectedOptions = () => {
    let selectedArray = [];
    let selectedOptions = dataObject.getData("repositories");
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      selectedOptions.forEach((selectedOptionName) => {
        let componentType = repositories.find(
          (type) => type.repoId === selectedOptionName,
        );

        if (componentType != null) {
          selectedArray.push(componentType);
        }
      });
    }

    return selectedArray;
  };

  const handleRemoveFromSelected = (fieldName, valueArray) => {
    let newModel = dataObject;
    dataObject.setData(fieldName, valueArray);
    setDataObject({ ...newModel });
    setRepositories([...repositories]);
    callbackFunction();
  };

  const callbackFunction = () => {
    let newModel = dataObject;
    let setDataArray = [];
    let reposToScan = dataObject?.getData("repositories");
    for (let item in reposToScan) {
      setDataArray.push(repositories.find(repo => repo?.repoId === reposToScan[item]));
    }
    if (reposToScan?.length === setDataArray?.length) {
      newModel.setData("reposToScan", setDataArray);
      setDataObject({ ...newModel });
    }
    setRepositories([...repositories]);
  };

  if (dataObject == null) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Data"}
      />
    );
  }

  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          height={"40vh"}
          fieldName={"repositories"}
          selectOptions={repositories}
          dataObject={dataObject}
          setDataObject={setDataObject}
          showSelectAllButton={true}
          valueField={valueField}
          textField={textField}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faGit}
          disabled={disabled}
          noDataMessage={"No Repositories Found"}
          callbackFunction={callbackFunction}
        />
      </Col>
      <Col lg={6}>
        <ListInputBase
          height={"40vh"}
          customTitle={"Selected Repositories"}
          fieldName={"repositories"}
          selectOptions={getSelectedOptions()}
          dataObject={dataObject}
          setDataObject={setDataObject}
          setDataFunction={handleRemoveFromSelected}
          noDataMessage={"No Repositories Selected"}
          valueField={valueField}
          textField={textField}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faGit}
          disabled={isLoading || getSelectedOptions().length === 0}
        />
      </Col>
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
  disabled: false
};

export default RepoSelectionView;
