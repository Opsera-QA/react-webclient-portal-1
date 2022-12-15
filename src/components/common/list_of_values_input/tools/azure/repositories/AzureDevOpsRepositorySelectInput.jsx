import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";
import {hasStringValue} from "components/common/helpers/string-helpers";

function AzureDevOpsRepositorySelectInput({
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
  const [azureRepositories, setAzureRepositories] = useState([]);
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
    let defaultSearchTerm = "";
    setAzureRepositories([]);
    setError(undefined);

    if (isMongoDbId(toolId) === true) {
      const existingRepository = model?.getData("gitRepository") || model?.getData("repository");
      // console.log(existingRepository);
      if (hasStringValue(existingRepository) === true) {
        defaultSearchTerm = existingRepository;
      }

      loadData(defaultSearchTerm, toolId, source).catch((error) => {
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
      await loadAzureRepositories(searchTerm, currentToolId, cancelSource);
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

  const loadAzureRepositories = async (
    searchTerm,
    currentToolId = toolId,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await azureActions.getRepositoriesFromAzureInstanceV2(
      getAccessToken,
      cancelSource,
      currentToolId,
      searchTerm,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setAzureRepositories([...repositories]);
    }
  };

  const delayedSearchQuery = useCallback(
    _.debounce(
      (searchTerm, toolId) => loadAzureRepositories(searchTerm, toolId),
      600,
    ),
    [],
  );

  return (
    <LazyLoadSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      pluralTopic={"Azure Repositories"}
      singularTopic={"Azure Repository"}
      error={error}
      onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, toolId)}
    />
  );
}

AzureDevOpsRepositorySelectInput.propTypes = {
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

AzureDevOpsRepositorySelectInput.defaultProps = {
  valueField: "id",
  textField: "nameSpacedPath",
};

export default AzureDevOpsRepositorySelectInput;
