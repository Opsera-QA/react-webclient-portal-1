import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import snykConnectionMetadata from "./snyk-connection-metadata";
import Col from "react-bootstrap/Col";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";

const snykConnectivityTypeArray = [
  {
    name: "Snyk CLI",
    value: "Snyk CLI",
  },
];

function SnykToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [snykConfigurationDto, setSnykConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let snykConfigurationData = modelHelpers.getToolConfigurationModel(
      toolData.getData("configuration"),
      snykConnectionMetadata,
    );

    setSnykConfigurationDto(snykConfigurationData);
  };

  const saveSnykToolConfiguration = async () => {
    let newConfiguration = snykConfigurationDto.getPersistData();

    const authTokenVaultKey = `${toolData.getData("_id")}-${toolData.getData(
      "tool_identifier",
    )}-token`;
    newConfiguration.token = await toolsActions.saveKeyPasswordToVault(
      snykConfigurationDto,
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
      snykConfigurationDto,
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

  if (snykConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={snykConfigurationDto}
      setModel={setSnykConfigurationDto}
      persistRecord={saveSnykToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Snyk"}
    >
      <Col sm={12}>
        <SelectInputBase
          fieldName={"connectivityType"}
          dataObject={snykConfigurationDto}
          setDataObject={snykConfigurationDto}
          selectOptions={snykConnectivityTypeArray}
          valueField="value"
          textField="name"
        />
      </Col>
      <Col sm={12}>
        <VaultTextInput
          type={"password"}
          dataObject={snykConfigurationDto}
          setDataObject={setSnykConfigurationDto}
          fieldName={"token"}
        />
      </Col>
      <Col sm={12}>
        <VaultTextInput
          type={"password"}
          dataObject={snykConfigurationDto}
          setDataObject={setSnykConfigurationDto}
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
