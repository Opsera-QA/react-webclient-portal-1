import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import teamsConnectionMetadata from "./teams-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function TeamsToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [teamsConfigurationDto, setTeamsConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setTeamsConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), teamsConnectionMetadata));
  };

  const saveTeamsToolConfiguration = async () => {
    let newConfiguration = teamsConfigurationDto.getPersistData();

    // key as only toolID as requested by Purushoth!
    const vaultKey = toolData.getData("_id");
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(teamsConfigurationDto,"webhookUrl", newConfiguration.webhookUrl, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");

  };

  if (teamsConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={teamsConfigurationDto}
      setModel={setTeamsConfigurationDto}
      persistRecord={saveTeamsToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.TEAMS}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={teamsConfigurationDto} setDataObject={setTeamsConfigurationDto} fieldName={"webhookUrl"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

TeamsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default TeamsToolConfiguration;
