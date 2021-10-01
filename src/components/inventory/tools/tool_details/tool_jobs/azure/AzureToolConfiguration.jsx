import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import AzureConnectionMetadata from "./azure-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";

function AzureToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [azureConfigurationDto, setAzureConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAzureConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AzureConnectionMetadata));
  };

  const saveAzureToolConfiguration = async () => {
    let newConfiguration = azureConfigurationDto.getPersistData();
    newConfiguration.applicationPassword = await toolsActions.savePasswordToVault(toolData, azureConfigurationDto, "applicationPassword", newConfiguration.applicationPassword, getAccessToken);
    newConfiguration.applicationKey = await toolsActions.savePasswordToVault(toolData, azureConfigurationDto, "applicationKey", newConfiguration.applicationKey, getAccessToken);
    newConfiguration.subscriptionId = await toolsActions.savePasswordToVault(toolData, azureConfigurationDto, "subscriptionId", newConfiguration.subscriptionId, getAccessToken);
    newConfiguration.tenantId = await toolsActions.savePasswordToVault(toolData, azureConfigurationDto, "tenantId", newConfiguration.tenantId, getAccessToken);
    newConfiguration.applicationId = await toolsActions.savePasswordToVault(toolData, azureConfigurationDto, "applicationId", newConfiguration.applicationId, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={azureConfigurationDto}
      setModel={setAzureConfigurationDto}
      persistRecord={saveAzureToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"azure"}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"subscriptionId"}/>
          <VaultTextInput dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"tenantId"}/>
          <VaultTextInput dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"applicationId"}/>
          <VaultTextInput dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"applicationPassword"} />
          {/*<VaultTextInput dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"applicationKey"} />*/}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AzureToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AzureToolConfiguration;