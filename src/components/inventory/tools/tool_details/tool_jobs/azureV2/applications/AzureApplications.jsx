import React, {useContext, useEffect, useRef, useState} from "react";
import AzureApplicationsTable from "./AzureApplicationsTable";
import PropTypes from "prop-types";
import AzureApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/azureV2/applications/AzureApplicationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import azureActions from "../azure-actions";

function AzureApplications({ toolData, loadData, toolApplications }) {
  const toastContext = useContext(DialogToastContext);
  const [azureApplications, setAzureApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);  

  useEffect(() => {
    if(cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadAppStatus(cancelTokenSource).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolApplications]);

  const loadAppStatus = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getAzureApplicationStatus(cancelSource);
    } catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const getAzureApplicationStatus = async (cancelSource = cancelTokenSource) => {
    const response = await azureActions.getAzureApplicationStatus(getAccessToken, cancelSource, toolData?.getData("_id"));
    const status = response?.data?.data;
    unpackApplications(toolApplications, status);
  };

  const unpackApplications = (toolApplications, statusArray) => {
    const newApplicationList = [];

    if (Array.isArray(toolApplications)) {
      toolApplications.forEach((toolAction, index) => {
        let application = toolAction?.configuration;
        application = {...application, applicationId: toolAction?._id, index: index, connectionState: statusArray?.find(status => status.applicationId === toolAction?._id)};
        newApplicationList?.push(application);
      });
    }
    setAzureApplications(newApplicationList);
  };

  const onRowSelect = (grid, row) => {
    let selectedRow = toolData?.getArrayData("applications")[row?.index];
    toastContext.showOverlayPanel(
      <AzureApplicationOverlay
        azureDataObject={selectedRow?.configuration}
        applicationId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  return (
    <AzureApplicationsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      azureApplications={azureApplications}
    />
  );
}

AzureApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  toolApplications: PropTypes.array
};
export default AzureApplications;
