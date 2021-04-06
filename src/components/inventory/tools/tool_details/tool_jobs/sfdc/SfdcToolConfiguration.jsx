import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import { Button } from "react-bootstrap";
import sfdcConnectionMetadata from "./sfdc-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SFDCBuildTypeSelectInput  from  "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlug } from "@fortawesome/pro-light-svg-icons";
import SfdxTestConnectionStatusModal from './SfdxTestConnectionStatusModal';
import { DialogToastContext } from "contexts/DialogToastContext";

function SfdcToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [sfdcConfigurationDto, setSfdcConfigurationDto] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSfdcConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), sfdcConnectionMetadata));
  };

  const testConnection = async() =>{
    let response;
    
    if (sfdcConfigurationDto != null) {
      try{
        response = await toolsActions.checkSFDXToolConnection(getAccessToken, toolData);
      } catch (error) {
        toastContext.showErrorDialog(error.message);
      }
    }

    if (response && response.data != null && response.data.status === 200) {      
      setShowModal(true);
    }
    else {
      toastContext.showErrorDialog("Something went wrong during test connection. View browser logs for more details"); 
    }
  };

  const getSfdxModal = () => {
    return (
      <SfdxTestConnectionStatusModal 
        showModal={showModal}
        setShowModal={setShowModal}
        toolData={toolData}            
      />
    );
  };

  const getDynamicFields = () => {
    if (sfdcConfigurationDto.getData("checkConnection") === true) {
      return (
        <>
          <PipelineToolInput
            toolType={"jenkins"}
            toolFriendlyName={"Jenkins"}
            fieldName={"jenkinsToolId"}
            configurationRequired={true}
            dataObject={sfdcConfigurationDto}
            setDataObject={setSfdcConfigurationDto}
          />
          <div className="p-2">
            <Button size="sm" variant={"secondary"} disabled={!toolData.getData("_id") || sfdcConfigurationDto.getData("jenkinsToolId").length < 1} onClick={() => testConnection()}>
            <FontAwesomeIcon icon={faPlug} className="mr-2" fixedWidth /> Check SFDX Connection
            </Button>
          </div>          
        </>
      );
    }
  };

  if (sfdcConfigurationDto == null) {
    return <></>;
  }

  console.log(sfdcConfigurationDto);

  const saveSfdcToolConfiguration = async () => {
    let newConfiguration = sfdcConfigurationDto.getPersistData();
    const clientIdVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_id`;
    newConfiguration.sfdc_client_id = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_id", newConfiguration.sfdc_client_id, clientIdVaultKey, getAccessToken, toolData.getData("_id"));
    const clientSecretVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_secret`;
    newConfiguration.sfdc_client_secret = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_secret", newConfiguration.sfdc_client_secret, clientSecretVaultKey, getAccessToken, toolData.getData("_id"));
    const passwordVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-password`;
    newConfiguration.sfdc_password = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_password", newConfiguration.sfdc_password, passwordVaultKey, getAccessToken, toolData.getData("_id"));
    const tokenVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-token`;
    newConfiguration.sfdc_token = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_token", newConfiguration.sfdc_token, tokenVaultKey, getAccessToken, toolData.getData("_id"));
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={sfdcConfigurationDto}
      persistRecord={saveSfdcToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Sfdc"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_id"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_secret"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_token"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_password"} />
          <SFDCBuildTypeSelectInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"buildType"} />
          <BooleanToggleInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"checkConnection"} />
          {getDynamicFields()}
          {showModal ? getSfdxModal() : null}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SfdcToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SfdcToolConfiguration;