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
import { bitbucketActions } from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import _ from "lodash";
import LazyLoadMultiSelectInputBase from "../../../../inputs/select/LazyLoadMultiSelectInputBase";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function BitbucketRepositorySelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  workspace,
  repositoryId,
  multi,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketBranches, setBitbucketBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [inEditMode, setInEditMode] = useState(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setBitbucketBranches([]);
    setError(undefined);

    if (
      isMongoDbId(toolId) === true &&
      hasStringValue(workspace) === true &&
      hasStringValue(repositoryId) === true &&
      inEditMode === true
    ) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, workspace, repositoryId, inEditMode]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadBitbucketBranches(
        "",
        toolId,
        workspace,
        repositoryId,
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

  const loadBitbucketBranches = async (
    searchTerm = "",
    toolId,
    workspace,
    repositoryId,
    cancelSource = cancelTokenSource,
  ) => {
    setIsLoading(true);
    const response = await bitbucketActions.getBranchesFromBitbucketInstanceV3(
      getAccessToken,
      cancelSource,
      toolId,
      workspace,
      repositoryId,
      searchTerm,
    );
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBitbucketBranches([...branches]);
    }
    setIsLoading(false);
  };

  const delayedSearchQuery = useCallback(
    _.debounce(
      (searchTerm, repositoryId, toolId) =>
        loadBitbucketBranches(searchTerm, toolId, workspace, repositoryId),
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
        selectOptions={bitbucketBranches}
        busy={isLoading}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={"name"}
        filterOption={"startsWith"}
        textField={"name"}
        disabled={disabled}
        error={error}
        pluralTopic={"Bitbucket Branches"}
        singularTopic={"Bitbucket Branch"}
        onSearchFunction={(searchTerm) =>
          delayedSearchQuery(searchTerm, repositoryId, toolId)
        }
        useToggle={true}
        requireUserEnable={true}
        onEnableEditFunction={() => setInEditMode(true)}
      />
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={bitbucketBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      filterOption={"startsWith"}
      error={error}
      pluralTopic={"Bitbucket Branches"}
      singularTopic={"Bitbucket Branch"}
      onSearchFunction={(searchTerm) =>
        delayedSearchQuery(searchTerm, repositoryId, toolId)
      }
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
    />
  );
}

BitbucketRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  workspace: PropTypes.string,
  repositoryId: PropTypes.string,
  multi: PropTypes.bool,
};

export default BitbucketRepositorySelectInput;
