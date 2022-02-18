import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcConnectionMetadata from "./sfdc-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SFDCBuildTypeSelectInput  from  "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";

function SfdcToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [sfdcConfigurationDto, setSfdcConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSfdcConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), sfdcConnectionMetadata));
  };

  if (sfdcConfigurationDto == null) {
    return <></>;
  }

  // console.log(sfdcConfigurationDto);

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
      model={sfdcConfigurationDto}
      setModel={setSfdcConfigurationDto}
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
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SfdcToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SfdcToolConfiguration;