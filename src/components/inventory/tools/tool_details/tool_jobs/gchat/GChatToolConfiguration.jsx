import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import gchatConnectionMetadata from "./gchat-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function GChatToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [gChatConfigurationDto, setGChatConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setGChatConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), gchatConnectionMetadata));
  };

  const saveGChatToolConfiguration = async () => {
    let newConfiguration = gChatConfigurationDto.getPersistData();

    // key as only toolID as requested by Purushoth!
    const vaultKey = toolData.getData("_id");
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(gChatConfigurationDto,"webhookUrl", newConfiguration.webhookUrl, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  if (gChatConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={gChatConfigurationDto}
      setModel={setGChatConfigurationDto}
      persistRecord={saveGChatToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"gchat"}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={gChatConfigurationDto} setDataObject={setGChatConfigurationDto} fieldName={"webhookUrl"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

GChatToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default GChatToolConfiguration;
