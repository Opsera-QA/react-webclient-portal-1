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
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  const [isLoading, setIsLoading] = useState(false);
  const [azureBranches, setAzureBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setAzureBranches([]);
    setError(undefined);

    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [toolId, repositoryId]);

  const loadData = async (searchTerm = "") => {
    try {
      setIsLoading(true);
      await loadAzureBranches(searchTerm);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureBranches = async (
    searchTerm,
  ) => {
    const response = await azureActions.getBranchesFromAzureInstanceV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      repositoryId,
      searchTerm,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setAzureBranches([...repositories]);
    }
  };

  return (
    <MultiSelectInputBase
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
      supportSearchLookup={true}
      loadDataFunction={loadData}
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
