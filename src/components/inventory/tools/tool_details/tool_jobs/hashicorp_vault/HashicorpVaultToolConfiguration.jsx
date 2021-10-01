import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import HashicorpVaultConnectionMetadata from "./hashicorpVault-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import WarningDialog from "../../../../../common/status_notifications/WarningDialog";

function HashicorpVaultToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [hashicorpVaultConfigurationDto, setHashicorpVaultConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const getWarningDialogs = () => {
    if (
      (toolData.getData("configuration") && Object.keys(toolData.getData("configuration")).length > 0 && hashicorpVaultConfigurationDto?.changeMap?.size > 0)
    ) {
      return (
        <div className={"px-3 pb-4"}>
          <WarningDialog
            warningMessage={
              "Changing the vault configuration may break tools which are using this vault for storage. Please use the Test Connection button in order to ensure that the updated credentials are able to communicate with the vault instance."
            }
            alignment={"toolRegistryWarning"}
          />
        </div>
      );
    }
  };

  const loadData = async () => {
    setHashicorpVaultConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), HashicorpVaultConnectionMetadata));
  };

  const saveHashicorpVaultToolConfiguration = async () => {
    let newConfiguration = hashicorpVaultConfigurationDto.getPersistData();
    newConfiguration.vaultToken = await toolsActions.savePasswordToVault(toolData, hashicorpVaultConfigurationDto, "vaultToken", newConfiguration.vaultToken, getAccessToken);
    newConfiguration.vaultKey = await toolsActions.savePasswordToVault(toolData, hashicorpVaultConfigurationDto, "vaultKey", newConfiguration.vaultKey, getAccessToken);
    newConfiguration.vaultUri = await toolsActions.savePasswordToVault(toolData, hashicorpVaultConfigurationDto, "vaultUri", newConfiguration.vaultUri, getAccessToken);
    newConfiguration.vaultPath = await toolsActions.savePasswordToVault(toolData, hashicorpVaultConfigurationDto, "vaultPath", newConfiguration.vaultPath, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <>
      {getWarningDialogs()}
    <ToolConfigurationEditorPanelContainer
      model={hashicorpVaultConfigurationDto}
      setModel={setHashicorpVaultConfigurationDto}
      persistRecord={saveHashicorpVaultToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"vault"}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"vaultUri"} />
          <VaultTextInput dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"vaultKey"} />
          <VaultTextInput dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"vaultToken"}/>
          <VaultTextInput dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"vaultPath"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
    </>
  );
}

HashicorpVaultToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default HashicorpVaultToolConfiguration;
