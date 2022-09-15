import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata from "./github-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import GithubTwoFactorAuthenticationBooleanToggleInput from "components/inventory/tools/tool_details/tool_jobs/github/GithubTwoFactorAuthenticationBooleanToggleInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function GithubToolConfiguration({ toolData }) {
  const [githubConfigurationDto, setGithubConfigurationDto] = useState(undefined);
  const { getAccessToken, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setGithubConfigurationDto({...modelHelpers.getToolConfigurationModel(toolData?.getData("configuration"), githubConnectionMetadata)});
  };

  const saveGithubToolConfiguration = async () => {
    let newConfiguration = githubConfigurationDto.getPersistData();
    const simpleVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(githubConfigurationDto, "accountPassword", newConfiguration.accountPassword, simpleVaultKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretPrivateKey = await toolsActions.savePasswordToVault(toolData, githubConfigurationDto, "secretPrivateKey", newConfiguration.secretPrivateKey, getAccessToken, toolData.getData("_id"));
    newConfiguration.secretAccessTokenKey = await toolsActions.savePasswordToVault(toolData, githubConfigurationDto, "secretAccessTokenKey", newConfiguration.secretAccessTokenKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  const getDynamicFields = () => {
    if (githubConfigurationDto.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput type={"password"} dataObject={githubConfigurationDto} setDataObject={setGithubConfigurationDto} fieldName={"secretPrivateKey"}/>
          <VaultTextInput type={"password"} dataObject={githubConfigurationDto} setDataObject={setGithubConfigurationDto} fieldName={"secretAccessTokenKey"}/>
        </div>
      );
    }
    return (<VaultTextInput type={"password"} dataObject={githubConfigurationDto} setDataObject={setGithubConfigurationDto} fieldName={"accountPassword"} helpTooltipText={"GitHub Personal Access Token scope of “repo” is required."} />);
  };

  if (githubConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={githubConfigurationDto}
      setModel={setGithubConfigurationDto}
      persistRecord={saveGithubToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Github"}
    >
      <Col sm={12}>
        <TextInputBase dataObject={githubConfigurationDto} setDataObject={setGithubConfigurationDto} fieldName={"accountUsername"}/>
      </Col>
      <Col sm={12}>
        <GithubTwoFactorAuthenticationBooleanToggleInput
          model={githubConfigurationDto}
          setModel={setGithubConfigurationDto}
        />
      </Col>
      <Col sm={12}>
        {getDynamicFields()}
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

GithubToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default GithubToolConfiguration;