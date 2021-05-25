import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import jenkinsConnectionMetadata from "./jenkins-connection-metadata";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import JenkinsProxyToggle from "components/inventory/tools/tool_details/tool_jobs/jenkins/JenkinsProxyToggle";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import VaultToolSelectInput from "components/common/list_of_values_input/inventory/VaultSelectInput";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import ErrorDialog from "components/common/status_notifications/error";

function JenkinsToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsConfigurationDto, setJenkinsConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    let jenkinsConfigurationData = modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), jenkinsConnectionMetadata);

    if (jenkinsConfigurationData.getData("proxyEnable") === true) {
      jenkinsConfigurationData.setMetaDataFields(jenkinsConnectionMetadata.fieldsAlt);
    }

    setJenkinsConfigurationDto(jenkinsConfigurationData);
  };

  const saveJenkinsToolConfiguration = async () => {
    let newConfiguration = jenkinsConfigurationDto.getPersistData();
    newConfiguration.jAuthToken = await toolsActions.savePasswordToVault(toolData, jenkinsConfigurationDto, "jAuthToken", newConfiguration.jAuthToken, getAccessToken);
    newConfiguration.jPassword = await toolsActions.savePasswordToVault(toolData, jenkinsConfigurationDto, "jPassword", newConfiguration.jPassword, getAccessToken);
    newConfiguration.proxyPassword = await toolsActions.savePasswordToVault(toolData, jenkinsConfigurationDto, "proxyPassword", newConfiguration.proxyPassword, getAccessToken);
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  const getDynamicFields = () => {
    if (jenkinsConfigurationDto.getData("proxyEnable") === true) {
      return (
        <>
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"proxyUserName"} />
          <VaultTextInput dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"proxyPassword"} />
          <VaultTextInput dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jPassword"} />
        </>
      );
    }

    return (
      <VaultTextInput dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jAuthToken"} />
    );
  };

  const getWarningDialogs = () => {
    if (jenkinsConfigurationDto.getData("vaultToolConfigId") && jenkinsConfigurationDto.getData("vaultToolConfigId").length > 0 && jenkinsConfigurationDto.getData("vaultToolConfigId") !== "default") {
      return (
        <div className={"p-2"}>
          <WarningDialog warningMessage={"A non-Opsera provided Hasicorp Vault is in use for this tool. Any operations that require this tool require access to this vault.  If the vault is down, then any Opsera operations will fail as a result. Opsera cannot manage or control the uptime of this tool."} />
        </div>
      );
    }
  };

  const getErrorDialogs = () => {
    if (toolData.getData("configuration").vaultToolConfigId && toolData.getData("configuration").vaultToolConfigId.length > 0 && jenkinsConfigurationDto.changeMap.has("vaultToolConfigId")) {
      return (
        <div className={"p-2"}>
          <ErrorDialog error={"Changing the Vault Instance does not migrate data between vault instances. In order to successfully change the vault in use please re-save the step configuration with the required information to ensure the tokens/passwords being updated in the vault."} align="stepConfigurationTop" />
        </div>
      );
    }
  };



  if (jenkinsConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={jenkinsConfigurationDto}
      persistRecord={saveJenkinsToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Jenkins"}
    >
      <Row>
        <Col sm={12}>
        {getWarningDialogs()}
        {getErrorDialogs()}
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jenkinsUrl"} />
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jenkinsPort"} />
          <VaultToolSelectInput dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"vaultToolConfigId"} />
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jUserId"} />
          <JenkinsProxyToggle dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"proxyEnable"} />
          {getDynamicFields()}
          <BooleanToggleInput dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"autoScaleEnable"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

JenkinsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default JenkinsToolConfiguration;