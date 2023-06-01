import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGithubActions from "hooks/tools/github/useGithubActions";

function GithubRepositorySelectInput(
  {
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
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const githubActions = useGithubActions();
  const {
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    setRepositories([]);

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
      if (isMongoDbId(toolId) !== true) {
        return;
      }

      const response = await githubActions.getGithubRepositories(
        toolId,
        searchTerm,
      );
      const repositories = await DataParsingHelper.parseNestedArray(response, "data.data", []);
      // searchTerm.length > 0 ? repositories.unshift(searchTerm): null;
      // console.log(searchTerm);
      // console.log(repositories);
      setRepositories([...repositories]);

      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        setIsLoading(false);
        setError(error);
      }
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

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={repositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={getGitLabTextField}
      disabled={disabled}
      singularTopic={"Github Repository"}
      pluralTopic={"Github Repositories"}
      error={error}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
      supportSearchLookup={true}
    />
  );
}

GithubRepositorySelectInput.propTypes = {
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

GithubRepositorySelectInput.defaultProps = {
  valueField: "id",
  textField: "nameSpacedPath",
};

export default GithubRepositorySelectInput;
