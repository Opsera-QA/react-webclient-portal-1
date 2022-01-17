import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformCloudOrganizationsActions from "./terraformCloudOrganizations.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import TerraformCloudOrganizationsEditorPanel from "./details/TerraformCloudOrganizationsEditorPanel";
import TerraformCloudOrganizationsTable from "./TerraformCloudOrganizationsTable";

function TerraformCloudOrganizationsPanel({ toolId }) {
  const [terraformCloudOrganizationsList, setTerraformCloudOrganizationsList] = useState([]);
  const [terraformCloudOrganizationsModel, setTerraformCloudOrganizationsModel] = useState(undefined);
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
      const response = await terraformCloudOrganizationsActions.getTerraformCloudOrganizations(getAccessToken, cancelSource, toolId);
      const accounts = response?.data?.data;

      if(Array.isArray(accounts)) {
        setTerraformCloudOrganizationsList(accounts);
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
    setTerraformCloudOrganizationsModel(null);
    await loadData();
  };

  if(terraformCloudOrganizationsModel) {
    return (
      <TerraformCloudOrganizationsEditorPanel
        terraformCloudOrganizationsModel={terraformCloudOrganizationsModel}
        setTerraformCloudOrganizationsModel={setTerraformCloudOrganizationsModel}
        toolId={toolId}
        handleClose={togglePanel}
    />
    );
  }
  
  return (
    <TerraformCloudOrganizationsTable
      terraformCloudOrganizationsList={terraformCloudOrganizationsList}
      loadData={loadData}
      isLoading={isLoading}
      toolId={toolId}
      isMounted={isMounted}
      setTerraformCloudOrganizationsModel={setTerraformCloudOrganizationsModel}
    />
  );
}

TerraformCloudOrganizationsPanel.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolData: PropTypes.object
};
export default TerraformCloudOrganizationsPanel;
