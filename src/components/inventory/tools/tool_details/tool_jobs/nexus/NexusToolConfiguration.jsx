import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import nexusConnectionMetadata from "./nexus-connection-metadata";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";

function NexusToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [nexusConfigurationDto, setNexusConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setNexusConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), nexusConnectionMetadata));
  };

  const saveNexusToolConfiguration = async () => {
    let newConfiguration = nexusConfigurationDto.getPersistData();
    newConfiguration.secretKey = await toolsActions.savePasswordToVault(toolData, nexusConfigurationDto,"secretKey", newConfiguration.secretKey, getAccessToken);
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={nexusConfigurationDto}
      setModel={setNexusConfigurationDto}
      persistRecord={saveNexusToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Nexus"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={nexusConfigurationDto} setDataObject={setNexusConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={nexusConfigurationDto} setDataObject={setNexusConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={nexusConfigurationDto} setDataObject={setNexusConfigurationDto} fieldName={"secretKey"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

NexusToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default NexusToolConfiguration;
