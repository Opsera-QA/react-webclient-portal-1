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

function SnykToolConfiguration({ toolData }) {
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

    const organizationVaultKey = `${toolData.getData("_id")}-${toolData.getData(
      "tool_identifier",
    )}-organization`;
    newConfiguration.organization = await toolsActions.saveKeyPasswordToVault(
      snykConfigurationModel,
      "organization",
      newConfiguration.organization,
      organizationVaultKey,
      getAccessToken,
      toolData.getData("_id"),
    );

    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(
      toolData,
      item,
      getAccessToken,
    );
  };

  if (snykConfigurationModel == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={snykConfigurationModel}
      setModel={setSnykConfigurationModel}
      persistRecord={saveSnykToolConfiguration}
      toolData={toolData}
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
        <VaultTextInput
          type={"password"}
          dataObject={snykConfigurationModel}
          setDataObject={setSnykConfigurationModel}
          fieldName={"token"}
        />
      </Col>
      <Col sm={12}>
        <VaultTextInput
          type={"password"}
          dataObject={snykConfigurationModel}
          setDataObject={setSnykConfigurationModel}
          fieldName={"organization"}
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
};

export default SnykToolConfiguration;
