import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import ExactMatchSearchSelectInputBase from "components/common/inputs/select/ExactMatchSearchSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function GitlabRepositorySelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  valueField,
  textField,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabRepositories, setGitlabRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const [requiresLookup, setRequiresLookup] = useState(true);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setGitlabRepositories([]);

    if (isMongoDbId(toolId) === true && inEditMode === true) {
      loadData("").catch((error) => {
        throw error;
      });
    }
  }, [toolId, inEditMode]);

  const loadData = async (searchTerm = "") => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGitlabRepositories(
        searchTerm,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadGitlabRepositories = async (
    searchTerm,
  ) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV3(
      getAccessToken,
      cancelTokenSource,
      searchTerm,
      toolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRequiresLookup(repositories.includes(searchTerm) === false && searchTerm.length > 0);
      searchTerm.length > 0 ? repositories.unshift(searchTerm): null;
      setGitlabRepositories([...repositories]);
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  const getGitLabTextField = (repo) => {
    if (typeof textField === "function") {
      return textField(repo);
    }

    const parsedRepoString = DataParsingHelper.parseString(repo);

    if(parsedRepoString) {
      return parsedRepoString;
    }

    const parsedRepoObject = DataParsingHelper.parseObject(repo);

    if (!parsedRepoObject) {
      return repo;
    }

    const repoName = DataParsingHelper.parseString(parsedRepoObject.name);
    const repoFullName = DataParsingHelper.parseString(parsedRepoObject.nameSpacedPath);
    const repoId = DataParsingHelper.parseString(repo?.id);

    if (repoName && repoFullName) {
      return (`${repoName} (${repoFullName})`);
    }

    if (repoFullName) {
      return repoFullName;
    }

    if (repoName && repoId) {
      return (`${repoName} (${repoId})`);
    }


    if (repoName) {
      return (`${repoName}`);
    }
    
    return repo;
  };

  const exactMatchSearch = async (branch) => {
    
    const response = await gitlabActions.getBranch(
      getAccessToken,
      cancelTokenSource,
      toolId,
      repositoryId,
      branch,
    );

    const branchResult = response?.data?.data?.branch;

    return branchResult; 
  };

  return (
    <ExactMatchSearchSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={gitlabRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={getGitLabTextField}
      disabled={disabled}
      singularTopic={"Gitlab Repository"}
      pluralTopic={"Gitlab Repositories"}
      error={error}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
      supportSearchLookup={true}
      requiresLookup={requiresLookup}
      exactMatchSearch={exactMatchSearch}
    />
  );
}

GitlabRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

GitlabRepositorySelectInput.defaultProps = {
  valueField: "id",
  textField: "nameSpacedPath",
};

export default GitlabRepositorySelectInput;
