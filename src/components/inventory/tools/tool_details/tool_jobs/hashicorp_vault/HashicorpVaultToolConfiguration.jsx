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

function HashicorpVaultToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [hashicorpVaultConfigurationDto, setHashicorpVaultConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setHashicorpVaultConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), HashicorpVaultConnectionMetadata));
  };

  const saveHashicorpVaultToolConfiguration = async () => {
    let newConfiguration = hashicorpVaultConfigurationDto.getPersistData();
    newConfiguration.password = await toolsActions.savePasswordToVault(toolData, hashicorpVaultConfigurationDto, "password", newConfiguration.password, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={hashicorpVaultConfigurationDto}
      persistRecord={saveHashicorpVaultToolConfiguration}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"dnsName"} />
          <VaultTextInput dataObject={hashicorpVaultConfigurationDto} setDataObject={setHashicorpVaultConfigurationDto} fieldName={"password"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

HashicorpVaultToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default HashicorpVaultToolConfiguration;