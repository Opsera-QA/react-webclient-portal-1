import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformCloudWorkspacesActions from "./terraformCloudWorkspaces.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import TerraformCloudWorkspacesEditorPanel from "./details/TerraformCloudWorkspacesEditorPanel";
import TerraformCloudWorkspacesTable from "./TerraformCloudWorkspacesTable";
import TerraformCloudOrganizationsSelectInput from "./details/inputs/TerraformCloudOrganizationsSelectInput";
import { Row, Col } from "react-bootstrap";
import Model from "core/data_model/model";
import {terraformCloudWorkspacesMetadata} from "./terraformCloudWorkspaces.metadata";

function TerraformCloudWorkspacesPanel({ toolId }) {
  const [terraformCloudWorkspacesList, setTerraformCloudWorkspacesList] = useState([]);
  const [terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel] = useState(new Model({...terraformCloudWorkspacesMetadata.newObjectFields}, terraformCloudWorkspacesMetadata, true));  
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  // useEffect (() => {
  //   if(cancelTokenSource){
  //     cancelTokenSource.cancel();
  //   }
  //   const source = axios.CancelToken.source();
  //   setCancelTokenSource(source);
  //   isMounted.current = true;

  //   loadData(source).catch((error) => {
  //     if(isMounted?.current === true){
  //       throw error;
  //     }
  //   });

  //   return () => {
  //     source.cancel();
  //     isMounted.current = false;
  //   };
  // }, [toolId]);

  // const loadData = async (cancelSource = cancelTokenSource) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await terraformCloudWorkspacesActions.getTerraformCloudWorkspaces(getAccessToken, cancelSource, toolId, terraformCloudWorkspacesModel.getData("organizationName"));
  //     const workspaces = response?.data;

  //     if(Array.isArray(workspaces)) {
  //       setTerraformCloudWorkspacesList(workspaces);
  //     }

  //   } catch (error) {
  //     if(isMounted?.current === true) {
  //       toastContext.showLoadingErrorDialog(error);
  //     }
  //   } finally {
  //     if(isMounted?.current === true) {
  //       setIsLoading(false);
  //     }      
  //   }
  // };

  // const togglePanel = async () => {
  //   setTerraformCloudWorkspacesModel(null);
  //   await loadData();
  // };

  // if(terraformCloudWorkspacesModel) {
  //   return (
  //     <TerraformCloudWorkspacesEditorPanel
  //       terraformCloudWorkspacesModel={terraformCloudWorkspacesModel}
  //       setTerraformCloudWorkspacesModel={setTerraformCloudWorkspacesModel}
  //       toolId={toolId}
  //       handleClose={togglePanel}
  //   />
  //   );
  // }

  const getTable = () => {
    if(terraformCloudWorkspacesModel.getData("organizationName")){
      // await loadData();
      return (
        <TerraformCloudWorkspacesTable
          toolId={toolId}          
          setTerraformCloudWorkspacesModel={setTerraformCloudWorkspacesModel}
          organizationName={terraformCloudWorkspacesModel.getData("organizationName")}
          terraformCloudWorkspacesList={terraformCloudWorkspacesList}
          setTerraformCloudWorkspacesList={setTerraformCloudWorkspacesList}
        />
      );
    } 
  };
  
  return (
    <>
      <Row>      
        <Col lg={12}>
          <TerraformCloudOrganizationsSelectInput 
            dataObject={terraformCloudWorkspacesModel} 
            setDataObject={setTerraformCloudWorkspacesModel} 
            toolId={toolId}
          />
        </Col>
      </Row>
      {getTable()}
    </>    
  );
}

TerraformCloudWorkspacesPanel.propTypes = {
  toolId: PropTypes.string,
  // loadData: PropTypes.func,
  toolData: PropTypes.object
};
export default TerraformCloudWorkspacesPanel;
