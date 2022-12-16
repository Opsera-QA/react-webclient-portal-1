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
    const cancelSource = axios.CancelToken.source();
    setCancelTokenSource(cancelSource);
    setGitlabRepositories([]);

    if (isMongoDbId(toolId) === true) {
      loadData("", toolId, cancelSource).catch((error) => {
        throw error;
      });
    }

    return () => {
      cancelSource.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (searchTerm = "", currentToolId = toolId, cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      let defaultSearchTerm = searchTerm;
      const existingRepository = model?.getData("gitRepository") || model?.getData("repository");
      // console.log(existingRepository);
      if (defaultSearchTerm && defaultSearchTerm === "" && hasStringValue(existingRepository) === true) {
        defaultSearchTerm = existingRepository;
      }
      await loadGitlabRepositories(
        defaultSearchTerm,
        currentToolId,
        cancelSource,
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
    toolId,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV3(
      getAccessToken,
      cancelSource,
      searchTerm,
      toolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setGitlabRepositories([...repositories]);
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
  valueField: "id",
  textField: "nameSpacedPath",
};

export default GitlabRepositorySelectInput;
