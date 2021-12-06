import React, {useContext, useEffect, useRef, useState} from "react";
import AzureToolStorageAccountTable from "./AzureToolStorageAccountTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureStorageActions from "../azureStorage.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import AzureToolStorageEditorPanel from "./details/AzureToolStorageAccountEditorPanel";


function AzureToolStoragePanel({ toolId, loadData, toolData }) {  
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

    loadStorage(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadStorage = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await azureStorageActions.getAzureToolStorageAccounts(getAccessToken, cancelSource, toolId);      
      if(response.status === 200) {
        setAzureStorageAccountsList(response?.data?.data);
        console.log(response.data.data);
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
        toolData={toolData}
    />
    );
  }
  
  return (
    <AzureToolStorageAccountTable
      isLoading={isLoading}
      toolId={toolId}
      loadData={loadStorage}
      azureStorageAccountsList={azureStorageAccountsList}
      toolData={toolData}
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
