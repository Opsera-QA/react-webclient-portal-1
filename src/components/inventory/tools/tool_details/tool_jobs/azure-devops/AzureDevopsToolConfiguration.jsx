import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import AzureDevopsConnectionMetadata from "./azureDevops-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";

function AzureDevopsToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [azureDevopsConfigurationDto, setAzureDevopsConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAzureDevopsConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AzureDevopsConnectionMetadata));
  };

  const saveAzureDevopsToolConfiguration = async () => {
    let newConfiguration = azureDevopsConfigurationDto.getPersistData();
    newConfiguration.accessToken = await toolsActions.savePasswordToVault(toolData, azureDevopsConfigurationDto, "accessToken", newConfiguration.accessToken, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={azureDevopsConfigurationDto}
      persistRecord={saveAzureDevopsToolConfiguration}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={azureDevopsConfigurationDto} setDataObject={setAzureDevopsConfigurationDto} fieldName={"accessToken"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AzureDevopsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AzureDevopsToolConfiguration;