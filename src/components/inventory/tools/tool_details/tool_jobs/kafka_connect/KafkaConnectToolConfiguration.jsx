import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import KafkaConnectConnectionMetadata from "./kafkaConnect-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function KafkaConnectToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [kafkaConnectConfigurationDto, setKafkaConnectConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setKafkaConnectConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), KafkaConnectConnectionMetadata));
  };

  const saveKafkaConnectToolConfiguration = async () => {
    let newConfiguration = kafkaConnectConfigurationDto.getPersistData();
    newConfiguration.password = await toolsActions.savePasswordToVault(toolData, kafkaConnectConfigurationDto, "password", newConfiguration.password, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={kafkaConnectConfigurationDto}
      setModel={setKafkaConnectConfigurationDto}
      persistRecord={saveKafkaConnectToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"kafka_connect"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={kafkaConnectConfigurationDto} setDataObject={setKafkaConnectConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={kafkaConnectConfigurationDto} setDataObject={setKafkaConnectConfigurationDto} fieldName={"username"} />
          <VaultTextInput dataObject={kafkaConnectConfigurationDto} setDataObject={setKafkaConnectConfigurationDto} fieldName={"password"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

KafkaConnectToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default KafkaConnectToolConfiguration;