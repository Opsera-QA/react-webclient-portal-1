import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import anchoreScanConnectionMetadata from "./anchore-scan-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function AnchoreScanToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [anchoreScanConfigurationDto, setAnchoreScanConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnchoreScanConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), anchoreScanConnectionMetadata));
  };

  const saveAnchoreScanToolConfiguration = async () => {
    let newConfiguration = anchoreScanConfigurationDto.getPersistData();
    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(anchoreScanConfigurationDto, "accountPassword", newConfiguration.accountPassword, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={anchoreScanConfigurationDto}
      setModel={setAnchoreScanConfigurationDto}
      persistRecord={saveAnchoreScanToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Anchore"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnchoreScanToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default AnchoreScanToolConfiguration;
