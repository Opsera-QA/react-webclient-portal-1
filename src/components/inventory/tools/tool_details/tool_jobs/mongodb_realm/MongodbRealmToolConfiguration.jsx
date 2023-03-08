import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import mongodbeRealmConnectionMetadata from "./mongodb-realm-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";

function MongodbRealmToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [mongodbRealmConfigurationDto, setMongodbRealmConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setMongodbRealmConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), mongodbeRealmConnectionMetadata));
  };

  const saveMongodbRealmToolConfiguration = async () => {
    let newConfiguration = mongodbRealmConfigurationDto.getPersistData();
    newConfiguration.accessKey = await toolsActions.savePasswordToVault(toolData, mongodbRealmConfigurationDto, "accessKey", newConfiguration.accessKey, getAccessToken);
    newConfiguration.secretKey = await toolsActions.savePasswordToVault(toolData, mongodbRealmConfigurationDto, "secretKey", newConfiguration.secretKey, getAccessToken);    
    const item = {configuration: newConfiguration};
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };
  
  return (
    <ToolConfigurationEditorPanelContainer
      model={mongodbRealmConfigurationDto}
      setModel={setMongodbRealmConfigurationDto}
      persistRecord={saveMongodbRealmToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"mongodb_realm"}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={mongodbRealmConfigurationDto} setDataObject={setMongodbRealmConfigurationDto} fieldName={"accessKey"} />
          <VaultTextInput dataObject={mongodbRealmConfigurationDto} setDataObject={setMongodbRealmConfigurationDto} fieldName={"secretKey"} />          
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

MongodbRealmToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default MongodbRealmToolConfiguration;
