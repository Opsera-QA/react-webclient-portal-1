import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InstallJiraAppButton from "./InstallJiraAppButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import jiraConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/jira-connection-metadata";

function JiraToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [jiraConfigurationDto, setJiraConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    setJiraConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), jiraConnectionMetadata));
  };

  const saveJiraToolConfiguration = async () => {
    let newConfiguration = jiraConfigurationDto.getPersistData();
    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-secretKey`;
    newConfiguration.vaultSecretKey = await toolsActions.saveKeyPasswordToVault(jiraConfigurationDto, "vaultSecretKey", newConfiguration.vaultSecretKey, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={jiraConfigurationDto}
      persistRecord={saveJiraToolConfiguration}
      toolData={toolData}
      // toolConnectionCheckName={"Jira"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraPort"} />
          <TextInputBase dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"vaultSecretKey"} />
        </Col>
        <Col sm={12} className="mt-2">
          <InstallJiraAppButton toolData={toolData} disable={jiraConfigurationDto == null || jiraConfigurationDto.isNew()} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

JiraToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default JiraToolConfiguration;
