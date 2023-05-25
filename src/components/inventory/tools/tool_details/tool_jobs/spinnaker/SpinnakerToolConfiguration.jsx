import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import spinnakerConnectionMetadata from "./spinnaker-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function SpinnakerToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [spinnakerConfigurationDto, setSpinnakerConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSpinnakerConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], spinnakerConnectionMetadata));
  };

  const saveSpinnakerToolConfiguration = async () => {
    let newConfiguration = spinnakerConfigurationDto.getPersistData();
    const item = { configuration: newConfiguration };
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={spinnakerConfigurationDto}
      setModel={setSpinnakerConfigurationDto}
      persistRecord={saveSpinnakerToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.SPINNAKER}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={spinnakerConfigurationDto} setDataObject={setSpinnakerConfigurationDto} fieldName={"toolURL"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SpinnakerToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default SpinnakerToolConfiguration;