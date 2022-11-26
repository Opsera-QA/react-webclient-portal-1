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
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import _ from "lodash";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";

function AzureDevOpsBranchSelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  repositoryId,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureBranches, setAzureBranches] = useState([]);
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
    setAzureBranches([]);
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
      setIsLoading(true);
      await loadAzureBranches("", toolId, repositoryId, cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureBranches = async (
    searchTerm,
    toolId,
    repositoryId,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await azureActions.getBranchesFromAzureInstanceV2(
      getAccessToken,
      cancelSource,
      toolId,
      repositoryId,
      searchTerm,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setAzureBranches([...repositories]);
    }
  };

  const delayedSearchQuery = useCallback(
    _.debounce(
      (searchTerm, repositoryId, toolId) =>
        loadAzureBranches(searchTerm, toolId, repositoryId),
      600,
    ),
    [],
  );

  return (
    <LazyLoadSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      error={error}
      singularTopic={"Azure Branch"}
      pluralTopic={"Azure Branches"}
      onSearchFunction={(searchTerm) =>
        delayedSearchQuery(searchTerm, repositoryId, toolId)
      }
    />
  );
}

AzureDevOpsBranchSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  repositoryId: PropTypes.string,
};

export default AzureDevOpsBranchSelectInput;
