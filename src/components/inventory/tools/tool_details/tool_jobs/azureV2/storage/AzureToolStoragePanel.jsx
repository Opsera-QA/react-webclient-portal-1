import React, {useContext, useEffect, useRef, useState} from "react";
import AzureToolStorageTable from "./AzureToolStorageTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureStorageActions from "../azureStorage.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import AzureToolStorageEditorPanel from "../storage/details/AzureToolStorageEditorPanel";

function AzureToolStoragePanel({ toolId, loadData }) {  
  const [azureStorageAccountsList, setAzureStorageAccountsList] = useState([]);
  const [azureStorageModel, setAzureStorageModel] = useState(undefined);
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
      const response = await azureStorageActions.getAzureStorageAccountsList(getAccessToken, cancelSource, toolId);      
      if(response.status === 200) {
        setAzureStorageAccountsList(response?.data?.message);
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
    setAzureStorageModel(null);
    await loadData();
  };

  if(azureStorageModel) {
    return (
      <AzureToolStorageEditorPanel
        toolId={toolId}
        azureStorageModel={azureStorageModel}
        setAzureStorageModel={setAzureStorageModel}
        handleClose={togglePanel}
    />
    );
  }
  
  return (
    <AzureToolStorageTable
      isLoading={isLoading}
      toolId={toolId}
      loadData={loadStorage}
      azureStorageAccountsList={azureStorageAccountsList}
    />
  );
}

AzureToolStoragePanel.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default AzureToolStoragePanel;
