import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";

function AzureDevOpsRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolId,
    disabled,
    setDataFunction,
    clearDataFunction
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRepositories, setAzureRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Azure Repository");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRepositories([]);

    if (isMongoDbId(azureToolId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [azureToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRepositories(cancelSource);
    } catch (error) {
      setPlaceholderText("No Repositories Available!");
      setErrorMessage("There was an error pulling Azure Repositories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await azureActions.getRepositoriesFromAzureInstanceV2(getAccessToken, cancelSource, azureToolId);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setPlaceholderText("Select Azure Repository");
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
      valueField={"name"}
      textField={"repositoryId"}
      disabled={disabled}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

AzureDevOpsRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default AzureDevOpsRepositorySelectInput;
