import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import GcpConnectionMetadata from "./gcp-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import FileReaderInputBase from "components/common/inputs/file/FileReaderInputBase";

function GcpToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [gcpConfigurationDto, setGCPConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setGCPConfigurationDto(
      modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), GcpConnectionMetadata)
    );
  };

  const savegcpConfigurationDto = async () => {
    let newConfiguration = gcpConfigurationDto.getPersistData();    
    newConfiguration.gcpConfigFile = await toolsActions.savePasswordToVault(toolData, gcpConfigurationDto, "gcpConfigFile", newConfiguration.gcpConfigFile, getAccessToken);

    const item = {configuration: newConfiguration};
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("tool_detail");
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={gcpConfigurationDto}
      setModel={setGCPConfigurationDto}
      persistRecord={savegcpConfigurationDto}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>          
          <FileReaderInputBase model={gcpConfigurationDto} setModel={setGCPConfigurationDto} acceptType={".json"} fieldName={"gcpConfigFile"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}
GcpToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default GcpToolConfiguration;
