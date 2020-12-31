import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import spinnakerConnectionMetadata from "./spinnaker-connection-metadata";

function SpinnakerToolConfiguration({ toolData, saveToolConfiguration }) {
  const [spinnakerConfigurationDto, setSpinnakerConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSpinnakerConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], spinnakerConnectionMetadata));
  };

  const saveSpinnakerToolConfiguration = async () => {
    let newConfiguration = spinnakerConfigurationDto.getPersistData();
    const item = {configuration: newConfiguration};
    // TODO: Wire up actions method instead
    return await saveToolConfiguration(item);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={spinnakerConfigurationDto}
      persistRecord={saveSpinnakerToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Spinnaker"}
    >
      <Row>
        <Col sm={12}>
          <DtoTextInput dataObject={spinnakerConfigurationDto} setDataObject={setSpinnakerConfigurationDto} fieldName={"toolURL"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SpinnakerToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  saveToolConfiguration: PropTypes.func
};

export default SpinnakerToolConfiguration;