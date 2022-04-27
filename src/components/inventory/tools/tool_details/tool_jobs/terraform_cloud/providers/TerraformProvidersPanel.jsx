import React, {useContext, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import TerraformProvidersEditorPanel from "./details/TerraformProvidersEditorPanel";
import TerraformProvidersTable from "./TerraformProvidersTable";
import TerraformCloudOrganizationsSelectInput from "./details/inputs/TerraformCloudOrganizationsSelectInput";
import { Row, Col } from "react-bootstrap";
import Model from "core/data_model/model";
import {terraformProvidersMetadata} from "./terraformProviders.metadata";

function TerraformProvidersPanel({ toolId }) {
  
  const [terraformProvidersList, setTerraformProvidersList] = useState([]);
  const [terraformProvidersModel, setTerraformProvidersModel] = useState(new Model({...terraformProvidersMetadata.newObjectFields}, terraformProvidersMetadata, false));
  const toastContext = useContext(DialogToastContext);

  const handleClose = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    setTerraformProvidersList([]);
    const newterraformProvidersModel = {...terraformProvidersModel};
    newterraformProvidersModel.setDefaultValue("vcsProviderName");    
    setTerraformProvidersModel({...newterraformProvidersModel});
  };

  if (terraformProvidersModel.getData("vcsProviderName")) {
    return (
      <TerraformProvidersEditorPanel
        terraformProvidersModel={terraformProvidersModel}
        setTerraformProvidersModel={setTerraformProvidersModel}
        toolId={toolId}
        handleClose={handleClose}
        editMode={true}
      />
    );
  }

  const getTable = () => {
    if(terraformProvidersModel.getData("organizationName")){
      // await loadData();
      return (
        <TerraformProvidersTable
          toolId={toolId}         
          organizationName={terraformProvidersModel.getData("organizationName")}
          terraformProvidersList={terraformProvidersList}
          setTerraformProvidersList={setTerraformProvidersList}
          setTerraformProvidersModel={setTerraformProvidersModel}
        />
      );
    } 
  };
  
  return (
    <>
      <Row>      
        <Col lg={12}>
          <TerraformCloudOrganizationsSelectInput 
            dataObject={terraformProvidersModel} 
            setDataObject={setTerraformProvidersModel}
            toolId={toolId}
          />
        </Col>
      </Row>
      {getTable()}
    </>    
  );
}

TerraformProvidersPanel.propTypes = {
  toolId: PropTypes.string,
  // loadData: PropTypes.func,
  toolData: PropTypes.object
};
export default TerraformProvidersPanel;
