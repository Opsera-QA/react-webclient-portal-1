import React, {useContext, useEffect, useRef, useState} from "react";
import AzureStorageTable from "./AzureStorageTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureActions from "../azure-actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function AzureStorage({ toolData, loadData }) {  
  const [AzureStorage, setAzureStorage] = useState([]);
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
  }, []);

  const loadStorage = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await azureActions.getAzureStorageAccountsList(toolData.getData("_id"), getAccessToken, cancelSource);      
      if(response.status === 200) {
        setAzureStorage(response.data.message);
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

  
  return (
    <AzureStorageTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      AzureStorage={AzureStorage}
    />
  );
}

AzureStorage.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default AzureStorage;
