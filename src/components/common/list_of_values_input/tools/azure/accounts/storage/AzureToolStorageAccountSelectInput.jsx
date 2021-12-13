import React, {useContext, useEffect, useRef, useState} from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureStorageAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage_accounts/azureStorageAccount.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function AzureToolStorageAccountSelectInput(
  {
    azureToolId,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [azureStorageAccounts, setAzureStorageAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setAzureStorageAccounts([]);
    if (isMongoDbId(azureToolId)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
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
      await loadStorageAccounts(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadStorageAccounts = async (cancelSource = cancelTokenSource) => {
    const response = await azureStorageAccountActions.getAzureToolStorageAccounts(getAccessToken, cancelSource, azureToolId);
    const newAzureStorageAccounts = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newAzureStorageAccounts)) {
      setAzureStorageAccounts(newAzureStorageAccounts);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={azureStorageAccounts}
      clearDataFunction={clearDataFunction}
      busy={isLoading}
      valueField={"storageAccountName"}
      textField={'storageAccountName'}
    />
  );
}

AzureToolStorageAccountSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
};

export default AzureToolStorageAccountSelectInput;
