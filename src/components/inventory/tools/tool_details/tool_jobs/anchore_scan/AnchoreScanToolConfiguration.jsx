import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import anchoreScanConnectionMetadata from "./anchore-scan-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import toolsActions from "../../../tools-actions";
import {AuthContext} from "../../../../../../contexts/AuthContext";

function AnchoreScanToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [anchoreScanConfigurationDto, setAnchoreScanConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnchoreScanConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), anchoreScanConnectionMetadata));
  };

  const saveAnchoreToolConfiguration = async () => {
    let newConfiguration = anchoreScanConfigurationDto.getPersistData();
    newConfiguration.accountPassword = toolsActions.savePasswordToVault(toolData, "accountPassword", newConfiguration.accountPassword, getAccessToken);
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={anchoreScanConfigurationDto}
      persistRecord={saveAnchoreToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Anchore"}
    >
      <Row>
        <Col sm={12}>
          <DtoTextInput dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"toolURL"} />
          <DtoTextInput dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountUsername"} />
          <DtoTextInput type={"password"} dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnchoreScanToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default AnchoreScanToolConfiguration;
