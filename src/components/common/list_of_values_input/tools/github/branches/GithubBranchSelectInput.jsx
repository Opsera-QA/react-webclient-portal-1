import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {githubActions} from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import _ from "lodash";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function GithubBranchSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    repositoryId,
    multi,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [githubBranches, setGithubBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setGithubBranches([]);
    setError(undefined);

    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, repositoryId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGithubBranches("", toolId, repositoryId, cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubBranches = async (
    searchTerm,
    toolId,
    repositoryId,
    cancelSource = cancelTokenSource,
  ) => {
    setIsLoading(true);
    const response = await githubActions.getBranchesFromGithubInstanceV3(
      getAccessToken,
      cancelSource,
      toolId,
      repositoryId,
      searchTerm,
    );
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setGithubBranches([...branches]);
    }
    setIsLoading(false);
  };

  const delayedSearchQuery = useCallback(
    _.debounce(
      (searchTerm, repositoryId, toolId) =>
        loadGithubBranches(searchTerm, toolId, repositoryId),
      600,
    ),
    [],
  );

  if (multi) {
    return (
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={githubBranches}
        busy={isLoading}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={"name"}
        textField={"name"}
        filterOption={"startsWith"}
        disabled={disabled}
        error={error}
        pluralTopic={"Github Branches"}
        onSearchFunction={(searchTerm) =>
          delayedSearchQuery(searchTerm, repositoryId, toolId)
        }
        loadDataFunction={loadData}
      />
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={githubBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      filterOption={"startsWith"}
      error={error}
      pluralTopic={"Github Branches"}
      singularTopic={"Github Branch"}
      onSearchFunction={(searchTerm) =>
        delayedSearchQuery(searchTerm, repositoryId, toolId)
      }
      loadDataFunction={loadData}
    />
  );
}

GithubBranchSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  repositoryId: PropTypes.string,
  multi: PropTypes.bool,
};

export default GithubBranchSelectInput;
