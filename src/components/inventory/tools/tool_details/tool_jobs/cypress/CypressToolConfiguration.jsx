import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import cypressConnectionMetadata from "./cypress-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function CypressToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [cypressConfigurationDto, setCypressConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setCypressConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], cypressConnectionMetadata));
  };

  const saveCypressToolConfiguration = async () => {
    let newConfiguration = cypressConfigurationDto.getPersistData();
    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.jAuthToken = await toolsActions.saveKeyPasswordToVault(cypressConfigurationDto, "jAuthToken", newConfiguration.jAuthToken, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={cypressConfigurationDto}
      setModel={setCypressConfigurationDto}
      persistRecord={saveCypressToolConfiguration}
      toolData={toolData}
    >
      <Col sm={12}>
        <TextInputBase dataObject={cypressConfigurationDto} setDataObject={setCypressConfigurationDto} fieldName={"jenkinsUrl"} />
      </Col>
      <Col sm={12}>
        <TextInputBase dataObject={cypressConfigurationDto} setDataObject={setCypressConfigurationDto} fieldName={"jenkinsPort"} />
      </Col>
      <Col sm={12}>
        <TextInputBase dataObject={cypressConfigurationDto} setDataObject={setCypressConfigurationDto} fieldName={"jUserId"} />
      </Col>
      <Col sm={12}>
        <VaultTextInput dataObject={cypressConfigurationDto} setDataObject={setCypressConfigurationDto} fieldName={"jAuthToken"} />
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

CypressToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default CypressToolConfiguration;
