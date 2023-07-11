import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import ToolConfigurationEditorPanelContainer
from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import gitlabConnectionMetadata from "./gitlab-connection-metadata";
import GitlabTwoFactorToggle from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabTwoFactorToggle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import toolIdentifierConnectionCheckConstants
from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function GitlabToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [gitlabConfigurationDto, setGitlabConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let gitlabConfigurationData = modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), gitlabConnectionMetadata);

    if (gitlabConfigurationData.getData("twoFactorAuthentication") === true) {
      gitlabConfigurationData.setMetaDataFields(gitlabConnectionMetadata.fieldsAlt);
    }

    setGitlabConfigurationDto(gitlabConfigurationData);
  };

  const saveGitlabToolConfiguration = async () => {
    let newConfiguration = gitlabConfigurationDto.getPersistData();
    const simpleVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(gitlabConfigurationDto, "accountPassword", newConfiguration.accountPassword, simpleVaultKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretPrivateKey = await toolsActions.savePasswordToVault(toolData, gitlabConfigurationDto, "secretPrivateKey", newConfiguration.secretPrivateKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretAccessTokenKey = await toolsActions.savePasswordToVault(toolData, gitlabConfigurationDto, "secretAccessTokenKey", newConfiguration.secretAccessTokenKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  const getDynamicFields = () => {
    if (gitlabConfigurationDto.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextAreaInput dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"secretPrivateKey"}/>
          <VaultTextAreaInput dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"secretAccessTokenKey"}/>
        </div>
      );
    }
    return (<VaultTextInput dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"accountPassword"} />);
  };

  if (gitlabConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={gitlabConfigurationDto}
      setModel={setGitlabConfigurationDto}
      persistRecord={saveGitlabToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.GITLAB}
      setUpMode={setUpMode}
    >
      <Col sm={12}>
        <TextInputBase dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"url"}/>
      </Col>
      <Col sm={12}>
        <TextInputBase dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"accountUsername"}/>
      </Col>
      <Col sm={12}>
        <GitlabTwoFactorToggle dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"twoFactorAuthentication"}/>
      </Col>
      <Col sm={12}>
        {getDynamicFields()}
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

GitlabToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default GitlabToolConfiguration;