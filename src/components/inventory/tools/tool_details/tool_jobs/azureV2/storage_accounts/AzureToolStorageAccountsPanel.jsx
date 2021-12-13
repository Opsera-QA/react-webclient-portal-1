import React, {useContext, useEffect, useRef, useState} from "react";
import AzureToolStorageAccountTable from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage_accounts/AzureToolStorageAccountTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureStorageAccountActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage_accounts/azureStorageAccount.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import AzureToolStorageEditorPanel from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage_accounts/details/AzureToolStorageAccountEditorPanel";

function AzureToolStoragePanel({ toolId }) {
  const [azureStorageAccountsList, setAzureStorageAccountsList] = useState([]);
  const [azureStorageAccountsModel, setAzureStorageAccountsModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await azureStorageAccountActions.getAzureToolStorageAccounts(getAccessToken, cancelSource, toolId);
      const accounts = response?.data?.data;

      if(Array.isArray(accounts)) {
        setAzureStorageAccountsList(accounts);
      }

    } catch (error) {
      if(isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsLoading(false);
      }      
    }
  };

  const togglePanel = async () => {
    setAzureStorageAccountsModel(null);
    await loadData();
  };

  if(azureStorageAccountsModel) {
    return (
      <AzureToolStorageEditorPanel
        azureStorageAccountsModel={azureStorageAccountsModel}
        setAzureStorageAccountsModel={setAzureStorageAccountsModel}
        toolId={toolId}
        handleClose={togglePanel}
    />
    );
  }
  
  return (
    <AzureToolStorageAccountTable
      azureStorageAccountsList={azureStorageAccountsList}
      loadData={loadData}
      isLoading={isLoading}
      toolId={toolId}
      isMounted={isMounted}
      setAzureStorageAccountsModel={setAzureStorageAccountsModel}
    />
  );
}

AzureToolStoragePanel.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolData: PropTypes.object
};
export default AzureToolStoragePanel;
