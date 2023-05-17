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
import RotateJenkinsKeyButton from "components/common/buttons/inventory/RotateJenkinsKeyButton";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function JenkinsToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
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
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  const getRotateJenkinsKeyButton = () => {
    if (toolData?.canRotateToken() === true){
      return <RotateJenkinsKeyButton toolId={toolData.getData("_id")}/>;
    }
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
      <VaultTextInput 
        dataObject={jenkinsConfigurationDto} 
        setDataObject={setJenkinsConfigurationDto} 
        fieldName={"jAuthToken"} 
        rightSideInputButton={getRotateJenkinsKeyButton()}
        />
    );
  };

  if (jenkinsConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={jenkinsConfigurationDto}
      setModel={setJenkinsConfigurationDto}
      persistRecord={saveJenkinsToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.JENKINS}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jenkinsUrl"} />
          <TextInputBase dataObject={jenkinsConfigurationDto} setDataObject={setJenkinsConfigurationDto} fieldName={"jenkinsPort"} />
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
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default JenkinsToolConfiguration;