import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import snykConnectionMetadata from "./snyk-connection-metadata";
import Col from "react-bootstrap/Col";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SnykConnectivityTypeSelectInput from "components/inventory/tools/tool_details/tool_jobs/snyk/inputs/SnykConnectivityTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolIdentifierConnectionCheckConstants from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function SnykToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [snykConfigurationModel, setSnykConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);
 
  const loadData = async () => {
    let snykConfigurationData = modelHelpers.getToolConfigurationModel(
      toolData.getData("configuration"),
      snykConnectionMetadata,
    );

    setSnykConfigurationModel(snykConfigurationData);
  };

  const saveSnykToolConfiguration = async () => {
    let newConfiguration = snykConfigurationModel.getPersistData();

    const authTokenVaultKey = `${toolData.getData("_id")}-${toolData.getData(
      "tool_identifier",
    )}-token`;
    newConfiguration.token = await toolsActions.saveKeyPasswordToVault(
      snykConfigurationModel,
      "token",
      newConfiguration.token,
      authTokenVaultKey,
      getAccessToken,
      toolData.getData("_id"),
    );

    const item = { configuration: newConfiguration };
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  if (snykConfigurationModel == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={snykConfigurationModel}
      setModel={setSnykConfigurationModel}
      persistRecord={saveSnykToolConfiguration}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.SNYK}
      toolData={toolData}
      setUpMode={setUpMode}
    >
      <Col sm={12}>
        <SnykConnectivityTypeSelectInput
          fieldName={"connectivityType"}
          model={snykConfigurationModel}
          setmodel={setSnykConfigurationModel}
          disabled={true}
        />
      </Col>
      <Col sm={12}>
        <TextInputBase
          dataObject={snykConfigurationModel}
          setDataObject={setSnykConfigurationModel}
          fieldName={"organization"}
        />
      </Col>
      <Col sm={12}>
        <VaultTextInput
          dataObject={snykConfigurationModel}
          setDataObject={setSnykConfigurationModel}
          fieldName={"token"}
        />
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

SnykToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default SnykToolConfiguration;
