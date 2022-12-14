import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";

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
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    let defaultSearchTerm = "";
    setGithubRepositories([]);

    if (isMongoDbId(toolId) === true) {
      const existingRepository = model?.getData("gitRepository") || model?.getData("repository");
      // console.log(existingRepository);
      if (hasStringValue(existingRepository) === true) {
        defaultSearchTerm = existingRepository;
      }

      loadData(defaultSearchTerm, toolId, cancelSource).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (
    searchTerm = "",
    currentToolId = toolId,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await loadGithubRepositories(
        searchTerm,
        currentToolId,
        cancelSource,
      );
    } catch (error) {
      if (isMounted.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadGithubRepositories = async (
    searchTerm,
    currentToolId = toolId,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await githubActions.getRepositoriesFromGithubInstanceV3(getAccessToken, cancelSource, currentToolId, searchTerm);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setGithubRepositories([...repositories]);
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  const delayedSearchQuery = useCallback(
    _.debounce((searchTerm, toolId) => loadData(searchTerm, toolId), 600),
    [],
  );

  return (
    <LazyLoadSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={githubRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Github Repository"}
      pluralTopic={"Github Repositories"}
      error={error}
      onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, toolId)}
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
  valueField: "name",
  textField: "name",
};

export default GithubRepositorySelectInput;
