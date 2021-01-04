import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import spinnakerConnectionMetadata from "./spinnaker-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";

function SpinnakerToolConfiguration({ toolData }) {
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
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
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
};

export default SpinnakerToolConfiguration;