import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import gitlabConnectionMetadata from "./gitlab-connection-metadata";
import GitlabTwoFactorAuthenticationBooleanToggleInput from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabTwoFactorAuthenticationBooleanToggleInput";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function GitlabToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [gitlabConfigurationDto, setGitlabConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setGitlabConfigurationDto({
      ...modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), gitlabConnectionMetadata)
    });
  };

  const saveGitlabToolConfiguration = async () => {
    let newConfiguration = gitlabConfigurationDto.getPersistData();
    const simpleVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(gitlabConfigurationDto, "accountPassword", newConfiguration.accountPassword, simpleVaultKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretPrivateKey = await toolsActions.savePasswordToVault(toolData, gitlabConfigurationDto, "secretPrivateKey", newConfiguration.secretPrivateKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretAccessTokenKey = await toolsActions.savePasswordToVault(toolData, gitlabConfigurationDto, "secretAccessTokenKey", newConfiguration.secretAccessTokenKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
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
      toolConnectionCheckName={"Gitlab"}
    >
      <Col sm={12}>
        <TextInputBase dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"url"}/>
      </Col>
      <Col sm={12}>
        <TextInputBase dataObject={gitlabConfigurationDto} setDataObject={setGitlabConfigurationDto} fieldName={"accountUsername"}/>
      </Col>
      <Col sm={12}>
        <GitlabTwoFactorAuthenticationBooleanToggleInput
          model={gitlabConfigurationDto}
          setModel={setGitlabConfigurationDto}
        />
      </Col>
      <Col sm={12}>
        {getDynamicFields()}
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

GitlabToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default GitlabToolConfiguration;