import React, {useContext, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import TerraformCloudWorkspacesEditorPanel from "./details/TerraformCloudWorkspacesEditorPanel";
import TerraformCloudWorkspacesTable from "./TerraformCloudWorkspacesTable";
import TerraformCloudOrganizationsSelectInput from "./details/inputs/TerraformCloudOrganizationsSelectInput";
import { Row, Col } from "react-bootstrap";
import Model from "core/data_model/model";
import {terraformCloudWorkspacesMetadata} from "./terraformCloudWorkspaces.metadata";

function TerraformCloudWorkspacesPanel({ toolId }) {
  
  const [terraformCloudWorkspacesList, setTerraformCloudWorkspacesList] = useState([]);
  const [terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel] = useState(new Model({...terraformCloudWorkspacesMetadata.newObjectFields}, terraformCloudWorkspacesMetadata, false));
  const toastContext = useContext(DialogToastContext);

  const handleClose = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    setTerraformCloudWorkspacesList([]);
    terraformCloudWorkspacesModel?.resetData();
    setTerraformCloudWorkspacesModel({...terraformCloudWorkspacesModel});
  };

  const handleRowSelect = (rowData) => {    
    let newDataObject = {...terraformCloudWorkspacesModel};
    newDataObject.setData("workspaceName", rowData?.workspaceName);
    setTerraformCloudWorkspacesModel({...newDataObject});
  };

  if (terraformCloudWorkspacesModel.getData("workspaceName")) {
    return (
      <TerraformCloudWorkspacesEditorPanel
        terraformCloudWorkspacesModel={terraformCloudWorkspacesModel}
        setTerraformCloudWorkspacesModel={setTerraformCloudWorkspacesModel}
        toolId={toolId}
        handleClose={handleClose}
        editMode={true}
      />
    );
  }

  const getTable = () => {
    if(terraformCloudWorkspacesModel.getData("organizationName")){
      // await loadData();
      return (
        <TerraformCloudWorkspacesTable
          toolId={toolId}         
          organizationName={terraformCloudWorkspacesModel.getData("organizationName")}
          terraformCloudWorkspacesList={terraformCloudWorkspacesList}
          setTerraformCloudWorkspacesList={setTerraformCloudWorkspacesList}
          handleRowSelect={handleRowSelect}
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
