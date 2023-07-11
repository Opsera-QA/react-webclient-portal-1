import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import awsConnectionMetadata from "./aws-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import AwsCloudProviderRegionSelectInput from "components/common/list_of_values_input/aws/regions/AwsCloudProviderRegionSelectInput";
import toolIdentifierConnectionCheckConstants from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function AwsToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [awsConfigurationDto, setAwsConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAwsConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), awsConnectionMetadata));
  };

  const saveAwsToolConfiguration = async () => {
    let newConfiguration = awsConfigurationDto.getPersistData();
    newConfiguration.accessKey = await toolsActions.savePasswordToVault(toolData, awsConfigurationDto, "accessKey", newConfiguration.accessKey, getAccessToken);
    newConfiguration.secretKey = await toolsActions.savePasswordToVault(toolData, awsConfigurationDto, "secretKey", newConfiguration.secretKey, getAccessToken);
    newConfiguration.awsAccountId = await toolsActions.savePasswordToVault(toolData, awsConfigurationDto, "awsAccountId", newConfiguration.awsAccountId, getAccessToken);
    const item = {configuration: newConfiguration};
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };
  
  return (
    <ToolConfigurationEditorPanelContainer
      model={awsConfigurationDto}
      setModel={setAwsConfigurationDto}
      persistRecord={saveAwsToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.AWS_ACCOUNT}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={awsConfigurationDto} setDataObject={setAwsConfigurationDto} fieldName={"accessKey"} />
          <VaultTextInput dataObject={awsConfigurationDto} setDataObject={setAwsConfigurationDto} fieldName={"secretKey"} />
          <AwsCloudProviderRegionSelectInput model={awsConfigurationDto} setModel={setAwsConfigurationDto} fieldName={"regions"} />
          <VaultTextInput dataObject={awsConfigurationDto} setDataObject={setAwsConfigurationDto} fieldName={"awsAccountId"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AwsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default AwsToolConfiguration;