import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import MultiSelectInputBase from "../../../../inputs/multi_select/MultiSelectInputBase";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";
import LazyLoadMultiSelectInputBase from "../../../../inputs/select/LazyLoadMultiSelectInputBase";

function GithubBranchSelectInput({
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
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState(
    "Select Github Branch",
  );
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setGithubBranches([]);
    setErrorMessage("");
    setPlaceholderText("Select Github Branch");

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
      setIsLoading(true);
      await loadGithubBranches("", toolId, repositoryId, cancelSource);
    } catch (error) {
      setPlaceholderText("No Branches Available!");
      setErrorMessage("There was an error pulling Github Branches");
      console.error(error);
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
    const response = await githubActions.getBranchesFromGithubInstanceV3(
      getAccessToken,
      cancelSource,
      toolId,
      repositoryId,
      searchTerm,
    );
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setPlaceholderText("Select Github Branch");
      setGithubBranches([...branches]);
    }
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
      <LazyLoadMultiSelectInputBase
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
        placeholderText={placeholderText}
        error={errorMessage}
        pluralTopic={"Github Branches"}
        singularTopic={"Github Branch"}
        onSearchFunction={(searchTerm) =>
          delayedSearchQuery(searchTerm, repositoryId, toolId)
        }
        useToggle={true}
      />
    );
  }

  return (
    <LazyLoadSelectInputBase
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
      placeholderText={placeholderText}
      error={errorMessage}
      pluralTopic={"Github Branches"}
      singularTopic={"Github Branch"}
      onSearchFunction={(searchTerm) =>
        delayedSearchQuery(searchTerm, repositoryId, toolId)
      }
      useToggle={true}
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
