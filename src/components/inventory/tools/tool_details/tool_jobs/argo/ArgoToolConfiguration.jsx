import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import argoConnectionMetadata from "./argo-connection-metadata";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import modelHelpers from "components/common/model/modelHelpers";
import {AuthContext} from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import ArgoToolSecretTokenToggleInput from "./ArgoToolSecretTokenToggleInput";
import toolIdentifierConnectionCheckConstants from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function ArgoToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoConfigurationDto, setArgoConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setArgoConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), argoConnectionMetadata));
  };

  const saveArgoToolConfiguration = async () => {
    let newConfiguration = argoConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, argoConfigurationDto,"accountPassword", newConfiguration.accountPassword, getAccessToken);
    newConfiguration.secretAccessTokenKey = await toolsActions.savePasswordToVault(toolData, argoConfigurationDto,"secretAccessTokenKey", newConfiguration.secretAccessTokenKey, getAccessToken);
    const item = { configuration: newConfiguration };
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("tool_detail");
  };

  const getDynamicFields = () => {
    if (argoConfigurationDto && argoConfigurationDto.getData("secretAccessTokenEnabled")) {
      return (<VaultTextAreaInput dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"secretAccessTokenKey"} />);
    }
    return (
      <>
        <TextInputBase dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"userName"} />
        <VaultTextInput dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"accountPassword"} />        
      </>    
    );
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={argoConfigurationDto}
      setModel={setArgoConfigurationDto}
      persistRecord={saveArgoToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.ARGO}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"toolURL"} />          
          <ArgoToolSecretTokenToggleInput model={argoConfigurationDto} setModel={setArgoConfigurationDto} />
          { getDynamicFields() }
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ArgoToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default ArgoToolConfiguration;
