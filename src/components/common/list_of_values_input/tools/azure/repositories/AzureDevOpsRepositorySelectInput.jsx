import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  const [isLoading, setIsLoading] = useState(false);
  const [azureRepositories, setAzureRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setAzureRepositories([]);
    setError(undefined);

    if (inEditMode === true && isMongoDbId(toolId) === true) {
      loadData("").catch((error) => {
        throw error;
      });
    }
  }, [toolId, inEditMode]);

  const loadData = async (
    searchTerm = "",
  ) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadAzureRepositories(searchTerm);
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
  ) => {
    const response = await azureActions.getRepositoriesFromAzureInstanceV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      searchTerm,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setAzureRepositories([...repositories]);
    }
  };

  return (
    <SelectInputBase
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
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      supportSearchLookup={true}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
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
