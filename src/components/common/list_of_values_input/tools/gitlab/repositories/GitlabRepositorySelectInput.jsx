import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";

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
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabRepositories, setGitlabRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setError(undefined);
    setGitlabRepositories([]);

    if (isMongoDbId(toolId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadGitlabRepositories("", toolId, cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGitlabRepositories = async (
    searchTerm,
    toolId,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      // const response = await gitlabActions.getRepositoriesFromGitlabInstanceV2(getAccessToken, cancelSource, toolId);
      const response = await gitlabActions.getRepositoriesFromGitlabInstanceV3(
        getAccessToken,
        cancelSource,
        searchTerm,
        toolId,
      );

      const repositories = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(repositories)) {
        setGitlabRepositories([...repositories]);

        const existingRepository = model?.getData(fieldName);

        if (hasStringValue(existingRepository) === true) {
          const existingRepositoryExists = repositories.find(
            (repository) => repository[valueField] === existingRepository,
          );

          if (existingRepositoryExists == null) {
            setError(
              "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
            );
          }
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        setError(
          "Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.",
        );
      }
      console.error(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const delayedSearchQuery = useCallback(
    _.debounce((searchTerm, toolId) => loadGitlabRepositories(searchTerm, toolId), 600),
    [],
  );

  return (
    <LazyLoadSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={gitlabRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Gitlab Repository"}
      pluralTopic={"Gitlab Repositories"}
      error={error}
      onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, toolId)}
      useToggle={true}
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
  valueField: "name",
  textField: "name",
};

export default GitlabRepositorySelectInput;
