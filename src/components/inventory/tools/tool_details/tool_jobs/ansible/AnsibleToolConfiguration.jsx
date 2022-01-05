import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import AnsibleConnectionMetadata from "./ansible-connection-metadata";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import vaultActions from "components/vault/vault.actions";

function AnsibleToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ansibleConfigurationDto, setAnsibleConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnsibleConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AnsibleConnectionMetadata));
  };

  const saveAnsibleToolConfiguration = async () => {
    let newConfiguration = ansibleConfigurationDto.getPersistData();
    newConfiguration.secretKey = await toolsActions.savePasswordToVault(toolData, ansibleConfigurationDto,"accountPassword", newConfiguration.accountPassword, getAccessToken);
    newConfiguration.secretPrivateKey = await toolsActions.savePasswordToVault(toolData, ansibleConfigurationDto,"secretPrivateKey", newConfiguration.secretPrivateKey, getAccessToken);    newConfiguration.publicKey = await toolsActions.savePasswordToVault(toolData, ansibleConfigurationDto, "publicKey", newConfiguration.publicKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={ansibleConfigurationDto}
      setModel={setAnsibleConfigurationDto}
      persistRecord={saveAnsibleToolConfiguration}
      toolData={toolData}
      // toolConnectionCheckName={"Ansible"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"hostName"} />
          <TextInputBase dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"port"} />
          <TextInputBase dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"userName"} />
          <TextInputBase dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"pubKeyPath"} />
          <VaultTextAreaInput dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"publicKey"} />
          {/* <VaultTextInput dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"accountPassword"} />
          <VaultTextAreaInput dataObject={ansibleConfigurationDto} setDataObject={setAnsibleConfigurationDto} fieldName={"secretPrivateKey"} /> */}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnsibleToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AnsibleToolConfiguration;
