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

function AzureV2ToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [azureConfigurationDto, setAzureConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAzureConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AzureConnectionMetadata));
  };

  const saveAzureToolConfiguration = async () => {
    const item = {configuration: azureConfigurationDto.getPersistData()};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={azureConfigurationDto}
      persistRecord={saveAzureToolConfiguration}
      toolData={toolData}
      // toolConnectionCheckName={"azure"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"azureSubscriptionId"}/>
          <TextInputBase dataObject={azureConfigurationDto} setDataObject={setAzureConfigurationDto} fieldName={"azureTenantId"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AzureV2ToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AzureV2ToolConfiguration;